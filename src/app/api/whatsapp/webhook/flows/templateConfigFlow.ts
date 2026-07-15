import { PrismaClient } from '@prisma/client';
import { TemplateDef, TemplateSection, TemplateField } from '@/lib/templates';
import { sendWhatsAppMessage, uploadWaImage } from '../utils';

const prisma = new PrismaClient();

// Helper to find the first missing field in the config
export function getFirstMissingField(template: TemplateDef, currentConfig: any): { section: TemplateSection, field: TemplateField } | null {
    if (!template.sections) return null;

    for (const section of template.sections) {
        for (const field of section.fields) {
            const sectionData = currentConfig[section.id] || {};
            const fieldValue = sectionData[field.id];

            if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
                return { section, field };
            }
        }
    }
    return null;
}

export function generatePromptForField(section: TemplateSection, field: TemplateField): string {
    let prompt = `🛠️ *Template Setup: ${section.name}*\n\nPlease provide your *${field.label}*.\n`;
    if (field.description) {
        prompt += `_Hint: ${field.description}_\n`;
    }

    if (field.type === 'image' || field.type === 'gallery') {
        prompt += `\n(Please send a Photo/Image)`;
    } else {
        prompt += `\n(Please reply with text)`;
    }
    
    prompt += `\n\n_Type *SKIP* if you don't want to add this right now._`;
    return prompt;
}

export async function handleTemplateConfigFlow(
    session: any,
    phoneNumber: string,
    text: string,
    msgUpper: string,
    existingBusiness: any,
    collectedData: any,
    message: any
) {
    let replyText = '';
    let nextStep = session.step;

    if (!existingBusiness) return { handled: false, replyText: '', nextStep };

    const currentConfig = existingBusiness.templateConfig ? JSON.parse(JSON.stringify(existingBusiness.templateConfig)) : {};
    
    const sectionId = collectedData.targetSectionId;
    const fieldId = collectedData.targetFieldId;

    if (!sectionId || !fieldId) {
        return { handled: false, replyText: '', nextStep };
    }

    if (!currentConfig[sectionId]) currentConfig[sectionId] = {};

    let valueToSave: any = text;

    if (msgUpper === 'SKIP') {
        valueToSave = null;
    } else {
        const { getTemplateById } = await import('@/lib/templates');
        const template = getTemplateById(existingBusiness.templateType);
        
        let fieldType = 'text';
        if (template && template.sections) {
            const sec = template.sections.find((s: TemplateSection) => s.id === sectionId);
            const fld = sec?.fields.find((f: TemplateField) => f.id === fieldId);
            if (fld) fieldType = fld.type;
        }

        if (fieldType === 'image' || fieldType === 'gallery') {
            if (message.image && message.image.id) {
                replyText = `⏳ Uploading image...`;
                uploadWaImage(message.image.id, `dukaanhai/templates/${existingBusiness.id}`).then(async (url) => {
                    if (url) {
                        const newConfig = { ...currentConfig };
                        if (fieldType === 'gallery') {
                            if (!newConfig[sectionId][fieldId]) newConfig[sectionId][fieldId] = [];
                            if (!Array.isArray(newConfig[sectionId][fieldId])) newConfig[sectionId][fieldId] = [];
                            newConfig[sectionId][fieldId].push(url);
                        } else {
                            newConfig[sectionId][fieldId] = url;
                        }
                        await prisma.business.update({
                            where: { id: existingBusiness.id },
                            data: { templateConfig: newConfig }
                        });
                        
                        const missing = getFirstMissingField(template!, newConfig);
                        if (missing) {
                            const p = generatePromptForField(missing.section, missing.field);
                            await sendWhatsAppMessage(phoneNumber, `✅ Saved!\n\n` + p);
                            await prisma.whatsappSession.update({
                                where: { phoneNumber },
                                data: { step: 'collect_template_field', collectedData: { ...collectedData, targetSectionId: missing.section.id, targetFieldId: missing.field.id } }
                            });
                        } else {
                            await sendWhatsAppMessage(phoneNumber, `🎉 *All template configurations are complete!*\n\nType *MENU* to see your dashboard or store link.`);
                            await prisma.whatsappSession.update({
                                where: { phoneNumber },
                                data: { step: 'completed' }
                            });
                        }
                    } else {
                        await sendWhatsAppMessage(phoneNumber, `❌ Failed to upload image. Please try again or type *SKIP*.`);
                        await prisma.whatsappSession.update({
                            where: { phoneNumber },
                            data: { step: 'collect_template_field' }
                        });
                    }
                });
                return { handled: true, replyText: replyText, nextStep: 'uploading_template_field', collectedData };
            } else {
                return { handled: true, replyText: `Please send an actual *Photo (Image)* or type *SKIP*.`, nextStep: 'collect_template_field', collectedData };
            }
        }
    }

    if (valueToSave !== null) {
         currentConfig[sectionId][fieldId] = valueToSave;
    } else {
         currentConfig[sectionId][fieldId] = "SKIPPED";
    }

    await prisma.business.update({
        where: { id: existingBusiness.id },
        data: { templateConfig: currentConfig }
    });

    const { getTemplateById } = await import('@/lib/templates');
    const template = getTemplateById(existingBusiness.templateType);
    const missing = getFirstMissingField(template!, currentConfig);
    
    if (missing) {
        replyText = `✅ Saved!\n\n` + generatePromptForField(missing.section, missing.field);
        nextStep = 'collect_template_field';
        collectedData.targetSectionId = missing.section.id;
        collectedData.targetFieldId = missing.field.id;
    } else {
        replyText = `🎉 *All template configurations are complete!*\n\nYour new beautiful website is ready! Type *MENU* to get the link.`;
        nextStep = 'completed';
    }

    return { handled: true, replyText, nextStep, collectedData };
}
