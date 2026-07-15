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
  // 1. Premium Restaurant (Food, Multipage)
  {
    id: 'premium-restaurant-v2',
    version: 2,
    name: 'The Grand Table',
    desc: 'An ultra-luxury, high-end fine dining template with subtle animations, serif headings, and dark accents.',
    category: 'Food',
    colors: ['#0f172a', '#ca8a04', '#ffffff'],
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
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Why Dine With Us',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Award Winning Chefs' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Short description of world-class chef credentials.' },
              { id: 'b2Title', label: 'Benefit 2 Title', type: 'text', defaultValue: 'Fresh Ingredients' },
              { id: 'b2Desc', label: 'Benefit 2 Desc', type: 'text', aiPrompt: 'Short description of organic locally-sourced ingredients.' },
              { id: 'b3Title', label: 'Benefit 3 Title', type: 'text', defaultValue: 'Luxurious Ambiance' },
              { id: 'b3Desc', label: 'Benefit 3 Desc', type: 'text', aiPrompt: 'Short description of sophisticated table settings and ambiance.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Culinary Philosophy',
            fields: [
              { id: 'title', label: 'Philosophy Title', type: 'text', defaultValue: 'Crafted with Passion' },
              { id: 'description', label: 'Detailed Philosophy', type: 'textarea', aiPrompt: 'Write a compelling narrative about our commitment to gourmet cuisine.' },
              { id: 'image', label: 'Kitchen Action Image', type: 'image' }
            ]
          },
          {
            id: 'featuredMenu',
            type: 'FeaturedMenuSection',
            name: 'Featured Masterpieces',
            fields: [
              { id: 'title', label: 'Featured Title', type: 'text', defaultValue: 'Signature Specialties' },
              { id: 'description', label: 'Featured Subtitle', type: 'textarea', aiPrompt: 'Write a short enticing description highlighting chef specials.' },
              { id: 'showProducts', label: 'Auto-Display Products', type: 'boolean', defaultValue: true }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Guest Accolades',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'What Our Critics Say' },
              { id: 'client1Name', label: 'Critic 1 Name', type: 'text', defaultValue: 'Michelin Guide' },
              { id: 'client1Quote', label: 'Critic 1 Review', type: 'textarea', aiPrompt: 'Write a simulated Michelin guide short snippet.' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Frequent Inquiries',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Common Inquiries' },
              { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'Do you require formal dress code?' },
              { id: 'a1', label: 'Answer 1', type: 'textarea', aiPrompt: 'Explain dress code policy.' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Find & Reach Us',
            fields: [
              { id: 'title', label: 'Section Heading', type: 'text', defaultValue: 'Reserve Your Experience' }
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
            name: 'Menu Page Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Complete Menu' },
              { id: 'subtitle', label: 'Subtitle', type: 'text', aiPrompt: 'Write a warm culinary invitation tagline.' }
            ]
          },
          {
            id: 'menuGrid',
            type: 'ProductGridSection',
            name: 'All Plates',
            fields: [
              { id: 'layout', label: 'Grid Layout', type: 'select', options: [{label: 'Grid List', value: 'grid'}, {label: 'Clean List', value: 'list'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 2. Premium Cafe (Food, Single Page)
  {
    id: 'premium-cafe-v2',
    version: 2,
    name: 'Brew & Co',
    desc: 'Cozy, organic single-page coffee shop & bakery layout featuring rich warm woods, soft creams, and modern card blocks.',
    category: 'Food',
    colors: ['#78350f', '#d97706', '#fef3c7'],
    preview: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Roastery Hero',
            fields: [
              { id: 'headline', label: 'Main Headline', type: 'text', required: true, aiPrompt: 'Write a headline about freshly roasted artisanal coffee.' },
              { id: 'tagline', label: 'Sub-tagline', type: 'text', aiPrompt: 'Write a cozy sub-tagline about start-of-day brew.' },
              { id: 'backgroundImage', label: 'Hero Coffee Image', type: 'image' },
              { id: 'primaryCta', label: 'CTA Text', type: 'text', defaultValue: 'Explore Brews' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Our Brew Philosophy',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Single-Origin Beans' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Short description about bean sourcing.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Story',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Roasting Since 2018' },
              { id: 'description', label: 'Story', type: 'textarea', aiPrompt: 'Write a short cozy story about the founders of a neighborhood cafe.' }
            ]
          },
          {
            id: 'menuGrid',
            type: 'ProductGridSection',
            name: 'Daily Menu',
            fields: [
              { id: 'layout', label: 'Menu Layout', type: 'select', options: [{label: 'Grid List', value: 'grid'}, {label: 'Clean List', value: 'list'}], defaultValue: 'list' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Happy Caffiends',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Our Locals Love Us' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Location & Hours',
            fields: [
              { id: 'title', label: 'Section Heading', type: 'text', defaultValue: 'Visit Our Roastery' }
            ]
          }
        ]
      }
    ]
  },

  // 3. Premium Bakery (Food, Multipage)
  {
    id: 'premium-bakery-v2',
    version: 2,
    name: 'Sweet Crust Bakery',
    desc: 'Charming bakery, pastry, and dessert shop layout featuring warm HSL pastel accents, elegant card designs, and detailed catalog options.',
    category: 'Food',
    colors: ['#ca8a04', '#db2777', '#fffbeb'],
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
            name: 'Oven Fresh Hero',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write a warm bakery welcome headline.' },
              { id: 'tagline', label: 'Hero Subtitle', type: 'text', aiPrompt: 'Write a tagline about warm croissants and sourdough.' },
              { id: 'backgroundImage', label: 'Hero Image', type: 'image' },
              { id: 'primaryCta', label: 'Cta Text', type: 'text', defaultValue: 'Browse Pastries' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Bakery Categories',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Our Fresh Offerings' },
              { id: 'card1Title', label: 'Cat 1 Title', type: 'text', defaultValue: 'Artisan Bread' },
              { id: 'card1Desc', label: 'Cat 1 Desc', type: 'textarea', aiPrompt: 'Short description of natural sourdough bread.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'The Head Baker',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Handcrafted With Love' },
              { id: 'description', label: 'Detailed Description', type: 'textarea', aiPrompt: 'Write about the pastry chef baking heritage.' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Best Selling Pastries',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Best Sellers' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Local Praises',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Beloved by Sweet Tooths' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Get Fresh Bakes',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Order Custom Cakes' }
            ]
          }
        ]
      },
      {
        id: 'page-shop',
        name: 'Pastry Shop',
        path: '/shop',
        sections: [
          {
            id: 'shopHeader',
            type: 'SimpleHeaderSection',
            name: 'Shop Page Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'All Pastries & Bakes' }
            ]
          },
          {
            id: 'productGrid',
            type: 'ProductGridSection',
            name: 'Grid Display',
            fields: [
              { id: 'layout', label: 'Display Grid', type: 'select', options: [{label: 'Grid', value: 'grid'}, {label: 'List', value: 'list'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 4. Premium Dental (Medical, Multipage)
  {
    id: 'premium-dental-v2',
    version: 2,
    name: 'Smile Perfect Clinic',
    desc: 'Clean, clinical, and high-trust medical template for family dentists, orthotics, and premium medical labs.',
    category: 'Medical',
    colors: ['#0369a1', '#0ea5e9', '#f0f9ff'],
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
            name: 'Clinic Hero',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write a reassuring dental clinic headline.' },
              { id: 'tagline', label: 'Hero Tagline', type: 'text', aiPrompt: 'Write a tagline about painless modern dentistry.' },
              { id: 'backgroundImage', label: 'Hero Image', type: 'image' },
              { id: 'primaryCta', label: 'Cta Text', type: 'text', defaultValue: 'Book Appointment' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Why Choose Us',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Advanced Technology' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Explain 3D digital imaging technology.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Meet the Doctors',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Expert Dental Care' },
              { id: 'description', label: 'Bio Details', type: 'textarea', aiPrompt: 'Write a trustworthy introduction of head dentist.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Treatments offered',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Our Treatments' },
              { id: 'card1Title', label: 'Treatment 1', type: 'text', defaultValue: 'Cosmetic Veneers' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Patient Stories',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Real Smile Makeovers' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Dental FAQs',
            fields: [
              { id: 'title', label: 'FAQ Title', type: 'text', defaultValue: 'Common Dental FAQs' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Visit Us',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Schedule a Free Consultation' }
            ]
          }
        ]
      },
      {
        id: 'page-services',
        name: 'Treatments',
        path: '/services',
        sections: [
          {
            id: 'header',
            type: 'SimpleHeaderSection',
            name: 'Treatments Header',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Advanced Dental Treatments' }
            ]
          },
          {
            id: 'grid',
            type: 'ProductGridSection',
            name: 'Dental Procedures',
            fields: [
              { id: 'layout', label: 'Procedure Layout', type: 'select', options: [{label: 'Grid List', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 5. Premium Pharmacy (Medical, Single Page)
  {
    id: 'premium-pharmacy-v2',
    version: 2,
    name: 'Wellness Pharmacy',
    desc: 'A robust, trustworthy single-page medical store and pharmacy template highlighting wellness items, prescription uploads, and local services.',
    category: 'Medical',
    colors: ['#0f766e', '#13b8a6', '#f0fdfa'],
    preview: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Pharmacy Hero',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write an authoritative trust-based wellness pharmacy headline.' },
              { id: 'tagline', label: 'Hero Subtitle', type: 'text', aiPrompt: 'Write a tagline about prompt prescription delivery and medicines.' },
              { id: 'backgroundImage', label: 'Pharmacy Photo', type: 'image' },
              { id: 'primaryCta', label: 'CTA', type: 'text', defaultValue: 'Upload Prescription' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Healthcare Delivery',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Express Shipping' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Short description of same-day delivery.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Pharmacist Team',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Your Family Wellness Partner' },
              { id: 'description', label: 'Story Details', type: 'textarea', aiPrompt: 'Write about the values of a localized, caring pharmacist.' }
            ]
          },
          {
            id: 'catalog',
            type: 'ProductGridSection',
            name: 'Wellness Products',
            fields: [
              { id: 'layout', label: 'Catalog Grid', type: 'select', options: [{label: 'Regular Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Ordering FAQ',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Ordering Questions' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Contact & Prescription Pickup',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Prescription & Support Desk' }
            ]
          }
        ]
      }
    ]
  },

  // 6. Premium Gym (Services, Multipage)
  {
    id: 'premium-gym-v2',
    version: 2,
    name: 'Iron Forge Gym',
    desc: 'High-energy, aggressive athletic template designed for strength training facilities, boxing gyms, and CrossFit boxes.',
    category: 'Services',
    colors: ['#1c1917', '#e11d48', '#1c1917'],
    preview: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'VideoHeroSection',
            name: 'Intense Hero Banner',
            fields: [
              { id: 'headline', label: 'Main Headline', type: 'text', required: true, aiPrompt: 'Write a highly aggressive, motivational fitness headline.' },
              { id: 'tagline', label: 'Tagline/Quote', type: 'text', aiPrompt: 'Write a short badass quote about overcoming weakness.' },
              { id: 'backgroundVideo', label: 'Hero Background Media', type: 'image' },
              { id: 'primaryCta', label: 'CTA', type: 'text', defaultValue: 'Get Trial Pass' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'No Excuses Philosophy',
            fields: [
              { id: 'title', label: 'Philosophy Title', type: 'text', defaultValue: 'Iron Mind, Iron Body' },
              { id: 'description', label: 'Philosophy Details', type: 'textarea', aiPrompt: 'Write an intense description of the gym training environment and principles.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Gym Facilities',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Top-Tier Equipment' },
              { id: 'card1Title', label: 'Facility 1', type: 'text', defaultValue: 'Free Weights Dungeon' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Supplements Store',
            fields: [
              { id: 'title', label: 'Store Title', type: 'text', defaultValue: 'Official Supplements' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Transformations',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Real Transformation Stories' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Gym FAQs',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Membership FAQ' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Visit Our Dungeon',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Find Your Nearest Dungeon' }
            ]
          }
        ]
      },
      {
        id: 'page-programs',
        name: 'Training Programs',
        path: '/programs',
        sections: [
          {
            id: 'header',
            type: 'SimpleHeaderSection',
            name: 'Programs Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Official Gym Programs' }
            ]
          },
          {
            id: 'programsList',
            type: 'ProductGridSection',
            name: 'Training Grid',
            fields: [
              { id: 'layout', label: 'Grid Layout', type: 'select', options: [{label: 'Regular Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 7. Premium Barber & Salon (Services, Single Page)
  {
    id: 'premium-salon-v2',
    version: 2,
    name: 'Sartorial Barber',
    desc: 'Classy, vintage single-page layout for high-end barbershops, luxury hair salons, and grooming lounges.',
    category: 'Services',
    colors: ['#1e1b4b', '#f59e0b', '#fafaf9'],
    preview: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Dapper Hero Banner',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a sophisticated grooming headline for a high-end barbershop.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a dapper tagline about precision cuts and hot shaves.' },
              { id: 'backgroundImage', label: 'Hero Image', type: 'image' },
              { id: 'primaryCta', label: 'CTA Text', type: 'text', defaultValue: 'Book Grooming Session' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Craftsmanship Story',
            fields: [
              { id: 'title', label: 'Craft Title', type: 'text', defaultValue: 'The Art of Grooming' },
              { id: 'description', label: 'Detailed Crafts Story', type: 'textarea', aiPrompt: 'Write a warm history about traditional barbering craftsmanship and master barbers.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Our Grooming Services',
            fields: [
              { id: 'title', label: 'Services Title', type: 'text', defaultValue: 'Premium Cuts & Grooming' },
              { id: 'card1Title', label: 'Service 1 Title', type: 'text', defaultValue: 'Traditional Hot Shave' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Dapper Reviews',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Satisfied Gents' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Salon FAQ',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Booking Guidelines' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Find The Parlor',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Locate The Parlor' }
            ]
          }
        ]
      }
    ]
  },

  // 8. Premium Wellness Spa (Services, Multipage)
  {
    id: 'premium-spa-v2',
    version: 2,
    name: 'Zenith Wellness Spa',
    desc: 'Soothing, botanical multipage spa & aromatherapy template utilizing calm mint and gold tones, minimal typography, and wide image blocks.',
    category: 'Services',
    colors: ['#065f46', '#d97706', '#f0fdf4'],
    preview: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Tranquility Hero',
            fields: [
              { id: 'headline', label: 'Main Headline', type: 'text', required: true, aiPrompt: 'Write a calm, meditative headline for a luxury massage and spa center.' },
              { id: 'tagline', label: 'Subtle Tagline', type: 'text', aiPrompt: 'Write a soothing tagline about restoring mind and body balance.' },
              { id: 'backgroundImage', label: 'Relaxation Photo', type: 'image' },
              { id: 'primaryCta', label: 'CTA Button', type: 'text', defaultValue: 'Reserve Massage' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Spa Healing Pillars',
            fields: [
              { id: 'b1Title', label: 'Pillar 1 Title', type: 'text', defaultValue: 'Organic Oils Only' },
              { id: 'b1Desc', label: 'Pillar 1 Desc', type: 'text', aiPrompt: 'Explain cold-pressed botanical oil benefits.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Sanctuary',
            fields: [
              { id: 'title', label: 'Sanctuary Title', type: 'text', defaultValue: 'A Haven for Your Senses' },
              { id: 'description', label: 'Sanctuary details', type: 'textarea', aiPrompt: 'Write a peaceful details about therapy rooms and sensory deprivations.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Therapy Options',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Therapeutic Rituals' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Tranquil Reviews',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Rejuvenated Visitors' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Book a Ritual',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Visit Our Oasis' }
            ]
          }
        ]
      },
      {
        id: 'page-services',
        name: 'Spa Rituals',
        path: '/services',
        sections: [
          {
            id: 'header',
            type: 'SimpleHeaderSection',
            name: 'Rituals Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Therapy Ritual Menu' }
            ]
          },
          {
            id: 'servicesGrid',
            type: 'ProductGridSection',
            name: 'Spa Ritual List',
            fields: [
              { id: 'layout', label: 'Procedure Layout', type: 'select', options: [{label: 'Clean Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 9. Premium Law Firm (Services, Multipage)
  {
    id: 'premium-law-v2',
    version: 2,
    name: 'Lex Corporate Counsel',
    desc: 'Authoritative, stately corporate law and advisory layout using deep indigo, gold accents, and sharp typography.',
    category: 'Services',
    colors: ['#0f172a', '#b45309', '#f8fafc'],
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
            name: 'Counsel Hero',
            fields: [
              { id: 'headline', label: 'Stately Headline', type: 'text', required: true, aiPrompt: 'Write a powerful, authoritative corporate law firm headline.' },
              { id: 'tagline', label: 'Stately Subtitle', type: 'text', aiPrompt: 'Write a tagline about rigorous defense and client protection.' },
              { id: 'productImage', label: 'Lead Counsel Portrait', type: 'image' },
              { id: 'primaryCta', label: 'CTA text', type: 'text', defaultValue: 'Schedule Briefing' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Firm Overview',
            fields: [
              { id: 'title', label: 'Overview Title', type: 'text', defaultValue: 'Stewardship & Excellence' },
              { id: 'description', label: 'Firm Details', type: 'textarea', aiPrompt: 'Write a compelling firm historical profile and legal credentials.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Practice Focus',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Practice Specialties' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Client Endorsements',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Corporate Testimonials' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Retainer FAQ',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Retainer Framework' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Connect with Us',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Brief Our Attorneys' }
            ]
          }
        ]
      },
      {
        id: 'page-practices',
        name: 'Practice Areas',
        path: '/practices',
        sections: [
          {
            id: 'header',
            type: 'SimpleHeaderSection',
            name: 'Practices Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Areas of Litigation' }
            ]
          },
          {
            id: 'grid',
            type: 'ProductGridSection',
            name: 'Litigation Areas',
            fields: [
              { id: 'layout', label: 'Procedure Layout', type: 'select', options: [{label: 'Clean Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 10. Premium Business Consulting (Services, Single Page)
  {
    id: 'premium-consulting-v2',
    version: 2,
    name: 'Vanguard Consulting',
    desc: 'Sleek, futuristic single-page template featuring dark obsidian backdrops, sharp geometric lines, and complex feature cards.',
    category: 'Services',
    colors: ['#09090b', '#06b6d4', '#fafafa'],
    preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Consulting Banner',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', required: true, aiPrompt: 'Write a high-converting corporate tech/advisory consulting headline.' },
              { id: 'tagline', label: 'Tagline', type: 'text', aiPrompt: 'Write a brief sub-tagline about digital scaling and efficiency.' },
              { id: 'backgroundImage', label: 'Hero Image', type: 'image' },
              { id: 'primaryCta', label: 'CTA', type: 'text', defaultValue: 'Launch Audit' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Core Services',
            fields: [
              { id: 'b1Title', label: 'Service 1 Title', type: 'text', defaultValue: 'Enterprise Architecture' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Meet Our Experts',
            fields: [
              { id: 'title', label: 'Advisor Title', type: 'text', defaultValue: 'Engineered For Enterprise Growth' },
              { id: 'description', label: 'Biography details', type: 'textarea', aiPrompt: 'Write a corporate description about technology integration and advising.' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Client Feedback',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Global Enterprise Reviews' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Advisory FAQs',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Engagement Framework FAQs' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Schedule Briefing',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Discuss Your Enterprise Strategy' }
            ]
          }
        ]
      }
    ]
  },

  // 11. Premium Photography (Services, Multipage)
  {
    id: 'premium-photography-v2',
    version: 2,
    name: 'Lumina Studio',
    desc: 'Highly aesthetic photography portfolio template utilizing absolute stark black background, floating image cards, and wide margins.',
    category: 'Services',
    colors: ['#000000', '#ec4899', '#0a0a0a'],
    preview: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Shutter Hero',
            fields: [
              { id: 'headline', label: 'Aesthetic Headline', type: 'text', required: true, aiPrompt: 'Write an artistic, evocative photography studio headline.' },
              { id: 'tagline', label: 'Artistic Tagline', type: 'text', aiPrompt: 'Write a quote about capturing light, shadows, and time.' },
              { id: 'backgroundImage', label: 'Striking Portrait Image', type: 'image' },
              { id: 'primaryCta', label: 'CTA', type: 'text', defaultValue: 'Book Photoshoot' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'The Visual Artist',
            fields: [
              { id: 'title', label: 'Artist Title', type: 'text', defaultValue: 'Capturing Raw Human Emotion' },
              { id: 'description', label: 'Artist details', type: 'textarea', aiPrompt: 'Write an artistic, compelling bio details of a fine-art portrait photographer.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Creative Services',
            fields: [
              { id: 'title', label: 'Services Title', type: 'text', defaultValue: 'Photo Packages' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Kind Words',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Loved by Creators' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Session FAQ',
            fields: [
              { id: 'title', label: 'FAQ Title', type: 'text', defaultValue: 'Shooting Guidelines FAQ' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Hire the Studio',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Book Your Visual Session' }
            ]
          }
        ]
      },
      {
        id: 'page-portfolio',
        name: 'Portfolio',
        path: '/portfolio',
        sections: [
          {
            id: 'header',
            type: 'SimpleHeaderSection',
            name: 'Portfolio Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Creative Portfolio' }
            ]
          },
          {
            id: 'grid',
            type: 'ProductGridSection',
            name: 'Portfolio Images',
            fields: [
              { id: 'layout', label: 'Display Grid', type: 'select', options: [{label: 'Grid List', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 12. Premium Fashion (Retail, Multipage)
  {
    id: 'premium-fashion-v2',
    version: 2,
    name: 'Maison Couture',
    desc: 'High-conversion clothing, fashion, and luxury accessory layout featuring split heroes, product sliders, and elegant serif typography.',
    category: 'Retail',
    subcategory: 'clothing',
    colors: ['#18181b', '#047857', '#fafafa'],
    preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Couture Hero Split',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write a trendy luxury clothing line welcome headline.' },
              { id: 'tagline', label: 'Hero Subtitle', type: 'text', aiPrompt: 'Write a tagline about sustainability, luxury threads, and minimal style.' },
              { id: 'productImage', label: 'Main Fashion Model Look', type: 'image' },
              { id: 'primaryCta', label: 'CTA Text', type: 'text', defaultValue: 'Shop Collection' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Brand Promise',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Eco-Friendly Fibres' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Short description of sustainable clothing materials.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Legacy',
            fields: [
              { id: 'title', label: 'Legacy Title', type: 'text', defaultValue: 'Meticulously Sewn' },
              { id: 'description', label: 'Details', type: 'textarea', aiPrompt: 'Write an inspiring story about design studio craftsmanship.' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Trending Collection',
            fields: [
              { id: 'title', label: 'Store Title', type: 'text', defaultValue: 'Summer Lookbook' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Critic Endorsements',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Praise from Vogue & Customers' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Shipping FAQs',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Delivery & Sizing' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Maison HQ',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Visit the Atelier' }
            ]
          }
        ]
      },
      {
        id: 'page-shop',
        name: 'Catalog',
        path: '/shop',
        sections: [
          {
            id: 'shopHeader',
            type: 'SimpleHeaderSection',
            name: 'Shop Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Complete Catalog' }
            ]
          },
          {
            id: 'productGrid',
            type: 'ProductGridSection',
            name: 'Product Grid',
            fields: [
              { id: 'layout', label: 'Display Grid', type: 'select', options: [{label: 'Fashion Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 13. Premium Tech (Retail, Multipage)
  {
    id: 'premium-tech-v2',
    version: 2,
    name: 'Quantum Gadgets',
    desc: 'Futuristic e-commerce template featuring dark obsidian backdrops, sharp geometric lines, neon border highlights, and product grids.',
    category: 'Retail',
    subcategory: 'tech',
    colors: ['#09090b', '#06b6d4', '#09090b'],
    preview: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Quantum Hero',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write a cutting-edge electronic/gadgets store headline.' },
              { id: 'tagline', label: 'Hero Tagline', type: 'text', aiPrompt: 'Write a futuristic tagline about next-generation device scaling.' },
              { id: 'backgroundImage', label: 'Smartwatch/Gadget Photo', type: 'image' },
              { id: 'primaryCta', label: 'CTA', type: 'text', defaultValue: 'Unlock Access' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Gadget Specs',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Quantum Core' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'Our Labs',
            fields: [
              { id: 'title', label: 'Advisor Title', type: 'text', defaultValue: 'Future-Proof Hardware Architecture' },
              { id: 'description', label: 'Details', type: 'textarea', aiPrompt: 'Write a detailed profile about custom chip prototyping and logic boards.' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Trending Devices',
            fields: [
              { id: 'title', label: 'Store Title', type: 'text', defaultValue: 'Cyber Monday Drops' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Pioneer Reviews',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Endorsed by Technologists' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Gadget FAQs',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Device Retainer & Shipping' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Lab HQ',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Brief Our Engineers' }
            ]
          }
        ]
      },
      {
        id: 'page-shop',
        name: 'Device Catalog',
        path: '/shop',
        sections: [
          {
            id: 'shopHeader',
            type: 'SimpleHeaderSection',
            name: 'Devices Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'All Hardware Modules' }
            ]
          },
          {
            id: 'productGrid',
            type: 'ProductGridSection',
            name: 'Litigation Areas',
            fields: [
              { id: 'layout', label: 'Procedure Layout', type: 'select', options: [{label: 'Clean Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 14. Premium Furniture Studio (Retail, Multipage)
  {
    id: 'premium-furniture-v2',
    version: 2,
    name: 'Linear Furniture',
    desc: 'Elegant, Scandinavian-inspired layout highlighting minimalist home decor, mid-century modern wood textures, and clean product lists.',
    category: 'Retail',
    subcategory: 'general',
    colors: ['#292524', '#d97706', '#fafaf9'],
    preview: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Interior Hero Split',
            fields: [
              { id: 'headline', label: 'Aesthetic Headline', type: 'text', required: true, aiPrompt: 'Write a minimalistic scandinavian home decor shop headline.' },
              { id: 'tagline', label: 'Aesthetic Subtitle', type: 'text', aiPrompt: 'Write a tagline about natural woods, lines, and architecture.' },
              { id: 'productImage', label: 'Mid-Century Chair Visual', type: 'image' },
              { id: 'primaryCta', label: 'CTA text', type: 'text', defaultValue: 'Order Collection' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'The Woodworking Studio',
            fields: [
              { id: 'title', label: 'Studio Title', type: 'text', defaultValue: 'Artisanal Joinery' },
              { id: 'description', label: 'Details', type: 'textarea', aiPrompt: 'Write a story detailing teak wood joinery and bespoke designs.' }
            ]
          },
          {
            id: 'features',
            type: 'CardsSection',
            name: 'Room Collections',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Room Packages' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Signature Pieces',
            fields: [
              { id: 'title', label: 'Carousel Title', type: 'text', defaultValue: 'Iconic Chairs' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Client Reviews',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Featured Interior Feedbacks' }
            ]
          },
          {
            id: 'faq',
            type: 'FaqSection',
            name: 'Delivery FAQ',
            fields: [
              { id: 'title', label: 'FAQ Heading', type: 'text', defaultValue: 'Bespoke Shipping' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Visit the Showroom',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Visit Our Showroom' }
            ]
          }
        ]
      },
      {
        id: 'page-shop',
        name: 'Showroom Catalog',
        path: '/shop',
        sections: [
          {
            id: 'shopHeader',
            type: 'SimpleHeaderSection',
            name: 'Furniture Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Complete Showroom Pieces' }
            ]
          },
          {
            id: 'productGrid',
            type: 'ProductGridSection',
            name: 'Bespoke Grid',
            fields: [
              { id: 'layout', label: 'Bespoke Grid', type: 'select', options: [{label: 'Showroom Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          }
        ]
      }
    ]
  },

  // 15. Premium Organic Grocery (Retail, Single Page)
  {
    id: 'premium-grocery-v2',
    version: 2,
    name: 'Nature Market',
    desc: 'Bright, botanical, high-energy single-page template highlighting farm-to-table groceries, local deliveries, and fresh produce.',
    category: 'Retail',
    subcategory: 'general',
    colors: ['#15803d', '#16a34a', '#f0fdf4'],
    preview: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Green Grocer Hero',
            fields: [
              { id: 'headline', label: 'Hero Headline', type: 'text', required: true, aiPrompt: 'Write a fresh, vibrant organic grocery store headline.' },
              { id: 'tagline', label: 'Hero Subtitle', type: 'text', aiPrompt: 'Write a tagline about locally-harvested produce and direct farm delivery.' },
              { id: 'backgroundImage', label: 'Produce Image', type: 'image' },
              { id: 'primaryCta', label: 'CTA text', type: 'text', defaultValue: 'Shop Fresh Produce' }
            ]
          },
          {
            id: 'benefits',
            type: 'IconGridSection',
            name: 'Market Trust',
            fields: [
              { id: 'b1Title', label: 'Benefit 1 Title', type: 'text', defaultValue: 'Delivered in 2 Hours' },
              { id: 'b1Desc', label: 'Benefit 1 Desc', type: 'text', aiPrompt: 'Short description of prompt delivery.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'The Organic Farm',
            fields: [
              { id: 'title', label: 'Farm Title', type: 'text', defaultValue: 'Harvested at Dawn' },
              { id: 'description', label: 'Details', type: 'textarea', aiPrompt: 'Write a details about local organic farms and community gardening.' }
            ]
          },
          {
            id: 'catalog',
            type: 'ProductGridSection',
            name: 'Produce Catalog',
            fields: [
              { id: 'layout', label: 'Produce Grid', type: 'select', options: [{label: 'Clean Grocery Grid', value: 'grid'}], defaultValue: 'grid' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Locals Feedback',
            fields: [
              { id: 'title', label: 'Reviews Heading', type: 'text', defaultValue: 'Loved by Kitchens' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Order Delivery',
            fields: [
              { id: 'title', label: 'Heading', type: 'text', defaultValue: 'Visit the Organic Depot' }
            ]
          }
        ]
      }
    ]
  }
];

export function getTemplateById(id: string): TemplateDef | undefined {
  return TEMPLATES.find(t => t.id === id);
}
