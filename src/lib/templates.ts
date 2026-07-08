export type TemplateCategory = 'general' | 'gym' | 'hotel' | 'ecommerce';
export type TemplateSubcategory = 'clothing' | 'electronics' | 'grocery' | 'none';

export interface TemplateDef {
    id: string;
    name: string;
    desc: string;
    colors: string[];
    tag?: string;
    preview: string;
    category: TemplateCategory;
    subcategory?: TemplateSubcategory;
}

export const TEMPLATE_CATEGORIES = [
    { id: 'general', name: 'General Retail' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'gym', name: 'Gym & Fitness' },
    { id: 'hotel', name: 'Hotels & Hospitality' },
];

export const ECOMMERCE_SUBCATEGORIES = [
    { id: 'clothing', name: 'Clothing & Apparel' },
    { id: 'electronics', name: 'Electronics & Gadgets' },
    { id: 'grocery', name: 'Grocery & Food' },
];

export const TEMPLATES: TemplateDef[] = [
    // General Retail
    { id: 'minimal', name: 'Minimal Artisan', desc: 'Clean, elegant design with generous whitespace. Perfect for artisans, boutiques, and premium products.', colors: ['#fafaf9', '#1c1917', '#f97316'], tag: 'Popular', preview: '🤍', category: 'general' },
    { id: 'bold', name: 'Bold Visual Brand', desc: 'High-impact visuals with bold typography. Ideal for fashion, food, and lifestyle brands.', colors: ['#1c1917', '#f97316', '#fbbf24'], tag: 'Trending', preview: '🔥', category: 'general' },
    { id: 'catalog', name: 'Mobile Catalog', desc: 'Grid-first product display optimized for mobile browsing and WhatsApp sharing.', colors: ['#f0fdf4', '#166534', '#22c55e'], tag: 'Mobile First', preview: '📱', category: 'general' },
    { id: 'futuristic', name: 'Sci-Fi Cyber', desc: 'Neon and glowing tech aesthetic. Perfect for electronics, gaming, and modern gadgets.', colors: ['#000000', '#06b6d4', '#0891b2'], tag: 'Dark Mode', preview: '🚀', category: 'general' },
    { id: 'elegant', name: 'Luxury Class', desc: 'Serif fonts, smooth fade-ins, and elegant spacing. Ideal for luxury goods and boutiques.', colors: ['#fdfbf7', '#2c2a29', '#d4af37'], tag: 'Premium', preview: '✨', category: 'general' },
    { id: 'playful', name: 'Fun Brutalist', desc: 'Vibrant colors, thick borders, and playful animations. Great for toys, art, and creative brands.', colors: ['#fff4e6', '#ff6b6b', '#4ecdc4'], tag: 'Creative', preview: '🎨', category: 'general' },

    // Gym & Fitness
    { id: 'gym-power', name: 'Power Gym', desc: 'High contrast, dark mode, red accents, bold typography. Focused on memberships and classes.', colors: ['#111827', '#dc2626', '#fca5a5'], tag: 'Hardcore', preview: '🏋️', category: 'gym' },
    { id: 'gym-zen', name: 'Zen Yoga', desc: 'Calming greens, rounded corners, soft shadows. Focused on yoga and wellness.', colors: ['#f0fdf4', '#15803d', '#86efac'], tag: 'Wellness', preview: '🧘', category: 'gym' },
    { id: 'gym-modern', name: 'Modern Fitness', desc: 'Professional, yellow/black aesthetic, standard clean fitness design.', colors: ['#27272a', '#eab308', '#fef08a'], tag: 'Pro', preview: '🏆', category: 'gym' },

    // Hotels & Hospitality
    { id: 'hotel-luxury', name: 'Luxury Hotel', desc: 'Serif fonts, gold/dark elegance, emphasis on imagery and large hero sections.', colors: ['#1c1917', '#d4af37', '#fef3c7'], tag: 'Premium', preview: '🏨', category: 'hotel' },
    { id: 'hotel-resort', name: 'Tropical Resort', desc: 'Bright, airy, ocean blues, tropical aesthetic.', colors: ['#f0f9ff', '#0284c7', '#7dd3fc'], tag: 'Vacation', preview: '🌴', category: 'hotel' },
    { id: 'hotel-boutique', name: 'Boutique Inn', desc: 'Earth tones, cozy vibes, masonry layout for rooms.', colors: ['#fefce8', '#713f12', '#d97706'], tag: 'Cozy', preview: '🛎️', category: 'hotel' },

    // E-Commerce
    { id: 'ecommerce-clothing-chic', name: 'Chic Lookbook', desc: 'Lookbook style, large edge-to-edge images, minimalist UI.', colors: ['#ffffff', '#000000', '#d1d5db'], tag: 'Fashion', preview: '👗', category: 'ecommerce', subcategory: 'clothing' },
    { id: 'ecommerce-clothing-street', name: 'Streetwear Drop', desc: 'Brutalist or bold, ticker tapes, scrolling text, high energy.', colors: ['#000000', '#fbbf24', '#f87171'], tag: 'Hype', preview: '🛹', category: 'ecommerce', subcategory: 'clothing' },
    { id: 'ecommerce-tech-gadget', name: 'Clean Tech', desc: 'Apple-esque clean white/grey layout, specs focus.', colors: ['#f8fafc', '#334155', '#94a3b8'], tag: 'Modern', preview: '💻', category: 'ecommerce', subcategory: 'electronics' },
    { id: 'ecommerce-tech-cyber', name: 'Gamer Edge', desc: 'Glowing borders, dark mode, gaming-focused.', colors: ['#09090b', '#8b5cf6', '#a78bfa'], tag: 'Gaming', preview: '🎮', category: 'ecommerce', subcategory: 'electronics' },
    { id: 'ecommerce-food-fresh', name: 'Fresh Market', desc: 'Green/orange colors, rounded shapes, grid focus for produce.', colors: ['#fdf8f6', '#ea580c', '#fdba74'], tag: 'Organic', preview: '🥗', category: 'ecommerce', subcategory: 'grocery' },
    { id: 'ecommerce-food-menu', name: 'Digital Menu', desc: 'List-based like a restaurant menu or catalog.', colors: ['#fff1f2', '#e11d48', '#fb7185'], tag: 'Menu', preview: '🍔', category: 'ecommerce', subcategory: 'grocery' },
];

export function getTemplateById(id: string): TemplateDef | undefined {
    return TEMPLATES.find(t => t.id === id);
}
