import { prisma } from '@/lib/prisma';
import { generateProductDescription } from '@/lib/gemini';
import { sendWhatsAppMessage, handlePrefetchAndAskAI, handleAiImage, handleAddProductFromBuffer, uploadWaImage } from '../utils';

const AI_MAX_CREDITS = 2;

export async function handleEcommerceFlow(
  session: any,
  phoneNumber: string,
  text: string,
  msgUpper: string,
  existingBusiness: any,
  collectedData: any,
  message: any,
  itemWord: string
) {
  let replyText = '';
  let nextStep = session.step;
  let handled = true;

  switch (session.step) {
    case 'ask_add_product':
      if (text.toUpperCase() === 'YES' || text.toUpperCase() === 'HAAN' || text === '1') {
        replyText = `Great! 📝 Enter your new product's *Name*:`;
        nextStep = 'collect_product_name';
      } else {
        replyText = `Your store is ready! 🎉\n\nType *MENU* to go back to the main menu.`;
        nextStep = 'completed';
      }
      break;

    case 'collect_product_name':
      collectedData.productName = text;
      replyText = `Nice name! 🏷️\n\nNow enter the product's *Price* (numbers only, e.g., 500):`;
      nextStep = 'collect_product_price';
      break;

    case 'collect_product_price': {
      const price = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (isNaN(price)) {
        replyText = `Please reply with numbers only (e.g., 500).\nEnter the price:`;
        nextStep = 'collect_product_price';
      } else {
        collectedData.productPrice = price;
        collectedData.aiCredits = { ...(collectedData.aiCredits || {}), productDesc: AI_MAX_CREDITS };
        collectedData.aiGenerations = { ...(collectedData.aiGenerations || {}), productDesc: [] };
        replyText = `Price set: ₹${price} 💰\n\n🤖 Would you like AI to generate an SEO-friendly product description for you?\n\n1️⃣ *Yes, generate AI description*\n2️⃣ *No, I'll write my own*\n3️⃣ *Skip (no description)*\n\nReply with 1, 2, or 3.`;
        nextStep = 'ask_product_desc_ai';
      }
      break;
    }

    case 'ask_product_desc_ai':
      if (text === '1') {
        let bizName = collectedData.name || existingBusiness?.name || '';
        const generationIndex = AI_MAX_CREDITS - (collectedData.aiCredits?.productDesc ?? AI_MAX_CREDITS);
        const generated = await generateProductDescription(
          { name: collectedData.productName, price: collectedData.productPrice, businessName: bizName, category: collectedData.category || 'General' },
          generationIndex
        );
        collectedData.aiGenerations.productDesc = collectedData.aiGenerations.productDesc || [];
        collectedData.aiGenerations.productDesc.push(generated);
        collectedData.aiCredits.productDesc = (collectedData.aiCredits.productDesc ?? AI_MAX_CREDITS) - 1;
        const creditsLeft = collectedData.aiCredits.productDesc;
        
        const creditNote = creditsLeft > 0 ? `_(You have ${creditsLeft} regeneration${creditsLeft > 1 ? 's' : ''} left for this product)_` : `_(No regenerations left)_`;
        replyText = `✨ *Here's your AI-generated product description:*\n\n"${generated}"\n\n${creditNote}\n\nReply:\n✅ *YES* - Use this description\n🔄 *REGENERATE* - Generate a different one`;
        nextStep = 'ai_product_desc_pending';
      } else if (text === '2') {
        replyText = `📝 Please describe the product (1-2 lines):`;
        nextStep = 'collect_product_desc';
      } else if (text === '3') {
        collectedData.productDesc = '';
        replyText = `Done! 📸\n\nFinal step: Please send a *Photo (Image)* of the product.`;
        nextStep = 'collect_product_image';
      } else {
        replyText = `Please reply with 1, 2, or 3.`;
        nextStep = 'ask_product_desc_ai';
      }
      break;

    case 'ai_product_desc_pending': {
      if (msgUpper === 'YES') {
        const accepted = collectedData.aiGenerations.productDesc[collectedData.aiGenerations.productDesc.length - 1];
        collectedData.productDesc = accepted;
        replyText = `✅ Description saved!\n\nFinal step: Please send a *Photo (Image)* of the product.`;
        nextStep = 'collect_product_image';
      } else if (msgUpper === 'REGENERATE') {
        if (collectedData.aiCredits.productDesc <= 0) {
          const opts = collectedData.aiGenerations.productDesc;
          replyText = `⚠️ *You've used all your description regenerations!*\n\nHere are both versions I generated:\n\n1️⃣ "${opts[0]}"\n\n2️⃣ "${opts[1]}"\n\nReply:\n*1* - Use option 1\n*2* - Use option 2\n*Or type your own description*`;
          nextStep = 'ai_product_desc_choose_option';
        } else {
          let bizName = collectedData.name || existingBusiness?.name || '';
          const generationIndex = AI_MAX_CREDITS - collectedData.aiCredits.productDesc;
          const regen = await generateProductDescription(
            { name: collectedData.productName, price: collectedData.productPrice, businessName: bizName, category: collectedData.category || 'General' },
            generationIndex
          );
          collectedData.aiGenerations.productDesc.push(regen);
          collectedData.aiCredits.productDesc -= 1;
          const creditsLeft = collectedData.aiCredits.productDesc;
          const creditNote = creditsLeft > 0 ? `_(You have ${creditsLeft} regeneration${creditsLeft > 1 ? 's' : ''} left for this product)_` : `_(No regenerations left. Reply YES to accept or REGENERATE to see your options.)_`;
          replyText = `🔄 *Here's a new AI-generated description:*\n\n"${regen}"\n\n${creditNote}\n\nReply:\n✅ *YES* - Use this description\n🔄 *REGENERATE* - ${creditsLeft > 0 ? 'Generate another' : 'Show all options'}`;
          nextStep = 'ai_product_desc_pending';
        }
      } else {
        replyText = `Please reply *YES* to accept the description or *REGENERATE* to get a new one.`;
        nextStep = 'ai_product_desc_pending';
      }
      break;
    }

    case 'ai_product_desc_choose_option': {
      const opts = collectedData.aiGenerations.productDesc;
      if (text === '1' && opts[0]) {
        collectedData.productDesc = opts[0];
      } else if (text === '2' && opts[1]) {
        collectedData.productDesc = opts[1];
      } else {
        collectedData.productDesc = text;
      }
      replyText = `✅ Description saved!\n\nFinal step: Please send a *Photo (Image)* of the product.`;
      nextStep = 'collect_product_image';
      break;
    }

    case 'collect_product_desc':
      collectedData.productDesc = text;
      replyText = `Done! 📸\n\nFinal step: Please send a *Photo (Image)* of the product.`;
      nextStep = 'collect_product_image';
      break;

    case 'collect_product_image':
      if (message.image && message.image.id) {
        replyText = ''; // Handled asynchronously by AI helper
        await handlePrefetchAndAskAI(phoneNumber, Object.assign({ itemWord }, collectedData), message, session.imageGenCredits ?? 3, true);
        return { handled: true };
      } else {
        replyText = `Please send an actual *Photo (Image)* of the product.`;
        nextStep = 'collect_product_image';
      }
      break;

    case 'ask_ai_image':
      if (text === '1' || msgUpper === 'YES') {
        if ((session.imageGenCredits ?? 3) > 0) {
          replyText = `✨ Enhancing your product photo with AI...\n\n_This usually takes 10-15 seconds. Please wait..._ ⏳`;
          await handleAiImage(phoneNumber, collectedData);
          await prisma.whatsappSession.update({
            where: { phoneNumber },
            data: { imageGenCredits: { decrement: 1 } }
          });
          return { handled: true };
        } else {
          replyText = `You are out of AI image credits! 😢\nUsing your original photo instead... ⏳`;
          collectedData.useAiImage = false;
          await handleAddProductFromBuffer(phoneNumber, collectedData);
          return { handled: true };
        }
      } else if (text === '2' || msgUpper === 'NO') {
        replyText = `Using your original photo... ⏳`;
        collectedData.useAiImage = false;
        await handleAddProductFromBuffer(phoneNumber, collectedData);
        return { handled: true };
      } else {
        replyText = `Please reply with 1 (Yes) or 2 (No).`;
        nextStep = 'ask_ai_image';
      }
      break;

    case 'ai_image_pending':
      if (text === '1' || msgUpper === 'YES') {
        replyText = `Awesome! Adding product to your store... ⏳`;
        collectedData.useAiImage = true;
        await handleAddProductFromBuffer(phoneNumber, collectedData);
        return { handled: true };
      } else if (text === '2' || msgUpper === 'NO') {
        replyText = `No problem, using your original photo... ⏳`;
        collectedData.useAiImage = false;
        await handleAddProductFromBuffer(phoneNumber, collectedData);
        return { handled: true };
      } else {
        replyText = `Please reply with 1 (Yes) or 2 (No).`;
        nextStep = 'ai_image_pending';
      }
      break;
      
    case 'collect_additional_images': {
      if (msgUpper === 'DONE' || msgUpper === 'NO') {
        replyText = `Got it! Would you like to add another product? Reply *YES* or *NO*.`;
        nextStep = 'ask_add_product';
      } else if (message.image && message.image.id) {
        replyText = `⏳ Uploading image to gallery...`;
        nextStep = 'collect_additional_images';
        const busId = collectedData.businessId;
        const prodId = collectedData.currentProductId;
        uploadWaImage(message.image.id, `dukaanhai/products/${busId}`).then(async (url) => {
           if (url) {
             const p = await prisma.product.findUnique({ where: { id: prodId } });
             if (p) {
               await prisma.product.update({
                 where: { id: prodId },
                 data: { images: [...p.images, url] }
               });
             }
             await sendWhatsAppMessage(phoneNumber, `✅ Image added to gallery! Send another image, or type *DONE*.`);
           } else {
             await sendWhatsAppMessage(phoneNumber, `❌ Failed to upload image. Send another or type *DONE*.`);
           }
        });
      } else {
        replyText = `Please send an actual *Photo (Image)* or type *DONE* to finish.`;
        nextStep = 'collect_additional_images';
      }
      break;
    }

    default:
      handled = false; // Not part of this flow
  }

  return { handled, replyText, nextStep, collectedData };
}
