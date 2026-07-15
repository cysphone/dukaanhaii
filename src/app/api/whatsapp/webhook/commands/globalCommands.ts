import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '../utils';
import { getStoreUrl } from '@/lib/utils';
import { HandlerContext, HandlerResponse } from '../types/whatsapp';

export async function handleGlobalCommands(ctx: HandlerContext): Promise<HandlerResponse> {
  const { msgUpper, isTimeout, existingUser, phoneNumber, existingBusiness, session } = ctx;

  if (['DASHBOARD', 'RESET', 'MENU', 'HELP'].includes(msgUpper) || isTimeout) {
    if (msgUpper === 'HELP' && !isTimeout) {
      const helpText = `🛠️ *DukaanHai Help Menu*\n\nHere are some main commands you can use at any time:\n\n*MENU* or *RESET* - Return to the main menu.\n*DASHBOARD* - Get a direct secure link to your store dashboard.\n*HELP* - View this help list.\n\n_Note: If you are creating a new site, please answer the questions directly._`;
      await sendWhatsAppMessage(phoneNumber, helpText);
      return { handled: true };
    }

    if (msgUpper === 'DASHBOARD' && !isTimeout) {
      if (!existingUser) {
        await sendWhatsAppMessage(phoneNumber, `No account found. Please create your store first by typing *RESET*.`);
        return { handled: true };
      }

      if (existingUser.password && existingUser.password.length > 0) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dukaanhai.in';
        await sendWhatsAppMessage(phoneNumber, `You already have dashboard access.\n\nVisit: ${appUrl}/login`);
        return { handled: true };
      }

      const crypto = await import('crypto');
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.loginToken.create({
        data: { phoneNumber, token, expiresAt }
      });

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dukaanhai.in';
      await sendWhatsAppMessage(phoneNumber, `Click this secure link to access your dashboard:\n\n${appUrl}/dashboard-access?token=${token}\n\nThis link expires in 10 minutes.`);

      await prisma.whatsappSession.update({
        where: { phoneNumber },
        data: { step: 'completed' }
      });

      return { handled: true };
    }

    if (msgUpper === 'RESET' || msgUpper === 'MENU' || isTimeout) {
      if (existingBusiness) {
        await prisma.whatsappSession.update({
          where: { phoneNumber },
          data: { step: 'handle_menu_choice', collectedData: { businessId: existingBusiness.id } },
        });
        const replyText = `Welcome back! 🏪\n\nWhat would you like to change in your store?\n\n1️⃣ Edit Store Description\n2️⃣ Add New Product\n3️⃣ Edit Existing Product\n4️⃣ Edit Website Template\n5️⃣ Edit Branding & Details (Logo, Colors, Socials)\n6️⃣ Get Store Link\n\nReply with 1, 2, 3, 4, 5, or 6.`;
        const prefix = isTimeout ? `Hi there! It's been a while since your last message.\n\n` : (msgUpper === 'MENU' || msgUpper === 'RESET' ? `✅ Menu returned!\n\n` : '');
        await sendWhatsAppMessage(phoneNumber, `${prefix}${replyText}`);
        return { handled: true };
      } else {
        await prisma.whatsappSession.update({
          where: { phoneNumber },
          data: { step: 'collect_name', collectedData: {} },
        });
        const prefix = isTimeout ? `Hi there! It's been a while since your last message.\n\n` : `✅ Reset successful!\n\n`;
        await sendWhatsAppMessage(phoneNumber, `${prefix}*Please enter your store name:*`);
        return { handled: true };
      }
    }
  }

  // Detect Returning Users automatically
  if (session.step === 'start' || session.step === 'completed') {
    if (existingBusiness) {
      await prisma.whatsappSession.update({
        where: { phoneNumber },
        data: { step: 'handle_menu_choice', collectedData: { businessId: existingBusiness.id } }
      });
      const replyText = `Welcome back! 🏪\n\nWhat would you like to change in your store?\n\n1️⃣ Edit Store Description\n2️⃣ Add New Product\n3️⃣ Edit Existing Product\n4️⃣ Edit Website Template\n5️⃣ Edit Branding & Details (Logo, Colors, Socials)\n6️⃣ Get Store Link\n\nReply with 1, 2, 3, 4, 5, or 6.`;
      await sendWhatsAppMessage(phoneNumber, replyText);
      return { handled: true };
    } else if (existingUser) {
      await prisma.whatsappSession.update({
        where: { phoneNumber },
        data: { step: 'collect_name', collectedData: {} }
      });
      await sendWhatsAppMessage(phoneNumber, `Welcome back! 👋 You don't have a store yet.\n\n*Please enter your store name:*`);
      return { handled: true };
    }
  }

  return { handled: false };
}
