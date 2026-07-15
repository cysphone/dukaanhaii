export function getPlaceholderImage(category: string, subcategory?: string): string {
  // We use stable, high-quality Unsplash images as placeholders
  const placeholders: Record<string, string> = {
    'general': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    
    // Gym
    'gym-power': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    'gym-zen': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop',
    'gym': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop',
    
    // Hotel
    'hotel-luxury': 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=1600&auto=format&fit=crop',
    'hotel-resort': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop',
    'hotel': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
    
    // Ecommerce
    'ecommerce-clothing': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    'ecommerce-electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop',
    'ecommerce-grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop',
    'ecommerce': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop',
    
    // Service
    'service-modern': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop',
    'service': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    
    // Handmade / Niches
    'handmade-crochet': 'https://images.unsplash.com/photo-1605333396914-22bba4595213?q=80&w=1600&auto=format&fit=crop',
    'handmade-bakery': 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1600&auto=format&fit=crop',
    'service-mehndi': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1600&auto=format&fit=crop',
    'ecommerce-boutique': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop',
    'handmade-resin': 'https://images.unsplash.com/photo-1616874535244-73aea5daadb9?q=80&w=1600&auto=format&fit=crop',
    'handmade': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop',
  };

  const specificKey = `${category}-${subcategory}`;
  if (subcategory && placeholders[specificKey]) {
    return placeholders[specificKey];
  }
  if (placeholders[category]) {
    return placeholders[category];
  }
  
  return placeholders['general'];
}

export function getPlaceholderText(type: 'headline' | 'tagline' | 'about', businessName: string, category: string): string {
    const textMap: any = {
        headline: {
            'gym': `Transform Your Life at ${businessName}`,
            'bakery': `Freshly Baked Goodness from ${businessName}`,
            'clothing': `Define Your Style with ${businessName}`,
            'general': `Welcome to ${businessName}`
        },
        tagline: {
            'gym': `Push your limits and achieve your fitness goals with our state-of-the-art facilities.`,
            'bakery': `Handcrafted cakes, pastries, and breads made with love every single day.`,
            'general': `Discover premium quality products and services tailored just for you.`
        },
        about: {
            'general': `At ${businessName}, we believe in providing exceptional value and an unforgettable experience. Founded with a passion for excellence, our goal is to bring you the highest quality offerings in the market.`
        }
    };
    
    // Check specific subcategory/category or fallback to general
    const categorySpecific = textMap[type][category] || textMap[type]['general'];
    return categorySpecific;
}
