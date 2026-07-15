const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

const templates = [
  { file: 'minimal/index.tsx', cat: 'general' },
  { file: 'BoldTemplate.tsx', cat: 'general' },
  { file: 'CatalogTemplate.tsx', cat: 'general' },
  { file: 'FuturisticTemplate.tsx', cat: 'general' },
  { file: 'ElegantTemplate.tsx', cat: 'general' },
  { file: 'PlayfulTemplate.tsx', cat: 'general' },
  { file: 'GymPowerTemplate.tsx', cat: 'gym' },
  { file: 'GymZenTemplate.tsx', cat: 'gym' },
  { file: 'GymModernTemplate.tsx', cat: 'gym' },
  { file: 'HotelLuxuryTemplate.tsx', cat: 'hotel' },
  { file: 'HotelResortTemplate.tsx', cat: 'hotel' },
  { file: 'HotelBoutiqueTemplate.tsx', cat: 'hotel' },
  { file: 'EcommerceClothingChicTemplate.tsx', cat: 'ecommerce', sub: 'clothing' },
  { file: 'EcommerceClothingStreetTemplate.tsx', cat: 'ecommerce', sub: 'clothing' },
  { file: 'EcommerceTechGadgetTemplate.tsx', cat: 'ecommerce', sub: 'electronics' },
  { file: 'EcommerceTechCyberTemplate.tsx', cat: 'ecommerce', sub: 'electronics' },
  { file: 'EcommerceFoodFreshTemplate.tsx', cat: 'ecommerce', sub: 'grocery' },
  { file: 'EcommerceFoodMenuTemplate.tsx', cat: 'ecommerce', sub: 'grocery' },
  { file: 'service-modern/index.tsx', cat: 'service' },
  { file: 'PortfolioCreativeTemplate.tsx', cat: 'service' },
  { file: 'LandingMinimalTemplate.tsx', cat: 'service' }
];

templates.forEach(({ file, cat, sub }) => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import for placeholders if not exists
    if (!content.includes('getPlaceholderImage')) {
        content = content.replace(/(import .* from '.*';\n)/, `$1import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';\n`);
    }

    // Add config parsing
    if (!content.includes('const config =')) {
        content = content.replace(/export default function .*\(.*\) {/, (match) => {
            return `${match}\n    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};`;
        });
    }

    // Replace bannerUrl with placeholder logic
    content = content.replace(/business\.bannerUrl \?\?/g, `config?.hero?.image || business.bannerUrl ??`);
    content = content.replace(/business\.bannerUrl/g, `(config?.hero?.image || business.bannerUrl || getPlaceholderImage('${cat}', '${sub || ''}'))`);
    
    // Replace headline and about with placeholder logic
    content = content.replace(/business\.headline/g, `(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, '${cat}'))`);
    content = content.replace(/business\.about/g, `(config?.about?.text || business.about || getPlaceholderText('about', business.name, '${cat}'))`);
    content = content.replace(/business\.tagline/g, `(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, '${cat}'))`);

    // Add type definition fallback for typescript issues
    content = content.replace(/business: {/g, 'business: any | {');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
