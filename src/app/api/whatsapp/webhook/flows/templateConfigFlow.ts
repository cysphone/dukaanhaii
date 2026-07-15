import { PrismaClient } from '@prisma/client';
import { TemplateDef, TemplatePage, TemplateSection, TemplateField } from '@/lib/templates';
import { sendWhatsAppMessage, uploadWaImage } from '../utils';
import { generateFieldContent } from '@/lib/gemini';

const prisma = new PrismaClient();

export type AnyField = TemplateField;
export type AnySection = TemplateSection;
export type AnyPage = TemplatePage | null;

export function getFirstMissingField(template: TemplateDef, currentConfig: Record<string, any>): { page: AnyPage, section: AnySection, field: AnyField } | null {
    if (!template.pages) return null;
    
    for (const page of template.pages) {
        for (const section of page.sections) {
            for (const field of section.fields) {
                const pageData = currentConfig[page.id] || {};
                const sectionData = pageData[section.id] || {};
                const fieldValue = sectionData[field.id];

                if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
                    return { page, section, field };
                }
            }
        }
    }
    return null;
}

export function generatePromptForFieldSource(page: AnyPage, section: AnySection, field: AnyField): string {
    const contextName = page ? `${page.name} > ${section.name}` : section.name;
    let prompt = `🛠️ *Template Setup: ${contextName}*\n\nWe need your *${field.label}*.\n`;
    if (field.description) prompt += `_Hint: ${field.description}_\n\n`;

    if (field.type === 'text' || field.type === 'textarea') {
        prompt += `Would you like me to generate this for you using AI?\n\n1️⃣ Generate with AI\n2️⃣ I'll provide manually\n\n_Type *SKIP* to skip this field._`;
    } else if (field.type === 'image' || field.type === 'gallery') {
        prompt += `(Please send a Photo/Image)\n\n_Type *SKIP* to skip._`;
    } else {
        prompt += `(Please reply with your answer)\n\n_Type *SKIP* to skip._`;
    }
    return prompt;
}

export function generatePromptForManualField(page: AnyPage, section: AnySection, field: AnyField): string {
    const contextName = page ? `${page.name} > ${section.name}` : section.name;
    return `📝 *Manual Input: ${field.label}*\n\nPlease type your ${field.label} for ${contextName}.\n\n_Type *SKIP* to skip._`;
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
    
    const pageId = collectedData.targetPageId; // Might be null for V1
    const sectionId = collectedData.targetSectionId;
    const fieldId = collectedData.targetFieldId;

    if (!sectionId || !fieldId) {
        return { handled: false, replyText: '', nextStep };
    }

    const { getTemplateById } = await import('@/lib/templates');
    const template = getTemplateById(existingBusiness.templateType);
    if (!template) return { handled: false, replyText: '', nextStep };

    let fieldType = 'text';
    let aiPrompt = '';
    let fld: AnyField | undefined;
    let sec: AnySection | undefined;
    let pg: AnyPage | undefined;

    if (template.pages && pageId) {
        pg = template.pages.find((p: any) => p.id === pageId);
        sec = pg?.sections.find((s: any) => s.id === sectionId);
        fld = sec?.fields.find((f: any) => f.id === fieldId);
    }

    if (fld) {
        fieldType = fld.type;
        if ('aiPrompt' in fld) aiPrompt = fld.aiPrompt || '';
    }

    // STATE: ask_field_source
    if (session.step === 'ask_field_source') {
        if (msgUpper === 'SKIP') {
            await saveFieldValueAndProceed(null, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
            return { handled: true };
        }
        
        if (text === '1' && (fieldType === 'text' || fieldType === 'textarea')) {
            // Generate with AI
            replyText = `🤖 Generating your ${fld?.label}... please wait.`;
            // We'll update the step to ai_field_pending and trigger the generation asynchronously 
            // but webhook timeouts might be an issue. Let's do it inline for now, gemini is fast.
            await sendWhatsAppMessage(phoneNumber, replyText);
            
            const promptContext = aiPrompt ? aiPrompt : `Write content for the ${fld?.label} field in the ${sec?.name} section of a ${existingBusiness.category} website named ${existingBusiness.name}.`;
            const businessContext = `Business Name: ${existingBusiness.name}\nCategory: ${existingBusiness.category}\nDescription: ${existingBusiness.description || 'N/A'}`;
            
            try {
                const generatedContent = await generateFieldContent(promptContext, businessContext);
                
                // Update step to ai_field_preview
                await prisma.whatsappSession.update({
                    where: { phoneNumber },
                    data: { 
                        step: 'ai_field_preview', 
                        collectedData: { ...collectedData, generatedContent } 
                    }
                });
                
                await sendWhatsAppMessage(phoneNumber, `✨ *AI Suggested Content:*\n\n${generatedContent}\n\nWhat would you like to do?\n1️⃣ Use this\n2️⃣ Regenerate\n3️⃣ I'll type it manually`);
                return { handled: true };
            } catch (e) {
                console.error(e);
                await prisma.whatsappSession.update({
                    where: { phoneNumber },
                    data: { step: 'manual_field_input', collectedData }
                });
                await sendWhatsAppMessage(phoneNumber, `❌ AI generation failed. Let's do it manually.\n\n` + generatePromptForManualField(pg || null, sec!, fld!));
                return { handled: true };
            }
        } else if (text === '2') {
            // Manual input
            replyText = generatePromptForManualField(pg || null, sec!, fld!);
            nextStep = 'manual_field_input';
            return { handled: true, replyText, nextStep, collectedData };
        } else {
            // If it's an image field, they upload directly in this state if they didn't skip
            if (fieldType === 'image' || fieldType === 'gallery') {
                return handleImageUpload(message, fieldType, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
            }
            replyText = `Please reply with 1 or 2, or type SKIP.`;
            return { handled: true, replyText, nextStep, collectedData };
        }
    }

    // STATE: ai_field_preview
    if (session.step === 'ai_field_preview') {
        if (text === '1') {
            // Use it
            const val = collectedData.generatedContent;
            await saveFieldValueAndProceed(val, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
            return { handled: true };
        } else if (text === '2') {
            // Regenerate
            await sendWhatsAppMessage(phoneNumber, `🤖 Regenerating...`);
            const promptContext = aiPrompt ? aiPrompt : `Write alternative content for the ${fld?.label} field in the ${sec?.name} section of a ${existingBusiness.category} website named ${existingBusiness.name}. Make it different from before.`;
            const businessContext = `Business Name: ${existingBusiness.name}\nCategory: ${existingBusiness.category}`;
            
            try {
                const generatedContent = await generateFieldContent(promptContext, businessContext);
                
                await prisma.whatsappSession.update({
                    where: { phoneNumber },
                    data: { 
                        step: 'ai_field_preview', 
                        collectedData: { ...collectedData, generatedContent } 
                    }
                });
                
                await sendWhatsAppMessage(phoneNumber, `✨ *New AI Suggested Content:*\n\n${generatedContent}\n\nWhat would you like to do?\n1️⃣ Use this\n2️⃣ Regenerate\n3️⃣ I'll type it manually`);
                return { handled: true };
            } catch(e) {
                await prisma.whatsappSession.update({
                    where: { phoneNumber },
                    data: { step: 'manual_field_input', collectedData }
                });
                await sendWhatsAppMessage(phoneNumber, `❌ AI generation failed. Let's do it manually.\n\n` + generatePromptForManualField(pg || null, sec!, fld!));
                return { handled: true };
            }
        } else if (text === '3') {
            // Manual
            await prisma.whatsappSession.update({
                where: { phoneNumber },
                data: { step: 'manual_field_input', collectedData }
            });
            await sendWhatsAppMessage(phoneNumber, generatePromptForManualField(pg || null, sec!, fld!));
            return { handled: true };
        } else {
            await sendWhatsAppMessage(phoneNumber, `Please reply with 1, 2, or 3.`);
            return { handled: true };
        }
    }

    // STATE: manual_field_input (or legacy collect_template_field)
    if (session.step === 'manual_field_input' || session.step === 'collect_template_field') {
        let valueToSave: any = text;

        if (msgUpper === 'SKIP') {
            valueToSave = null;
        } else if (fieldType === 'image' || fieldType === 'gallery') {
            return handleImageUpload(message, fieldType, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
        }

        await saveFieldValueAndProceed(valueToSave, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
        return { handled: true };
    }

    return { handled: false };
}

// Helpers

async function handleImageUpload(message: any, fieldType: string, pageId: string | undefined, sectionId: string, fieldId: string, currentConfig: any, existingBusiness: any, template: any, phoneNumber: string) {
    if (message.image && message.image.id) {
        await sendWhatsAppMessage(phoneNumber, `⏳ Uploading image...`);
        uploadWaImage(message.image.id, `dukaanhai/templates/${existingBusiness.id}`).then(async (url) => {
            if (url) {
                let valToSave: any = url;
                if (fieldType === 'gallery') {
                    // It's a bit complex to handle multi-upload in this linear flow, 
                    // for now just store the single URL in an array if gallery.
                    valToSave = [url];
                }
                await saveFieldValueAndProceed(valToSave, pageId, sectionId, fieldId, currentConfig, existingBusiness, template, phoneNumber);
            } else {
                await sendWhatsAppMessage(phoneNumber, `❌ Failed to upload image. Please try again or type SKIP.`);
            }
        });
        return { handled: true };
    } else {
        await sendWhatsAppMessage(phoneNumber, `Please send an actual *Photo (Image)* or type SKIP.`);
        return { handled: true };
    }
}

async function saveFieldValueAndProceed(value: any, pageId: string | undefined, sectionId: string, fieldId: string, currentConfig: any, existingBusiness: any, template: any, phoneNumber: string) {
    const newConfig = { ...currentConfig };
    
    if (pageId) {
        if (!newConfig[pageId]) newConfig[pageId] = {};
        if (!newConfig[pageId][sectionId]) newConfig[pageId][sectionId] = {};
        newConfig[pageId][sectionId][fieldId] = value;
    } else {
        if (!newConfig[sectionId]) newConfig[sectionId] = {};
        newConfig[sectionId][fieldId] = value;
    }

    await prisma.business.update({
        where: { id: existingBusiness.id },
        data: { templateConfig: newConfig }
    });
    
    const missing = getFirstMissingField(template!, newConfig);
    if (missing) {
        const nextStep = 'ask_field_source';
        const p = generatePromptForFieldSource(missing.page, missing.section, missing.field);
        
        await prisma.whatsappSession.update({
            where: { phoneNumber },
            data: { 
                step: nextStep, 
                collectedData: { 
                    businessId: existingBusiness.id, 
                    targetPageId: missing.page?.id,
                    targetSectionId: missing.section.id, 
                    targetFieldId: missing.field.id 
                } 
            }
        });
        await sendWhatsAppMessage(phoneNumber, `✅ Saved!\n\n${p}`);
    } else {
        await prisma.whatsappSession.update({
            where: { phoneNumber },
            data: { step: 'completed' }
        });
        
        const { getStoreUrl } = await import('@/lib/utils');
        const storeUrl = getStoreUrl(existingBusiness.slug);
        await sendWhatsAppMessage(phoneNumber, `🎉 *All done!*\n\nYour website is fully configured and live at:\n\n${storeUrl}\n\nType *MENU* if you want to change anything else.`);
    }
}
