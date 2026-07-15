export type TemplateCategory = 'general' | 'gym' | 'hotel' | 'ecommerce' | 'service' | 'handmade';
export type TemplateSubcategory = 'clothing' | 'electronics' | 'grocery' | 'bakery' | 'mehndi' | 'boutique' | 'resin' | 'crochet' | 'none';

export type FieldType = 'text' | 'textarea' | 'image' | 'gallery';

export interface TemplateField {
    id: string;
    label: string;
    type: FieldType;
    required?: boolean;
    description?: string;
}

export interface TemplateSection {
    id: string;
    name: string; // e.g., "Top Bar", "Banner Carousel"
    fields: TemplateField[];
}

export interface TemplateDef {
    id: string;
    name: string;
    desc: string;
    colors: string[];
    tag?: string;
    preview: string;
    category: TemplateCategory;
    subcategory?: TemplateSubcategory;
    sections?: TemplateSection[];
}

export const TEMPLATE_CATEGORIES = [
    { id: 'general', name: 'General Retail' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'gym', name: 'Gym & Fitness' },
    { id: 'hotel', name: 'Hotels & Hospitality' },
    { id: 'service', name: 'Services & Portfolio' },
];

export const ECOMMERCE_SUBCATEGORIES = [
    { id: 'clothing', name: 'Clothing & Apparel' },
    { id: 'electronics', name: 'Electronics & Gadgets' },
    { id: 'grocery', name: 'Grocery & Food' },
];

export const TEMPLATES: TemplateDef[] = [
    // --- THE 5 NEW MULTI-PAGE TEMPLATES ---
    {
        id: 'niche-crochet',
        name: 'Crochet & Knits',
        desc: 'Cozy, warm multi-page template for handmade crochet items.',
        colors: ['#fff7ed', '#c2410c', '#fdba74'],
        tag: 'New',
        preview: '🧶',
        category: 'handmade',
        subcategory: 'crochet',
        sections: [
            { id: 'topBar', name: 'Top Bar', fields: [{ id: 'text', label: 'Announcement Text', type: 'text', description: 'e.g. Free shipping on orders over ₹1000' }] },
            { id: 'bannerCarousel', name: 'Banner Carousel', fields: [{ id: 'images', label: 'Carousel Images', type: 'gallery', description: 'Upload up to 3 banner images' }] },
            { id: 'aboutUs', name: 'About the Creator', fields: [{ id: 'image', label: 'Creator Photo', type: 'image' }, { id: 'bio', label: 'Bio Text', type: 'textarea' }] },
            { id: 'reviews', name: 'Customer Reviews', fields: [{ id: 'enabled', label: 'Enable Reviews', type: 'text', description: 'Type yes or no' }] }
        ]
    },
    {
        id: 'niche-baker',
        name: 'Home Baker',
        desc: 'Sweet and delightful template for cakes and baked goods.',
        colors: ['#fdf2f8', '#be185d', '#f9a8d4'],
        tag: 'New',
        preview: '🎂',
        category: 'handmade',
        subcategory: 'bakery',
        sections: [
            { id: 'heroVideo', name: 'Hero Video/Image', fields: [{ id: 'media', label: 'Background Media', type: 'image' }, { id: 'headline', label: 'Headline', type: 'text' }] },
            { id: 'menuHighlights', name: 'Menu Highlights', fields: [{ id: 'title', label: 'Section Title', type: 'text' }] },
            { id: 'orderPolicy', name: 'Order Policy', fields: [{ id: 'text', label: 'Policy Text', type: 'textarea', description: 'e.g. Please order 48 hours in advance' }] }
        ]
    },
    {
        id: 'niche-mehndi',
        name: 'Mehndi Artist',
        desc: 'Elegant, intricate design focused on portfolio galleries and booking.',
        colors: ['#fefce8', '#854d0e', '#fef08a'],
        tag: 'New',
        preview: '🌿',
        category: 'service',
        subcategory: 'mehndi',
        sections: [
            { id: 'portfolioGallery', name: 'Portfolio Gallery', fields: [{ id: 'images', label: 'Design Images', type: 'gallery' }] },
            { id: 'pricingPackages', name: 'Pricing Packages', fields: [{ id: 'bridal', label: 'Bridal Starting Price', type: 'text' }, { id: 'guest', label: 'Guest Starting Price', type: 'text' }] },
            { id: 'contactForm', name: 'Booking Contact', fields: [{ id: 'whatsappText', label: 'WhatsApp Pre-fill Text', type: 'text' }] }
        ]
    },
    {
        id: 'niche-boutique',
        name: 'Fashion Boutique',
        desc: 'Chic, premium layout for independent clothing brands.',
        colors: ['#ffffff', '#000000', '#e5e7eb'],
        tag: 'New',
        preview: '👗',
        category: 'ecommerce',
        subcategory: 'boutique',
        sections: [
            { id: 'videoHeader', name: 'Video Header', fields: [{ id: 'videoUrl', label: 'Video URL', type: 'text' }] },
            { id: 'newArrivals', name: 'New Arrivals', fields: [{ id: 'title', label: 'Collection Title', type: 'text' }] },
            { id: 'sizeGuide', name: 'Size Guide', fields: [{ id: 'image', label: 'Size Chart Image', type: 'image' }] },
            { id: 'instagramFeed', name: 'Instagram Feed', fields: [{ id: 'handle', label: 'Instagram Handle', type: 'text' }] }
        ]
    },
    {
        id: 'niche-resin',
        name: 'Resin & Candles',
        desc: 'Aesthetic, minimal template for resin art and scented candles.',
        colors: ['#f8fafc', '#334155', '#cbd5e1'],
        tag: 'New',
        preview: '🕯️',
        category: 'handmade',
        subcategory: 'resin',
        sections: [
            { id: 'splitHero', name: 'Split Hero Section', fields: [{ id: 'image', label: 'Hero Image', type: 'image' }, { id: 'text', label: 'Hero Text', type: 'textarea' }] },
            { id: 'processVideo', name: 'Making Process', fields: [{ id: 'videoUrl', label: 'Process Video URL', type: 'text' }, { id: 'desc', label: 'Process Description', type: 'textarea' }] },
            { id: 'faq', name: 'FAQ Section', fields: [{ id: 'q1', label: 'Question 1', type: 'text' }, { id: 'a1', label: 'Answer 1', type: 'textarea' }] }
        ]
    }
];

export function getTemplateById(id: string): TemplateDef | undefined {
    return TEMPLATES.find(t => t.id === id);
}
