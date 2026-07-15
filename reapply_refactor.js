const fs = require('fs');

const file = 'src/app/api/whatsapp/webhook/route.ts';
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports
const imports = `import { getOrCreateSession, updateSessionStep } from './services/sessionService';
import { getExistingUserAndBusiness } from './services/userService';
import { handleGlobalCommands } from './commands/globalCommands';
import { handleIntentInterceptor } from './ai/intentInterceptor';
import { sendWhatsAppMessage, uploadWaImage, getTemplatePrompt } from './utils';
`;
code = code.replace(`import { handleTemplateConfigFlow, getFirstMissingField, generatePromptForField } from './flows/templateConfigFlow';`, `import { handleTemplateConfigFlow, getFirstMissingField, generatePromptForField } from './flows/templateConfigFlow';\n${imports}`);

// 2. Remove old duplicate sendWhatsAppMessage
const sendWaIdx = code.indexOf('async function sendWhatsAppMessage(to: string, text: string) {');
if (sendWaIdx !== -1) {
    const endWaIdx = code.indexOf('}', sendWaIdx + 300) + 1;
    code = code.substring(0, sendWaIdx) + code.substring(endWaIdx);
}

// 3. Replace Get or create session
const sessionStart = code.indexOf('// Get or create session');
const sessionEnd = code.indexOf('const templateCat', sessionStart);
if (sessionStart !== -1 && sessionEnd !== -1) {
    code = code.substring(0, sessionStart) + `// Get or create session
    let { session, isTimeout } = await getOrCreateSession(phoneNumber);

    const msgUpper = text.toUpperCase();

    // Check if user has an existing account/business
    const { existingUser, existingBusiness } = await getExistingUserAndBusiness(phoneNumber);
    
    ` + code.substring(sessionEnd);
}

// 4. Replace Global commands
const globalStart = code.indexOf('// -- Global Command Interceptor --');
const globalEnd = code.indexOf('let collectedData = (session.collectedData', globalStart);
if (globalStart !== -1 && globalEnd !== -1) {
    code = code.substring(0, globalStart) + `// -- Global Command Interceptor --
    const ctx = { phoneNumber, text, msgUpper, session, existingUser, existingBusiness, templateCat, isService, itemWord, isTimeout, message };
    const commandRes = await handleGlobalCommands(ctx);
    if (commandRes.handled) return NextResponse.json({ status: 'ok' });

    ` + code.substring(globalEnd);
}

// 5. Replace AI Conversational Interceptor
const aiStart = code.indexOf('// AI Conversational Interceptor');
const aiEnd = code.indexOf('const flowStates = [', aiStart);
if (aiStart !== -1 && aiEnd !== -1) {
    code = code.substring(0, aiStart) + `// AI Conversational Interceptor
    const intentRes = await handleIntentInterceptor(ctx, collectedData);
    if (intentRes.handled) {
      replyText = intentRes.replyText || '';
      nextStep = intentRes.nextStep || session.step;
      collectedData = intentRes.collectedData || collectedData;
    }

    ` + code.substring(aiEnd);
}

// 6. Delete getTemplatePrompt & uploadWaImage 
const getTmplStart = code.indexOf('const getTemplatePrompt = (title: string) => {');
const getTmplEnd = code.indexOf('export async function POST(req: NextRequest) {', getTmplStart);
if (getTmplStart !== -1 && getTmplEnd !== -1) {
    code = code.substring(0, getTmplStart) + code.substring(getTmplEnd);
}

// 7. Add the new V2 states to flowStates
const flowStatesStr = `const flowStates = [
      'ask_add_product', 'collect_product_name', 'collect_product_price',
      'ask_product_desc_ai', 'ai_product_desc_pending', 'ai_product_desc_choose_option',
      'collect_product_desc', 'collect_product_image', 'ask_ai_image',
      'ai_image_pending', 'collect_additional_images', 'collect_template_field'
    ];`;
const newFlowStatesStr = `const flowStates = [
      'ask_add_product', 'collect_product_name', 'collect_product_price',
      'ask_product_desc_ai', 'ai_product_desc_pending', 'ai_product_desc_choose_option',
      'collect_product_desc', 'collect_product_image', 'ask_ai_image',
      'ai_image_pending', 'collect_additional_images', 'collect_template_field',
      'ask_field_source', 'ai_field_preview', 'manual_field_input'
    ];`;
code = code.replace(flowStatesStr, newFlowStatesStr);

code = code.replace(`if (session.step === 'collect_template_field') {`, `if (['collect_template_field', 'ask_field_source', 'ai_field_preview', 'manual_field_input'].includes(session.step)) {`);

fs.writeFileSync(file, code);
console.log('Reapplied refactoring and added new V2 states successfully.');
