const fs = require('fs');

const file = 'src/app/api/whatsapp/webhook/route.ts';
let code = fs.readFileSync(file, 'utf8');

const startTarget = "case 'handle_branding_choice':";
const endTarget = "case 'collect_name':"; // The next case after edit_footer

const startIndex = code.indexOf(startTarget);
const endIndex = code.indexOf(endTarget);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end index.");
  process.exit(1);
}

const before = code.substring(0, startIndex);
const after = code.substring(endIndex);

const replacement = `
      // Delegated to Branding Handler
      case 'handle_branding_choice':
      case 'edit_about_us':
      case 'edit_logo':
      case 'uploading_logo':
      case 'edit_favicon':
      case 'uploading_favicon':
      case 'edit_colors':
      case 'edit_socials':
      case 'edit_contact':
      case 'edit_footer': {
        const brandingRes = await handleBrandingState(ctx, collectedData);
        if (brandingRes.handled) {
          replyText = brandingRes.replyText || '';
          nextStep = brandingRes.nextStep || session.step;
          collectedData = brandingRes.collectedData || collectedData;
        }
        break;
      }

      `;

// Need to also inject the import at the top
const importInject = `import { handleIntentInterceptor } from './ai/intentInterceptor';\nimport { handleBrandingState } from './state-machine/brandingHandler';`;
code = before + replacement + after;
code = code.replace(`import { handleIntentInterceptor } from './ai/intentInterceptor';`, importInject);

fs.writeFileSync(file, code);
console.log('Successfully replaced branding logic.');
