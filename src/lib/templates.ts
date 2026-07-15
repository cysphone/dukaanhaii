export * from './templateSchema';
import { TemplateDef } from './templateSchema';

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates' },
  { id: 'Retail', name: 'Retail & E-commerce' },
  { id: 'Services', name: 'Services & Bookings' },
  { id: 'Single', name: 'Single Page Sites' },
];
export type TemplateCategory = 'all' | 'Retail' | 'Services' | 'Single';

export const TEMPLATES: TemplateDef[] = [
  {
    id: 'ecommerce-multipage-v1',
    version: 2,
    name: 'Premium E-Commerce',
    desc: 'A robust multi-page store with a dedicated shop and about section.',
    category: 'Retail',
    colors: ['#000000', '#333333', '#ffffff'],
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'home-header',
            type: 'SimpleHeaderSection', // We rely on the global StoreHeader, but we can put a hero here
            name: 'Hero Header',
            fields: []
          }, // Note: we have a global StoreHeader, so we'll just start with Hero
          {
            id: 'hero',
            type: 'HeroSection',
            name: 'Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', aiPrompt: 'Write an edgy 4 word headline for a brand.' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', aiPrompt: 'Write a minimal 10 word subheadline.' }
            ]
          },
          {
            id: 'carousel',
            type: 'ProductCarouselSection',
            name: 'Product Carousel',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Trending Now' }
            ]
          },
          {
            id: 'categories',
            type: 'CardsSection',
            name: 'Categories',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Shop by Category' },
              { id: 'c1_title', label: 'Category 1', type: 'text', defaultValue: 'New Arrivals' },
              { id: 'c2_title', label: 'Category 2', type: 'text', defaultValue: 'Best Sellers' },
              { id: 'c3_title', label: 'Category 3', type: 'text', defaultValue: 'Accessories' }
            ]
          },
          {
            id: 'featured',
            type: 'ProductGridSection',
            name: 'Featured Products',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Featured Selection' }
            ]
          },
          {
            id: 'about-preview',
            type: 'AboutSection',
            name: 'About Preview',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Story' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a short 30 word story about the brand.' }
            ]
          },
          {
            id: 'contact-cta',
            type: 'ContactSection',
            name: 'Contact CTA',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Get In Touch' }
            ]
          }
        ]
      },
      {
        id: 'page-about',
        name: 'About Us',
        path: '/about',
        sections: [
          {
            id: 'about-hero',
            type: 'HeroSection',
            name: 'About Header',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Who We Are' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Our journey and mission.' }
            ]
          },
          {
            id: 'about-story',
            type: 'TextSection',
            name: 'The Story',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Story' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 40 word story.' }
            ]
          },
          {
            id: 'mission',
            type: 'TextSection',
            name: 'Our Mission',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Mission' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 20 word mission statement.' }
            ]
          },
          {
            id: 'vision',
            type: 'TextSection',
            name: 'Our Vision',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Vision' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 20 word vision statement.' }
            ]
          },
          {
            id: 'about-cta',
            type: 'SplitHeroSection',
            name: 'CTA',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Join Us Today' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Experience the difference.' }
            ]
          }
        ]
      },
      {
        id: 'page-shop',
        name: 'Shop',
        path: '/shop',
        sections: [
          {
            id: 'shop-header',
            type: 'SimpleHeaderSection',
            name: 'Shop Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'All Products' },
              { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Browse our complete collection.' }
            ]
          },
          {
            id: 'shop-grid',
            type: 'ProductGridSection',
            name: 'Shop Grid',
            fields: [] // Products loaded dynamically
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-header',
            type: 'HeroSection',
            name: 'Contact Header',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Contact Us' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'We would love to hear from you.' }
            ]
          },
          {
            id: 'contact-info',
            type: 'ContactSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Get In Touch' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'service-multipage-v1',
    version: 2,
    name: 'Professional Services',
    desc: 'A robust multi-page site designed specifically for service-based businesses.',
    category: 'Services',
    colors: ['#2563eb', '#1e40af', '#ffffff'],
    preview: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'VideoHeroSection',
            name: 'Video Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', aiPrompt: 'Write a strong 5 word headline for a service business.' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', aiPrompt: 'Write a professional 10 word subheadline.' }
            ]
          },
          {
            id: 'categories',
            type: 'CardsSection',
            name: 'Service Categories',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Expertise' },
              { id: 'c1_title', label: 'Category 1', type: 'text', defaultValue: 'Consulting' },
              { id: 'c2_title', label: 'Category 2', type: 'text', defaultValue: 'Strategy' },
              { id: 'c3_title', label: 'Category 3', type: 'text', defaultValue: 'Support' }
            ]
          },
          {
            id: 'featured',
            type: 'ProductGridSection',
            name: 'Featured Services',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Top Services' }
            ]
          },
          {
            id: 'about-preview',
            type: 'AboutSection',
            name: 'About Preview',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Why Choose Us' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a short 30 word paragraph on why to choose us.' }
            ]
          },
          {
            id: 'contact-cta',
            type: 'ContactSection',
            name: 'Contact CTA',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Ready to start?' }
            ]
          }
        ]
      },
      {
        id: 'page-about',
        name: 'About Us',
        path: '/about',
        sections: [
          {
            id: 'about-hero',
            type: 'HeroSection',
            name: 'About Header',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Firm' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Dedicated to excellence.' }
            ]
          },
          {
            id: 'about-story',
            type: 'TextSection',
            name: 'Who We Are',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Who We Are' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 40 word paragraph.' }
            ]
          },
          {
            id: 'mission',
            type: 'TextSection',
            name: 'Our Mission',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Mission' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 20 word mission statement.' }
            ]
          },
          {
            id: 'vision',
            type: 'TextSection',
            name: 'Our Vision',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Vision' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 20 word vision statement.' }
            ]
          },
          {
            id: 'about-cta',
            type: 'SplitHeroSection',
            name: 'CTA',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Work With Us' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Let us help you achieve your goals.' }
            ]
          }
        ]
      },
      {
        id: 'page-services',
        name: 'Services',
        path: '/services', // using products table under the hood
        sections: [
          {
            id: 'services-header',
            type: 'SimpleHeaderSection',
            name: 'Services Header',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Services' },
              { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Comprehensive solutions for you.' }
            ]
          },
          {
            id: 'services-grid',
            type: 'ProductGridSection',
            name: 'Services Grid',
            fields: [] // Products (Services) loaded dynamically
          }
        ]
      },
      {
        id: 'page-contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-header',
            type: 'HeroSection',
            name: 'Contact Header',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Contact Us' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Get in touch with our team.' }
            ]
          },
          {
            id: 'contact-info',
            type: 'ContactSection',
            name: 'Contact Info',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Reach Out' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'singlepage-v1',
    version: 2,
    name: 'Modern Landing Page',
    desc: 'A high-converting, single-page landing site.',
    category: 'Single',
    colors: ['#10b981', '#059669', '#ffffff'],
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'SplitHeroSection',
            name: 'Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', aiPrompt: 'Write a catchy 5 word headline.' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', aiPrompt: 'Write a punchy 10 word subheadline.' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'About',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Who We Are' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a short 30 word story.' }
            ]
          },
          {
            id: 'features',
            type: 'IconGridSection',
            name: 'Features',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Why Us?' },
              { id: 'f1_title', label: 'Feature 1', type: 'text', defaultValue: 'Fast' },
              { id: 'f1_desc', label: 'Desc 1', type: 'text', defaultValue: 'Quick delivery.' },
              { id: 'f2_title', label: 'Feature 2', type: 'text', defaultValue: 'Reliable' },
              { id: 'f2_desc', label: 'Desc 2', type: 'text', defaultValue: 'Always here.' },
              { id: 'f3_title', label: 'Feature 3', type: 'text', defaultValue: 'Quality' },
              { id: 'f3_desc', label: 'Desc 3', type: 'text', defaultValue: 'Top notch.' }
            ]
          },
          {
            id: 'products',
            type: 'ProductCarouselSection',
            name: 'Our Offerings',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'What We Offer' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Reviews',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Client Feedback' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Contact Form',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Get Started' }
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
