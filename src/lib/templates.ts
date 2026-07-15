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
    { id: 'handmade', name: 'Handmade & Niches' },
];

export const ECOMMERCE_SUBCATEGORIES = [
    { id: 'clothing', name: 'Clothing & Apparel' },
    { id: 'electronics', name: 'Electronics & Gadgets' },
    { id: 'grocery', name: 'Grocery & Food' },
    { id: 'boutique', name: 'Fashion Boutique' }
];

// Re-usable common sections to avoid typing them 20 times
const COMMON_SECTIONS: Record<string, TemplateSection> = {
    hero: { id: 'hero', name: 'Hero Section', fields: [{ id: 'image', label: 'Background Image', type: 'image' }, { id: 'headline', label: 'Main Headline', type: 'text' }, { id: 'tagline', label: 'Sub-headline (Tagline)', type: 'textarea' }] },
    about: { id: 'about', name: 'About Us', fields: [{ id: 'image', label: 'About Image', type: 'image' }, { id: 'text', label: 'About Text', type: 'textarea' }] },
    cta: { id: 'cta', name: 'Call to Action', fields: [{ id: 'title', label: 'CTA Title', type: 'text' }, { id: 'buttonText', label: 'Button Text', type: 'text' }] },
    features: { id: 'features', name: 'Key Features', fields: [{ id: 'f1', label: 'Feature 1', type: 'text' }, { id: 'f2', label: 'Feature 2', type: 'text' }, { id: 'f3', label: 'Feature 3', type: 'text' }] }
};

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
    },

    // --- THE UPGRADED 20+ LEGACY TEMPLATES ---
    
    // General Retail
    { id: 'minimal', name: 'Minimal Artisan', desc: 'Clean, elegant design with generous whitespace. Perfect for artisans, boutiques, and premium products.', colors: ['#fafaf9', '#1c1917', '#f97316'], tag: 'Popular', preview: '🤍', category: 'general', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, COMMON_SECTIONS.cta] },
    { id: 'bold', name: 'Bold Visual Brand', desc: 'High-impact visuals with bold typography. Ideal for fashion, food, and lifestyle brands.', colors: ['#1c1917', '#f97316', '#fbbf24'], tag: 'Trending', preview: '🔥', category: 'general', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.features, COMMON_SECTIONS.cta] },
    { id: 'catalog', name: 'Mobile Catalog', desc: 'Grid-first product display optimized for mobile browsing and WhatsApp sharing.', colors: ['#f0fdf4', '#166534', '#22c55e'], tag: 'Mobile First', preview: '📱', category: 'general', sections: [COMMON_SECTIONS.hero] },
    { id: 'futuristic', name: 'Sci-Fi Cyber', desc: 'Neon and glowing tech aesthetic. Perfect for electronics, gaming, and modern gadgets.', colors: ['#000000', '#06b6d4', '#0891b2'], tag: 'Dark Mode', preview: '🚀', category: 'general', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.features] },
    { id: 'elegant', name: 'Luxury Class', desc: 'Serif fonts, smooth fade-ins, and elegant spacing. Ideal for luxury goods and boutiques.', colors: ['#fdfbf7', '#2c2a29', '#d4af37'], tag: 'Premium', preview: '✨', category: 'general', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, COMMON_SECTIONS.cta] },
    { id: 'playful', name: 'Fun Brutalist', desc: 'Vibrant colors, thick borders, and playful animations. Great for toys, art, and creative brands.', colors: ['#fff4e6', '#ff6b6b', '#4ecdc4'], tag: 'Creative', preview: '🎨', category: 'general', sections: [COMMON_SECTIONS.hero, { id: 'bannerCarousel', name: 'Banner Carousel', fields: [{ id: 'images', label: 'Carousel Images', type: 'gallery' }] }] },

    // Gym & Fitness
    { id: 'gym-power', name: 'Power Gym', desc: 'High contrast, dark mode, red accents, bold typography. Focused on memberships and classes.', colors: ['#111827', '#dc2626', '#fca5a5'], tag: 'Hardcore', preview: '🏋️', category: 'gym', sections: [COMMON_SECTIONS.hero, { id: 'classes', name: 'Classes Info', fields: [{ id: 'info', label: 'Class Information', type: 'textarea' }] }, COMMON_SECTIONS.cta] },
    { id: 'gym-zen', name: 'Zen Yoga', desc: 'Calming greens, rounded corners, soft shadows. Focused on yoga and wellness.', colors: ['#f0fdf4', '#15803d', '#86efac'], tag: 'Wellness', preview: '🧘', category: 'gym', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, { id: 'philosophy', name: 'Our Philosophy', fields: [{ id: 'text', label: 'Philosophy Text', type: 'textarea' }] }] },
    { id: 'gym-modern', name: 'Modern Fitness', desc: 'Professional, yellow/black aesthetic, standard clean fitness design.', colors: ['#27272a', '#eab308', '#fef08a'], tag: 'Pro', preview: '🏆', category: 'gym', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.features, COMMON_SECTIONS.cta] },

    // Hotels & Hospitality
    { id: 'hotel-luxury', name: 'Luxury Hotel', desc: 'Serif fonts, gold/dark elegance, emphasis on imagery and large hero sections.', colors: ['#1c1917', '#d4af37', '#fef3c7'], tag: 'Premium', preview: '🏨', category: 'hotel', sections: [COMMON_SECTIONS.hero, { id: 'amenities', name: 'Amenities', fields: [{ id: 'list', label: 'Amenities List', type: 'textarea' }] }, COMMON_SECTIONS.about] },
    { id: 'hotel-resort', name: 'Tropical Resort', desc: 'Bright, airy, ocean blues, tropical aesthetic.', colors: ['#f0f9ff', '#0284c7', '#7dd3fc'], tag: 'Vacation', preview: '🌴', category: 'hotel', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.features, { id: 'gallery', name: 'Resort Gallery', fields: [{ id: 'images', label: 'Gallery Images', type: 'gallery' }] }] },
    { id: 'hotel-boutique', name: 'Boutique Inn', desc: 'Earth tones, cozy vibes, masonry layout for rooms.', colors: ['#fefce8', '#713f12', '#d97706'], tag: 'Cozy', preview: '🛎️', category: 'hotel', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, COMMON_SECTIONS.cta] },

    // E-Commerce
    { id: 'ecommerce-clothing-chic', name: 'Chic Lookbook', desc: 'Lookbook style, large edge-to-edge images, minimalist UI.', colors: ['#ffffff', '#000000', '#d1d5db'], tag: 'Fashion', preview: '👗', category: 'ecommerce', subcategory: 'clothing', sections: [COMMON_SECTIONS.hero, { id: 'lookbook', name: 'Lookbook Gallery', fields: [{ id: 'images', label: 'Lookbook Images', type: 'gallery' }] }] },
    { id: 'ecommerce-clothing-street', name: 'Streetwear Drop', desc: 'Brutalist or bold, ticker tapes, scrolling text, high energy.', colors: ['#000000', '#fbbf24', '#f87171'], tag: 'Hype', preview: '🛹', category: 'ecommerce', subcategory: 'clothing', sections: [{ id: 'videoHeader', name: 'Video Header', fields: [{ id: 'videoUrl', label: 'Video URL', type: 'text' }] }, COMMON_SECTIONS.hero] },
    { id: 'ecommerce-tech-gadget', name: 'Clean Tech', desc: 'Apple-esque clean white/grey layout, specs focus.', colors: ['#f8fafc', '#334155', '#94a3b8'], tag: 'Modern', preview: '💻', category: 'ecommerce', subcategory: 'electronics', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.features] },
    { id: 'ecommerce-tech-cyber', name: 'Gamer Edge', desc: 'Glowing borders, dark mode, gaming-focused.', colors: ['#09090b', '#8b5cf6', '#a78bfa'], tag: 'Gaming', preview: '🎮', category: 'ecommerce', subcategory: 'electronics', sections: [COMMON_SECTIONS.hero, { id: 'specs', name: 'Tech Specs', fields: [{ id: 'details', label: 'Details', type: 'textarea' }] }] },
    { id: 'ecommerce-food-fresh', name: 'Fresh Market', desc: 'Green/orange colors, rounded shapes, grid focus for produce.', colors: ['#fdf8f6', '#ea580c', '#fdba74'], tag: 'Organic', preview: '🥗', category: 'ecommerce', subcategory: 'grocery', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, COMMON_SECTIONS.cta] },
    { id: 'ecommerce-food-menu', name: 'Digital Menu', desc: 'List-based like a restaurant menu or catalog.', colors: ['#fff1f2', '#e11d48', '#fb7185'], tag: 'Menu', preview: '🍔', category: 'ecommerce', subcategory: 'grocery', sections: [COMMON_SECTIONS.hero, { id: 'specialties', name: 'Chef Specialties', fields: [{ id: 'items', label: 'Special Items', type: 'textarea' }] }] },

    // Services & Portfolio
    { id: 'service-modern', name: 'Modern Agency', desc: 'Sleek, professional design for agencies and service businesses. Focus on services and mission.', colors: ['#0f172a', '#f8fafc', '#3b82f6'], tag: 'Service', preview: '💼', category: 'service', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about, COMMON_SECTIONS.features, COMMON_SECTIONS.cta] },
    { id: 'portfolio-creative', name: 'Creative Studio', desc: 'Bold typography, big images, designed for creative agencies and portfolios.', colors: ['#000000', '#ffffff', '#a3e635'], tag: 'Creative', preview: '🎨', category: 'service', sections: [COMMON_SECTIONS.hero, { id: 'portfolio', name: 'Portfolio Highlight', fields: [{ id: 'images', label: 'Highlight Images', type: 'gallery' }] }] },
    { id: 'landing-minimal', name: 'Minimal Landing', desc: 'Clean, one-page lead generation site without products.', colors: ['#0f172a', '#ffffff', '#e2e8f0'], tag: 'Simple', preview: '📄', category: 'service', sections: [COMMON_SECTIONS.hero, COMMON_SECTIONS.about] },
];

export function getTemplateById(id: string): TemplateDef | undefined {
    return TEMPLATES.find(t => t.id === id);
}
