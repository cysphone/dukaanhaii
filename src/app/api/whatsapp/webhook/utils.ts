import { prisma } from '@/lib/prisma';
import { generateProductImage } from '@/lib/gemini';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { TEMPLATES } from '@/lib/templates';

const WA_TOKEN = process.env.WHATSAPP_TOKEN!;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID!;

export const getTemplatePrompt = (title: string) => {
  let message = `${title}\n\n`;
  TEMPLATES.forEach((t, i) => {
    message += `*${i + 1}.* *${t.name}*\n_${t.desc}_\n\n`;
  });
  message += `Reply with a number from 1 to ${TEMPLATES.length}.`;
  return message;
};

export async function uploadWaImage(imageId: string, folder: string) {
  try {
    const waMediaUrl = `https://graph.facebook.com/v20.0/${imageId}`;
    const mediaRes = await fetch(waMediaUrl, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
    const mediaData = await mediaRes.json();
    if (mediaData.url) {
      const imageRes = await fetch(mediaData.url, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
      const arrayBuffer = await imageRes.arrayBuffer();
      return await uploadImageToCloudinary(Buffer.from(arrayBuffer), folder);
    }
  } catch (e) {
    console.error('Error uploading WA image:', e);
  }
  return null;
}

export async function sendWhatsAppMessage(to: string, text: string) {
  const url = `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WA_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });
}

export async function sendWhatsAppImageMessage(to: string, imageUrl: string, caption: string) {
  const url = `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WA_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'image',
      image: { link: imageUrl, caption },
    }),
  });
}

export async function handlePrefetchAndAskAI(
  phoneNumber: string,
  data: any,
  message: any,
  imageGenCredits: number,
  aiEnabled: boolean
) {
  try {
    const image = message.image;
    if (!image?.id) throw new Error('No image ID');

    const waMediaUrl = `https://graph.facebook.com/v20.0/${image.id}`;
    const mediaRes = await fetch(waMediaUrl, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
    const mediaData = await mediaRes.json();

    if (!mediaData.url) throw new Error('Could not get media URL');

    const imageRes = await fetch(mediaData.url, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
    const arrayBuffer = await imageRes.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    data.rawImageBase64 = rawBuffer.toString('base64');

    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'ask_ai_image', collectedData: data },
    });

    if (imageGenCredits > 0 && aiEnabled) {
      await sendWhatsAppMessage(
        phoneNumber,
        `✅ Photo received!\n\n🤖 *Want AI to enhance it?*\n\nI can remove the background and create a professional studio-quality product photo.\n\n🎨 *${imageGenCredits} AI image credit${imageGenCredits !== 1 ? 's' : ''} remaining*\n\n1️⃣ *YES* - Generate AI image\n2️⃣ *NO* - Use my original photo`
      );
    } else {
      await sendWhatsAppMessage(phoneNumber, `✅ Photo received! (No AI credits remaining)\n\n⏳ Adding your product...`);
      await handleAddProductFromBuffer(phoneNumber, data);
    }
  } catch (error) {
    console.error('handlePrefetchAndAskAI error:', error);
    await sendWhatsAppMessage(phoneNumber, `❌ Could not process your image. Please try sending it again.`);
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'collect_product_image', collectedData: data },
    });
  }
}

export async function handleAiImage(phoneNumber: string, data: any) {
  try {
    if (!data.rawImageBase64) throw new Error('No raw image stored');

    const rawBuffer = Buffer.from(data.rawImageBase64, 'base64');
    const aiBuffer = await generateProductImage(rawBuffer, data.productName || 'Product');
    const aiImageUrl = await uploadImageToCloudinary(aiBuffer, `dukaanhai/ai-previews/${data.businessId}`);

    data.aiImageUrl = aiImageUrl;
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'ai_image_pending', collectedData: data },
    });

    await sendWhatsAppImageMessage(
      phoneNumber,
      aiImageUrl,
      `✨ Here's your AI-enhanced product photo!\n\nReply:\n1️⃣ *YES* - Use this image\n2️⃣ *NO* - Use my original photo`
    );
  } catch (error) {
    console.error('handleAiImage error:', error);
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: {
        imageGenCredits: { increment: 1 },
      } as any,
    });
    throw error;
  }
}

export async function handleAddProductFromBuffer(phoneNumber: string, data: any) {
  try {
    let imageUrl = '';

    if (data.useAiImage && data.aiImageUrl) {
      imageUrl = data.aiImageUrl;
    } else if (data.rawImageBase64) {
      const rawBuffer = Buffer.from(data.rawImageBase64, 'base64');
      imageUrl = await uploadImageToCloudinary(rawBuffer, `dukaanhai/products/${data.businessId}`);
    }

    const product = await prisma.product.create({
      data: {
        businessId: data.businessId,
        name: data.productName,
        price: data.productPrice,
        description: data.productDesc,
        imageUrl: imageUrl || null,
        images: imageUrl ? [imageUrl] : [],
        inStock: true,
      },
    });

    const iWord = data.itemWord || 'Item';
    await sendWhatsAppMessage(phoneNumber, `✅ ${iWord} added successfully!\n\n🖼️ Would you like to add more images to this gallery? Send another image now, or reply *DONE* to finish.`);
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'collect_additional_images', collectedData: { businessId: data.businessId, currentProductId: product.id, itemWord: data.itemWord } },
    });
  } catch (error) {
    console.error('handleAddProductFromBuffer error:', error);
    await sendWhatsAppMessage(phoneNumber, `❌ Failed to add product. Please try again.\n\nReply *YES* to try again or *NO* to skip.`);
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'ask_add_product', collectedData: { businessId: data.businessId } },
    });
  }
}
