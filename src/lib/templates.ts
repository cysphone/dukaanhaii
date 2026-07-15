export * from './templateSchema';
import { TemplateDef } from './templateSchema';

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates' },
  { id: 'Retail', name: 'Retail & E-commerce' },
  { id: 'Services', name: 'Services & Bookings' },
  { id: 'Food', name: 'Food & Restaurants' },
  { id: 'Medical', name: 'Medical & Health' },
];
export type TemplateCategory = 'all' | 'Retail' | 'Services' | 'Food' | 'Medical';

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
    preview: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
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
      },
      {
        id: 'page-about',
        name: 'About',
        path: '/about',
        sections: [
          {
            id: 'about',
            type: 'AboutSection',
            name: 'About Section',
            fields: [
              { id: 'title', label: 'Title', type: 'text', aiPrompt: 'Write an inspiring title about the restaurant history' },
              { id: 'description', label: 'Story', type: 'textarea', aiPrompt: 'Write a warm, inviting story about the restaurant origin' },
              { id: 'image', label: 'Restaurant Photo', type: 'image' }
            ]
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact',
            type: 'TextSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', aiPrompt: 'Write a title like Visit Us or Get in Touch' },
              { id: 'content', label: 'Details', type: 'textarea', aiPrompt: 'Write the address, hours, and phone number elegantly' }
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
    preview: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
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
      },
      {
        id: 'page-programs',
        name: 'Programs',
        path: '/programs',
        sections: [
          {
            id: 'programs',
            type: 'CardsSection',
            name: 'Programs List',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Training Programs' },
              { id: 'card1Title', label: 'Program 1', type: 'text', defaultValue: 'Strength Training' },
              { id: 'card1Desc', label: 'Desc 1', type: 'textarea', aiPrompt: 'Description for strength training.' },
              { id: 'card2Title', label: 'Program 2', type: 'text', defaultValue: 'HIIT' },
              { id: 'card2Desc', label: 'Desc 2', type: 'textarea', aiPrompt: 'Description for high intensity interval training.' },
              { id: 'card3Title', label: 'Program 3', type: 'text', defaultValue: 'Personal Training' },
              { id: 'card3Desc', label: 'Desc 3', type: 'textarea', aiPrompt: 'Description for 1 on 1 coaching.' },
            ]
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact',
            type: 'TextSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Find Us' },
              { id: 'content', label: 'Details', type: 'textarea', aiPrompt: 'Gym location, hours, and contact details in an aggressive tone.' }
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
    preview: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
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
      },
      {
        id: 'page-shop',
        name: 'Shop All',
        path: '/shop',
        sections: [
          {
            id: 'shopHeader',
            type: 'SimpleHeaderSection',
            name: 'Shop Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'All Products' },
              { id: 'subtitle', label: 'Subtitle', type: 'text', aiPrompt: 'Write a short subtitle for a retail shop page.' }
            ]
          },
          {
            id: 'productGrid',
            type: 'ProductGridSection',
            name: 'Product Grid',
            fields: [
              { id: 'layout', label: 'Grid Layout', type: 'select', options: [{label: 'Grid', value: 'grid'}, {label: 'List', value: 'list'}], defaultValue: 'grid' }
            ]
          }
        ]
      },
      {
        id: 'page-about',
        name: 'About',
        path: '/about',
        sections: [
          {
            id: 'about',
            type: 'AboutSection',
            name: 'About Section',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Story' },
              { id: 'description', label: 'Description', type: 'textarea', aiPrompt: 'Write an inspiring story about a modern retail brand.' },
              { id: 'image', label: 'Brand Image', type: 'image' }
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
    preview: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
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
      },
      {
        id: 'page-services',
        name: 'Services',
        path: '/services',
        sections: [
          {
            id: 'servicesList',
            type: 'CardsSection',
            name: 'Services List',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Treatments' },
              { id: 'card1Title', label: 'Service 1', type: 'text', defaultValue: 'Teeth Whitening' },
              { id: 'card1Desc', label: 'Desc 1', type: 'textarea', aiPrompt: 'Professional whitening services.' },
              { id: 'card2Title', label: 'Service 2', type: 'text', defaultValue: 'Implants' },
              { id: 'card2Desc', label: 'Desc 2', type: 'textarea', aiPrompt: 'Permanent tooth replacement.' },
              { id: 'card3Title', label: 'Service 3', type: 'text', defaultValue: 'Checkups' },
              { id: 'card3Desc', label: 'Desc 3', type: 'textarea', aiPrompt: 'Routine dental exams.' },
            ]
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact',
            type: 'TextSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Book an Appointment' },
              { id: 'content', label: 'Details', type: 'textarea', aiPrompt: 'Clinic address and booking instructions.' }
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
    preview: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
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
      },
      {
        id: 'page-practice-areas',
        name: 'Practice Areas',
        path: '/practice-areas',
        sections: [
          {
            id: 'practices',
            type: 'CardsSection',
            name: 'Practice Areas',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Areas of Practice' },
              { id: 'card1Title', label: 'Area 1', type: 'text', defaultValue: 'Corporate Law' },
              { id: 'card1Desc', label: 'Desc 1', type: 'textarea', aiPrompt: 'Description of corporate law.' },
              { id: 'card2Title', label: 'Area 2', type: 'text', defaultValue: 'Real Estate' },
              { id: 'card2Desc', label: 'Desc 2', type: 'textarea', aiPrompt: 'Description of real estate law.' },
              { id: 'card3Title', label: 'Area 3', type: 'text', defaultValue: 'Family Law' },
              { id: 'card3Desc', label: 'Desc 3', type: 'textarea', aiPrompt: 'Description of family law.' },
            ]
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact',
            type: 'TextSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Request a Consultation' },
              { id: 'content', label: 'Details', type: 'textarea', aiPrompt: 'Law firm office address and contact details.' }
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
    preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
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
    preview: 'https://images.unsplash.com/photo-1583089892943-e02e52f17b50?q=80&w=800&auto=format&fit=crop',
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
