import { classifyUserIntent } from '@/lib/gemini';
import { getStoreUrl } from '@/lib/utils';
import { getTemplatePrompt } from '../utils';
import { HandlerContext, HandlerResponse } from '../types/whatsapp';

export async function handleIntentInterceptor(ctx: HandlerContext, collectedData: any): Promise<HandlerResponse> {
  const { session, text, existingBusiness, itemWord } = ctx;
  let replyText = '';
  let nextStep = session.step;

  const idleStates = ['main_menu', 'handle_menu_choice', 'completed'];
  
  if (idleStates.includes(session.step) && text && !['1','2','3','4','5','6','7','MENU','RESET','SKIP'].includes(text.toUpperCase())) {
    const aiResponse = await classifyUserIntent(text);
    
    if (aiResponse.intent === 'create_store') {
      if (existingBusiness) {
         replyText = `You already have a store! You can only have 1 store per number.\n\nType *MENU* to see options for your existing store.`;
         nextStep = 'completed';
      } else {
         collectedData.category = aiResponse.extractedData?.category || 'general';
         replyText = `That's a great idea! Let's build your store right away. 🚀\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      }
    } else if (aiResponse.intent === 'add_product') {
      if (!existingBusiness) {
         replyText = `You don't have a store yet! Let's build one.\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      } else {
         replyText = `Great! 📝 Enter your new product's *Name*:`;
         nextStep = 'collect_product_name';
         collectedData.businessId = existingBusiness.id;
      }
    } else if (aiResponse.intent === 'edit_desc') {
      if (!existingBusiness) {
         replyText = `You don't have a store yet! Let's build one.\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      } else {
         replyText = `✏️ Please send your new store tagline or description:`;
         nextStep = 'edit_store_desc';
         collectedData.businessId = existingBusiness.id;
      }
    } else if (aiResponse.intent === 'edit_template') {
      if (!existingBusiness) {
         replyText = `You don't have a store yet! Let's build one.\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      } else {
         replyText = getTemplatePrompt('🎨 *Select a new template for your website:*');
         nextStep = 'save_website_template';
         collectedData.businessId = existingBusiness.id;
      }
    } else if (aiResponse.intent === 'edit_branding') {
      if (!existingBusiness) {
         replyText = `You don't have a store yet! Let's build one.\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      } else {
         replyText = `🎨 *What branding detail would you like to edit?*\n\n1️⃣ About Us\n2️⃣ Brand Logo\n3️⃣ Favicon\n4️⃣ Brand Colors\n5️⃣ Social Links\n6️⃣ Contact Info\n7️⃣ Footer & Copyright\n\nReply with a number 1-7.`;
         nextStep = 'handle_branding_choice';
         collectedData.businessId = existingBusiness.id;
      }
    } else if (aiResponse.intent === 'get_link') {
      const storeUrl = existingBusiness ? getStoreUrl(existingBusiness.slug) : null;
      if (storeUrl) {
         replyText = `🔗 *Here is your store link:*\n\n${storeUrl}\n\nType *MENU* to see more options.`;
         nextStep = 'completed';
      } else {
         replyText = `You don't have a store yet! Let's build one.\n\n*Please enter your store name:*`;
         nextStep = 'collect_name';
      }
    } else if (aiResponse.intent === 'menu') {
      replyText = `Welcome back! 🏪\n\nWhat would you like to change in your store?\n\n1️⃣ Edit Store Description\n2️⃣ Add New ${itemWord}\n3️⃣ Edit Existing ${itemWord}\n4️⃣ Edit Website Template\n5️⃣ Edit Branding & Details (Logo, Colors, Socials)\n6️⃣ Get Store Link\n\nReply with 1, 2, 3, 4, 5, or 6.`;
      nextStep = 'handle_menu_choice';
      if (existingBusiness) collectedData.businessId = existingBusiness.id;
    } else {
      if (aiResponse.replyText) {
        replyText = aiResponse.replyText;
        nextStep = session.step;
      }
    }
  }

  if (replyText) {
    return { handled: true, replyText, nextStep, collectedData };
  }

  return { handled: false };
}
