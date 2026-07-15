import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage, uploadWaImage } from '../utils';
import { HandlerContext, HandlerResponse } from '../types/whatsapp';

export async function handleBrandingState(ctx: HandlerContext, collectedData: any): Promise<HandlerResponse> {
  const { session, text, phoneNumber, message } = ctx;
  let replyText = '';
  let nextStep = session.step;

  switch (session.step) {
    case 'handle_branding_choice':
      if (text === '1') {
        replyText = `📝 Send your new 'About Us' text:`;
        nextStep = 'edit_about_us';
      } else if (text === '2') {
        replyText = `📸 Please send an Image to use as your Brand Logo.\n(Type MENU to cancel)`;
        nextStep = 'edit_logo';
      } else if (text === '3') {
        replyText = `🖼️ Please send a small, square Image to use as your Favicon.\n(Type MENU to cancel)`;
        nextStep = 'edit_favicon';
      } else if (text === '4') {
        replyText = `🎨 What are your new brand colors?\n\nReply with a Primary Color and Secondary Color (e.g., 'Blue and White' or '#000000 and #ffffff').`;
        nextStep = 'edit_colors';
      } else if (text === '5') {
        replyText = `🔗 Send your new social media links (Instagram, Facebook, Website) separated by commas.`;
        nextStep = 'edit_socials';
      } else if (text === '6') {
        replyText = `📞 Send your new business Phone Number and Email separated by a comma.`;
        nextStep = 'edit_contact';
      } else if (text === '7') {
        replyText = `📝 Send your new Footer Text and Copyright Text separated by a comma.`;
        nextStep = 'edit_footer';
      } else {
        replyText = `Please reply with a number 1-7.\n\n1️⃣ About Us\n2️⃣ Brand Logo\n3️⃣ Favicon\n4️⃣ Brand Colors\n5️⃣ Social Links\n6️⃣ Contact Info\n7️⃣ Footer & Copyright`;
        nextStep = 'handle_branding_choice';
      }
      return { handled: true, replyText, nextStep, collectedData };

    case 'edit_about_us':
      await prisma.business.update({
        where: { id: collectedData.businessId },
        data: { about: text }
      });
      replyText = `✅ About Us updated successfully!\n\nType *MENU* to go back to the main menu.`;
      nextStep = 'completed';
      return { handled: true, replyText, nextStep, collectedData };

    case 'edit_logo':
      if (message.image && message.image.id) {
        replyText = `⏳ Uploading your new logo...`;
        nextStep = 'uploading_logo';
        const busId = collectedData.businessId;
        uploadWaImage(message.image.id, `dukaanhai/business/logos`).then(async (url) => {
           if (url) {
             await prisma.business.update({ where: { id: busId }, data: { logoUrl: url }});
             await sendWhatsAppMessage(phoneNumber, `✅ Logo updated successfully!\n\nType *MENU* to go back.`);
             await prisma.whatsappSession.update({ where: { phoneNumber }, data: { step: 'completed' }});
           } else {
             await sendWhatsAppMessage(phoneNumber, `❌ Failed to upload logo. Type *MENU* to go back.`);
           }
        });
      } else {
        replyText = `Please send an actual *Photo (Image)*.`;
        nextStep = 'edit_logo';
      }
      return { handled: true, replyText, nextStep, collectedData };

    case 'uploading_logo':
      replyText = `⏳ Please wait while the logo uploads...`;
      nextStep = 'uploading_logo';
      return { handled: true, replyText, nextStep, collectedData };

    case 'edit_favicon':
      if (message.image && message.image.id) {
        replyText = `⏳ Uploading your new favicon...`;
        nextStep = 'uploading_favicon';
        const busId = collectedData.businessId;
        uploadWaImage(message.image.id, `dukaanhai/business/favicons`).then(async (url) => {
           if (url) {
             await prisma.business.update({ where: { id: busId }, data: { faviconUrl: url }});
             await sendWhatsAppMessage(phoneNumber, `✅ Favicon updated successfully!\n\nType *MENU* to go back.`);
             await prisma.whatsappSession.update({ where: { phoneNumber }, data: { step: 'completed' }});
           } else {
             await sendWhatsAppMessage(phoneNumber, `❌ Failed to upload favicon. Type *MENU* to go back.`);
           }
        });
      } else {
        replyText = `Please send an actual *Photo (Image)*.`;
        nextStep = 'edit_favicon';
      }
      return { handled: true, replyText, nextStep, collectedData };

    case 'uploading_favicon':
      replyText = `⏳ Please wait while the favicon uploads...`;
      nextStep = 'uploading_favicon';
      return { handled: true, replyText, nextStep, collectedData };

    case 'edit_colors': {
      const parts = text.split(/and|,/i).map((s: string) => s.trim()).filter(Boolean);
      let primaryColor = parts[0] || null;
      let secondaryColor = parts[1] || null;
      await prisma.business.update({
        where: { id: collectedData.businessId },
        data: { primaryColor, secondaryColor }
      });
      replyText = `✅ Brand colors updated to ${primaryColor} and ${secondaryColor}!\n\nType *MENU* to go back.`;
      nextStep = 'completed';
      return { handled: true, replyText, nextStep, collectedData };
    }

    case 'edit_socials': {
      const parts = text.split(',').map((s: string) => s.trim());
      await prisma.business.update({
        where: { id: collectedData.businessId },
        data: {
          instagramUrl: parts[0] || null,
          facebookUrl: parts[1] || null,
          websiteUrl: parts[2] || null
        }
      });
      replyText = `✅ Social links updated!\n\nType *MENU* to go back.`;
      nextStep = 'completed';
      return { handled: true, replyText, nextStep, collectedData };
    }

    case 'edit_contact': {
      const parts = text.split(',').map((s: string) => s.trim());
      await prisma.business.update({
        where: { id: collectedData.businessId },
        data: {
          phoneNumber: parts[0] || null,
          email: parts[1] || null
        }
      });
      replyText = `✅ Contact info updated!\n\nType *MENU* to go back.`;
      nextStep = 'completed';
      return { handled: true, replyText, nextStep, collectedData };
    }

    case 'edit_footer': {
      const parts = text.split(',').map((s: string) => s.trim());
      await prisma.business.update({
        where: { id: collectedData.businessId },
        data: {
          footerText: parts[0] || null,
          copyrightText: parts[1] || null
        }
      });
      replyText = `✅ Footer updated!\n\nType *MENU* to go back.`;
      nextStep = 'completed';
      return { handled: true, replyText, nextStep, collectedData };
    }
  }

  return { handled: false };
}
