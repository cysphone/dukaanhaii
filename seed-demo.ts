import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo store...');

  // 1. Create a dummy admin user if not exists
  const user = await prisma.user.upsert({
    where: { email: 'demo@dukaanhai.in' },
    update: {},
    create: {
      name: 'Demo Admin',
      email: 'demo@dukaanhai.in',
      phoneNumber: '0000000000'
    }
  });

  // 2. Create or update the demo business
  const business = await prisma.business.upsert({
    where: { slug: 'demo' },
    update: {
      name: 'DukaanHai Showcase',
      description: 'This is a demo store showcasing the capabilities of DukaanHai. We offer premium templates, AI-generated content, and seamless WhatsApp integration.',
      category: 'General',
      location: 'New Delhi, India',
      headline: 'Welcome to the DukaanHai Showcase',
      about: 'DukaanHai is the fastest way to launch your online presence in India. Build a complete website in 60 seconds directly from WhatsApp.',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      email: 'hello@dukaanhai.in',
      phoneNumber: '+919999999999',
      footerText: 'Powered by DukaanHai',
      templateType: 'minimal'
    },
    create: {
      userId: user.id,
      slug: 'demo',
      name: 'DukaanHai Showcase',
      description: 'This is a demo store showcasing the capabilities of DukaanHai. We offer premium templates, AI-generated content, and seamless WhatsApp integration.',
      category: 'General',
      location: 'New Delhi, India',
      headline: 'Welcome to the DukaanHai Showcase',
      about: 'DukaanHai is the fastest way to launch your online presence in India. Build a complete website in 60 seconds directly from WhatsApp.',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      email: 'hello@dukaanhai.in',
      phoneNumber: '+919999999999',
      footerText: 'Powered by DukaanHai',
      templateType: 'minimal'
    }
  });

  // 3. Add some dummy products
  const productsCount = await prisma.product.count({ where: { businessId: business.id } });
  if (productsCount === 0) {
    console.log('Adding demo products...');
    await prisma.product.createMany({
      data: [
        { businessId: business.id, name: 'Premium Leather Wallet', price: 1499, description: 'Handcrafted genuine leather wallet with multiple card slots.', inStock: true },
        { businessId: business.id, name: 'Wireless Noise-Cancelling Headphones', price: 4999, description: 'Experience crystal clear sound with deep bass and active noise cancellation.', inStock: true },
        { businessId: business.id, name: 'Organic Green Tea (250g)', price: 350, description: 'Freshly sourced organic green tea leaves for a healthy morning.', inStock: true },
        { businessId: business.id, name: 'Minimalist Ceramic Mug', price: 299, description: 'Elegant ceramic mug, perfect for your daily coffee or tea.', inStock: true }
      ]
    });
  }

  console.log('Demo store seeded successfully!');
  console.log(`URL: http://localhost:3000/store/demo`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
