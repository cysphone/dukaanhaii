const fs = require('fs');
const path = require('path');

const ecommTemplates = `
  // NEW: Classic E-Commerce (Retail, Multipage)
  {
    id: 'classic-ecommerce-v2',
    version: 2,
    name: 'Classic Store',
    desc: 'A robust, multi-page traditional online store ideal for wide product catalogs, featuring a shop and about page.',
    category: 'Retail',
    colors: ['#2563eb', '#1e40af', '#ffffff'],
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
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
              { id: 'headline', label: 'Headline', type: 'text', aiPrompt: 'Write a powerful 5-10 word headline for an online store.' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', aiPrompt: 'Write a catchy 10-15 word subheadline.' }
            ]
          },
          {
            id: 'features',
            type: 'IconGridSection',
            name: 'Features',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Why Shop With Us?' },
              { id: 'f1_title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Free Shipping' },
              { id: 'f1_desc', label: 'Feature 1 Desc', type: 'text', defaultValue: 'On all orders over $50' },
              { id: 'f2_title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Secure Payment' },
              { id: 'f2_desc', label: 'Feature 2 Desc', type: 'text', defaultValue: '100% secure checkout' },
              { id: 'f3_title', label: 'Feature 3 Title', type: 'text', defaultValue: '24/7 Support' },
              { id: 'f3_desc', label: 'Feature 3 Desc', type: 'text', defaultValue: 'We are here to help' }
            ]
          },
          {
            id: 'trending',
            type: 'ProductCarouselSection',
            name: 'Trending Products',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Trending Now' }
            ]
          },
          {
            id: 'about',
            type: 'AboutSection',
            name: 'About Preview',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Story' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a short 30 word story about the brand.' }
            ]
          },
          {
            id: 'testimonials',
            type: 'TestimonialsSection',
            name: 'Reviews',
            fields: [
              { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'What Customers Say' }
            ]
          },
          {
            id: 'contact',
            type: 'ContactSection',
            name: 'Contact',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Get in Touch' }
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
            name: 'Product Grid',
            fields: []
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
              { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Passionate about delivering the best.' }
            ]
          },
          {
            id: 'about-content',
            type: 'TextSection',
            name: 'About Content',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Our Mission' },
              { id: 'content', label: 'Content', type: 'text', aiPrompt: 'Write a 40 word paragraph about our mission.' }
            ]
          }
        ]
      }
    ]
  },
  // NEW: Modern Store (Retail, Multipage)
  {
    id: 'modern-ecommerce-v2',
    version: 2,
    name: 'Modern Shop',
    desc: 'A sleek, minimal eCommerce template with strong typography and spacing, perfect for fashion, electronics, and lifestyle brands.',
    category: 'Retail',
    colors: ['#000000', '#333333', '#fafafa'],
    preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        path: '/',
        sections: [
          {
            id: 'hero',
            type: 'VideoHeroSection',
            name: 'Hero',
            fields: [
              { id: 'headline', label: 'Headline', type: 'text', aiPrompt: 'Write an edgy 4 word headline.' },
              { id: 'subheadline', label: 'Subheadline', type: 'text', aiPrompt: 'Write a minimal 10 word subheadline.' }
            ]
          },
          {
            id: 'products',
            type: 'ProductCarouselSection',
            name: 'New Arrivals',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'New Arrivals' }
            ]
          },
          {
            id: 'categories',
            type: 'CardsSection',
            name: 'Collections',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Shop by Category' },
              { id: 'c1_title', label: 'Card 1', type: 'text', defaultValue: 'Men' },
              { id: 'c2_title', label: 'Card 2', type: 'text', defaultValue: 'Women' },
              { id: 'c3_title', label: 'Card 3', type: 'text', defaultValue: 'Accessories' }
            ]
          },
          {
            id: 'faqs',
            type: 'FaqSection',
            name: 'FAQs',
            fields: [
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Frequently Asked Questions' }
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
              { id: 'title', label: 'Title', type: 'text', defaultValue: 'Collection' }
            ]
          },
          {
            id: 'shop-grid',
            type: 'ProductGridSection',
            name: 'Product Grid',
            fields: []
          }
        ]
      }
    ]
  },
`;

const filePath = path.join(__dirname, 'src', 'lib', 'templates.ts');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'export const TEMPLATES: TemplateDef[] = [';
const insertIndex = content.indexOf(targetStr) + targetStr.length;

if (content.indexOf(targetStr) !== -1) {
  content = content.slice(0, insertIndex) + '\n' + ecommTemplates + content.slice(insertIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully injected templates.');
} else {
  console.log('Failed to find TEMPLATES array.');
}
