const fs = require('fs');

let content = fs.readFileSync('src/app/api/whatsapp/webhook/route.ts', 'utf8');

// 1. Add itemWord logic near the top of POST function
const itemWordLogic = `
    const templateCat = existingBusiness ? (await import('@/lib/templates')).getTemplateById(existingBusiness.templateType)?.category : 'ecommerce';
    const isService = templateCat === 'service' || templateCat === 'hotel';
    const itemWord = isService ? 'Service' : 'Product';
`;
content = content.replace('if (!text) return NextResponse.json({ status: \'ok\' });', `if (!text) return NextResponse.json({ status: 'ok' });\n${itemWordLogic}`);

// 2. Replace hardcoded "Product" with \${itemWord} in the AI Interceptor
content = content.replace(/2️⃣ Add New Product/g, "2️⃣ Add New \${itemWord}");
content = content.replace(/3️⃣ Edit Existing Product/g, "3️⃣ Edit Existing \${itemWord}");
content = content.replace(/Great! 📝 Enter your new product's \*Name\*:/g, "Great! 📝 Enter your new \${itemWord.toLowerCase()}'s *Name*:");

// 3. Replace in handle_menu_choice
content = content.replace(/2️⃣ Add New Product/g, "2️⃣ Add New \${itemWord}");
content = content.replace(/3️⃣ Edit Existing Product/g, "3️⃣ Edit Existing \${itemWord}");
content = content.replace(/Great! 📝 Enter your new product's \*Name\*:/g, "Great! 📝 Enter your new \${itemWord.toLowerCase()}'s *Name*:");
content = content.replace(/You don't have any products in your store./g, "You don't have any \${itemWord.toLowerCase()}s in your store.");
content = content.replace(/Which product do you want to edit\?/g, "Which \${itemWord.toLowerCase()} do you want to edit?");
content = content.replace(/🗑️ Product deleted successfully!/g, "🗑️ \${itemWord} deleted successfully!");
content = content.replace(/✅ Product updated successfully!/g, "✅ \${itemWord} updated successfully!");

// 4. Update AI interceptor to capture add_service
content = content.replace(
  /if \(aiResponse\.intent === 'add_product'\) \{/g,
  `if (aiResponse.intent === 'add_product' || aiResponse.intent === 'add_service') {`
);

// 5. Change product creation completion to ask for more images (line ~1358 and ~1514)
content = content.replace(
  /await prisma\.product\.create\(\{\n\s*data: \{\n\s*businessId: data\.businessId,\n\s*name: data\.productName,\n\s*price: data\.productPrice,\n\s*description: data\.productDesc,\n\s*imageUrl: imageUrl \|\| null,\n\s*inStock: true\n\s*\}\n\s*\}\);/g,
  `const product = await prisma.product.create({
      data: {
        businessId: data.businessId,
        name: data.productName,
        price: data.productPrice,
        description: data.productDesc,
        imageUrl: imageUrl || null,
        images: imageUrl ? [imageUrl] : [],
        inStock: true
      }
    });`
);
content = content.replace(
  /await sendWhatsAppMessage\(phoneNumber, `✅ Product added successfully!\\n\\nWould you like to add another product\? Reply \*YES\* or \*NO\*\.`\);\n\s*await prisma\.whatsappSession\.update\(\{\n\s*where: \{ phoneNumber \},\n\s*data: \{ step: 'ask_add_product', collectedData: \{ businessId: data\.businessId \} \},\n\s*\}\);/g,
  `await sendWhatsAppMessage(phoneNumber, \`✅ \${data.itemWord || 'Item'} added successfully!\\n\\n🖼️ Would you like to add more images to this gallery? Send another image now, or reply *DONE* to finish.\`);
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { step: 'collect_additional_images', collectedData: { businessId: data.businessId, currentProductId: product.id, itemWord: data.itemWord } },
    });`
);

// We need to pass itemWord into handlePrefetchAndAskAI
content = content.replace(
  /handlePrefetchAndAskAI\(phoneNumber, Object\.assign\(\{\}, collectedData\), message, \(session as any\)\.imageGenCredits \?\? 3, aiEnabled\)/g,
  `handlePrefetchAndAskAI(phoneNumber, Object.assign({ itemWord }, collectedData), message, (session as any).imageGenCredits ?? 3, aiEnabled)`
);

// 6. Add 'collect_additional_images' case to switch
const caseAdditionalImages = `
      case 'collect_additional_images': {
        const iWord = collectedData.itemWord || 'Product';
        if (text.toUpperCase() === 'DONE' || text.toUpperCase() === 'NO') {
          replyText = \`Got it! Would you like to add another \${iWord.toLowerCase()}? Reply *YES* or *NO*.\`;
          nextStep = 'ask_add_product';
        } else if (message.image && message.image.id) {
          replyText = \`⏳ Uploading image to gallery...\`;
          nextStep = 'collect_additional_images';
          const busId = collectedData.businessId;
          const prodId = collectedData.currentProductId;
          uploadWaImage(message.image.id, \`dukaanhai/products/\${busId}\`).then(async (url) => {
             if (url) {
               const p = await prisma.product.findUnique({ where: { id: prodId } });
               if (p) {
                 await prisma.product.update({
                   where: { id: prodId },
                   data: { images: [...p.images, url] }
                 });
               }
               await sendWhatsAppMessage(phoneNumber, \`✅ Image added to gallery! Send another image, or type *DONE*.\`);
             } else {
               await sendWhatsAppMessage(phoneNumber, \`❌ Failed to upload image. Send another or type *DONE*.\`);
             }
          });
        } else {
          replyText = \`Please send an actual *Photo (Image)* or type *DONE* to finish.\`;
          nextStep = 'collect_additional_images';
        }
        break;
      }
`;

content = content.replace(/case 'ask_add_product':/g, caseAdditionalImages + '\n      case \'ask_add_product\':');

// 7. Replace "Would you like to add another product" in ask_add_product
content = content.replace(/case 'ask_add_product':\s*if \(text\.toUpperCase\(\) === 'YES'\) \{\s*replyText = `Great! 📝 Enter your new product's \*Name\*:`/g, 
  `case 'ask_add_product':
        const iWord = collectedData.itemWord || 'Product';
        if (text.toUpperCase() === 'YES') {
          replyText = \`Great! 📝 Enter your new \${iWord.toLowerCase()}'s *Name*:\``);

fs.writeFileSync('src/app/api/whatsapp/webhook/route.ts', content);
console.log('Done!');
