export * from './templateSchema';
import { TemplateDef } from './templateSchema';

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates' },
  { id: 'ecommerce', name: 'E-Commerce' },
  { id: 'services', name: 'Services & Bookings' },
  { id: 'portfolio', name: 'Portfolios' },
  { id: 'landing', name: 'Landing Pages' },
];
export type TemplateCategory = 'all' | 'ecommerce' | 'services' | 'portfolio' | 'landing';

export const ECOMMERCE_SUBCATEGORIES = [
  { id: 'clothing', name: 'Clothing & Fashion' },
  { id: 'food', name: 'Food & Restaurants' },
  { id: 'tech', name: 'Tech & Gadgets' },
  { id: 'general', name: 'General Store' },
];
export type TemplateSubcategory = 'all' | 'clothing' | 'food' | 'tech' | 'general';

export const TEMPLATES: TemplateDef[] = [
  {
    id: 'premium-restaurant-v2',
    version: 2,
    name: 'The Grand Restaurant',
    desc: 'A luxury, multi-page layout designed specifically for high-end dining, cafes, and premium food services.',
    category: 'Food',
    colors: ['#0f172a', '#eab308', '#ffffff'],
    preview: '/templates/restaurant-v2.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Main Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a luxurious headline for a fine dining restaurant.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a short poetic tagline about the dining experience.' },
              { id: 'backgroundImage', label: 'Background Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Reserve a Table' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'About Us',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Story' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Write a short, engaging story about a restaurant\'s origins and passion for food.' },
              { id: 'image', label: 'Side Image', type: 'image' }
            ]
          },
          {
            id: 'featuredMenu',
            type: 'FeaturedMenuSection',
            name: 'Featured Menu',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Chef\'s Specials' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Write a short enticing description for a featured menu section.' },
              { id: 'showProducts', label: 'Show Products Automatically', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      },
      {
        id: 'page-menu',
        name: 'Full Menu',
        path: '/menu',
        sections: [
          {
            id: 'menuHeader',
            type: 'SimpleHeaderSection',
            name: 'Menu Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Menu' },
              { id: 'subtitle', label: 'Subtitle', type: 'text', aiPrompt: 'Write a short subtitle for a restaurant menu page.' }
            ]
          },
          {
            id: 'menuGrid',
            type: 'ProductGridSection',
            name: 'Menu Items',
            fields: [
              { id: 'layout', label: 'Grid Layout', type: 'select', options: [{label: 'List', value: 'list'}, {label: 'Grid', value: 'grid'}], defaultValue: 'list' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-gym-v2',
    version: 2,
    name: 'Iron Forge Gym',
    desc: 'Aggressive, high-energy layout perfect for fitness centers, CrossFit boxes, and personal trainers.',
    category: 'Services',
    colors: ['#000000', '#dc2626', '#171717'],
    preview: '/templates/gym-v2.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'videoHero',
            type: 'VideoHeroSection',
            name: 'Video Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a highly motivational, aggressive headline for a hardcore gym.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a short tagline about pushing limits.' },
              { id: 'backgroundVideo', label: 'Background Video/Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Join Now' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Gym Features',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Why Choose Us' },
              { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Elite Equipment' },
              { id: 'card1Desc', label: 'Card 1 Desc', type: 'textarea', aiPrompt: 'Write a short description about having the best gym equipment.' },
              { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Expert Trainers' },
              { id: 'card2Desc', label: 'Card 2 Desc', type: 'textarea', aiPrompt: 'Write a short description about professional personal trainers.' },
              { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: '24/7 Access' },
              { id: 'card3Desc', label: 'Card 3 Desc', type: 'textarea', aiPrompt: 'Write a short description about being open 24/7.' },
            ]
          },
          {
            id: 'motivationText',
            type: 'TextSection',
            name: 'Motivation Quote',
            fields: [
              { id: 'text', label: 'Quote', type: 'textarea', aiPrompt: 'Write a short, powerful motivational quote about fitness.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-ecommerce-v2',
    version: 2,
    name: 'The Modern Store',
    desc: 'A high-conversion layout with split heroes, carousels, and minimal aesthetic for serious brands.',
    category: 'Retail',
    colors: ['#18181b', '#3b82f6', '#f8fafc'],
    preview: '/templates/ecommerce-v2.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'splitHero',
            type: 'SplitHeroSection',
            name: 'Split Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a catchy headline for a modern retail store.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a short, trendy tagline.' },
              { id: 'productImage', label: 'Hero Product Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Shop Collection' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Store Benefits',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Free Shipping' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Write a short phrase about free shipping.' },
              { id: 'b2Title', label: 'Benefit 2 Title', type: 'text', defaultValue: 'Secure Payments' },
              { id: 'b2Desc', label: 'Benefit 2 Desc', type: 'text', aiPrompt: 'Write a short phrase about safe payments.' },
              { id: 'b3Title', label: 'Benefit 3 Title', type: 'text', defaultValue: 'Easy Returns' },
              { id: 'b3Desc', label: 'Benefit 3 Desc', type: 'text', aiPrompt: 'Write a short phrase about a 30 day return policy.' },
            ]
          },
          {
            id: 'trendingProducts',
            type: 'ProductCarouselSection',
            name: 'Trending Carousel',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Trending Now' },
              { id: 'showProducts', label: 'Show Products Automatically', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-dental-v2',
    version: 2,
    name: 'Smile Perfect Dental',
    desc: 'Clean, trustworthy layout for dental clinics and medical professionals.',
    category: 'Medical',
    colors: ['#0ea5e9', '#0284c7', '#ffffff'],
    preview: '/templates/dental.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Main Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a welcoming headline for a modern dental clinic.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a reassuring tagline about pain-free dentistry.' },
              { id: 'backgroundImage', label: 'Background Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Book Appointment' }
            ]
          },
          {
            id: 'services',
            type: 'CardsSection',
            name: 'Our Services',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Comprehensive Care' },
              { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'General Dentistry' },
              { id: 'card1Desc', label: 'Card 1 Desc', type: 'textarea', aiPrompt: 'Short description of general dentistry.' },
              { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Cosmetic' },
              { id: 'card2Desc', label: 'Card 2 Desc', type: 'textarea', aiPrompt: 'Short description of teeth whitening and cosmetic.' },
              { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Orthodontics' },
              { id: 'card3Desc', label: 'Card 3 Desc', type: 'textarea', aiPrompt: 'Short description of braces and clear aligners.' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-law-v2',
    version: 2,
    name: 'The Law Firm',
    desc: 'Professional, authoritative layout for lawyers and legal consultants.',
    category: 'Services',
    colors: ['#1e293b', '#c2410c', '#f8fafc'],
    preview: '/templates/law.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Hero Section',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a strong, authoritative headline for a top-tier law firm.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a tagline about fighting for justice.' },
              { id: 'productImage', label: 'Professional Portrait', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Free Consultation' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Firm Overview',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Experienced & Relentless' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Write a professional overview of a law firm with decades of experience.' },
              { id: 'image', label: 'Office Image', type: 'image' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-agency-v2',
    version: 2,
    name: 'Creative Studio',
    desc: 'Vibrant and modern layout for creative agencies and portfolios.',
    category: 'Services',
    colors: ['#d946ef', '#8b5cf6', '#000000'],
    preview: '/templates/agency.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'VideoHeroSection',
            name: 'Main Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a bold, abstract headline for a creative design agency.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a tagline about bringing ideas to life.' },
              { id: 'backgroundVideo', label: 'Showreel / Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'View Our Work' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-photography-v2',
    version: 2,
    name: 'Lens & Light',
    desc: 'Image-focused layout for photographers and videographers.',
    category: 'Services',
    colors: ['#171717', '#a3a3a3', '#fafafa'],
    preview: '/templates/photo.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Portfolio Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a poetic headline for a wedding and portrait photographer.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a tagline about capturing moments forever.' },
              { id: 'backgroundImage', label: 'Best Photo', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Book a Session' }
            ]
          },
          {
            id: 'featuredMenu',
            type: 'FeaturedMenuSection',
            name: 'Recent Shoots (Gallery)',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Selected Works' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Short intro to a photography portfolio.' },
              { id: 'showProducts', label: 'Show Gallery Images (as products)', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-boutique-v2',
    version: 2,
    name: 'Chic Boutique',
    desc: 'Elegant e-commerce layout for fashion and apparel.',
    category: 'Retail',
    colors: ['#fdf2f8', '#be185d', '#ffffff'],
    preview: '/templates/boutique.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Collection Launch',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a new spring/summer fashion collection.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about elegant and sustainable fashion.' },
              { id: 'productImage', label: 'Model Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-bakery-v2',
    version: 2,
    name: 'Sweet Treats Bakery',
    desc: 'Warm and inviting layout for bakeries and dessert shops.',
    category: 'Food',
    colors: ['#fff7ed', '#c2410c', '#ffffff'],
    preview: '/templates/bakery.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Welcome Header',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for an artisanal bakery.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about fresh, daily baked goods.' },
              { id: 'backgroundImage', label: 'Bakery Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Order Online' }
            ]
          },
          {
            id: 'trendingProducts',
            type: 'ProductCarouselSection',
            name: 'Best Sellers',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Fresh Out The Oven' },
              { id: 'showProducts', label: 'Show Items', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-salon-v2',
    version: 2,
    name: 'Luxe Salon & Spa',
    desc: 'Relaxing layout for hair salons, nail bars, and spas.',
    category: 'Services',
    colors: ['#fdf4ff', '#a21caf', '#ffffff'],
    preview: '/templates/salon.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Welcome',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a luxury beauty salon.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about pampering and self-care.' },
              { id: 'productImage', label: 'Salon Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Book Appointment' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-interior-v2',
    version: 2,
    name: 'Modern Interiors',
    desc: 'Sophisticated layout for interior designers and architects.',
    category: 'Services',
    colors: ['#f3f4f6', '#374151', '#ffffff'],
    preview: '/templates/interior.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Showcase',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for an interior design studio focusing on minimalist homes.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about transforming spaces.' },
              { id: 'backgroundImage', label: 'Room Photo', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'View Projects' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-realestate-v2',
    version: 2,
    name: 'Prime Real Estate',
    desc: 'Trust-building layout for realtors and property agencies.',
    category: 'Services',
    colors: ['#0f172a', '#3b82f6', '#ffffff'],
    preview: '/templates/realestate.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Property Search',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a real estate agency finding dream homes.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about unlocking the door to your future.' },
              { id: 'backgroundImage', label: 'House Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'View Listings' }
            ]
          },
          {
            id: 'featuredMenu',
            type: 'FeaturedMenuSection',
            name: 'Featured Properties',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Exclusive Listings' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Short text about handpicked luxury properties.' },
              { id: 'showProducts', label: 'Show Properties', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-furniture-v2',
    version: 2,
    name: 'Nordic Furniture',
    desc: 'Minimalist e-commerce for furniture and home decor.',
    category: 'Retail',
    colors: ['#fafaf9', '#78716c', '#ffffff'],
    preview: '/templates/furniture.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'splitHero',
            type: 'SplitHeroSection',
            name: 'Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a minimalist scandinavian furniture store.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about crafted comfort.' },
              { id: 'productImage', label: 'Sofa Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Shop Collection' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-coach-v2',
    version: 2,
    name: 'Elite Coaching',
    desc: 'Personal brand layout for fitness coaches, consultants, and speakers.',
    category: 'Services',
    colors: ['#000000', '#facc15', '#ffffff'],
    preview: '/templates/coach.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Personal Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a high-performance life and business coach.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about unlocking full potential.' },
              { id: 'productImage', label: 'Portrait', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Start Coaching' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'premium-mehndi-v2',
    version: 2,
    name: 'Bridal Henna',
    desc: 'Cultural, artistic layout for Mehndi artists and event services.',
    category: 'Services',
    colors: ['#fff1f2', '#e11d48', '#ffffff'],
    preview: '/templates/mehndi.webp',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Welcome',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Headline for a professional bridal mehndi artist.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Tagline about intricate designs and organic henna.' },
              { id: 'backgroundImage', label: 'Mehndi Image', type: 'image' },
              { id: 'primaryCta', label: 'Button Text', type: 'text', defaultValue: 'Book Dates' }
            ]
          },
          {
            id: 'trendingProducts',
            type: 'ProductCarouselSection',
            name: 'Design Packages',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Bridal Packages' },
              { id: 'showProducts', label: 'Show Packages', type: 'boolean', defaultValue: true }
            ]
          }
        ]
      }
    ]
  }
];

export function getTemplateById(id: string): TemplateDef | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
