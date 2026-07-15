'use client';

import { TemplateDef } from '@/lib/templates';
import { TemplateThemes, FallbackTheme } from './themes';

// Fallback Generic Components
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { FeaturedMenuSection } from './sections/FeaturedMenuSection';
import { SimpleHeaderSection } from './sections/SimpleHeaderSection';
import { ProductGridSection } from './sections/ProductGridSection';
import { VideoHeroSection } from './sections/VideoHeroSection';
import { CardsSection } from './sections/CardsSection';
import { TextSection } from './sections/TextSection';
import { SplitHeroSection } from './sections/SplitHeroSection';
import { IconGridSection } from './sections/IconGridSection';
import { ProductCarouselSection } from './sections/ProductCarouselSection';

// Template Specific Components
import { RestaurantHeroSection } from './sections/restaurant/RestaurantHeroSection';
import { RestaurantAboutSection } from './sections/restaurant/RestaurantAboutSection';
import { RestaurantFeaturedMenuSection } from './sections/restaurant/RestaurantFeaturedMenuSection';

import { GymVideoHeroSection } from './sections/gym/GymVideoHeroSection';
import { GymCardsSection } from './sections/gym/GymCardsSection';
import { GymTextSection } from './sections/gym/GymTextSection';

import { RetailSplitHeroSection } from './sections/retail/RetailSplitHeroSection';
import { RetailProductCarouselSection } from './sections/retail/RetailProductCarouselSection';
import { RetailIconGridSection } from './sections/retail/RetailIconGridSection';

import { LawSplitHeroSection } from './sections/law/LawSplitHeroSection';
import { DentalHeroSection } from './sections/dental/DentalHeroSection';
import { BakeryHeroSection } from './sections/bakery/BakeryHeroSection';

const FallbackRegistry: Record<string, React.FC<any>> = {
  HeroSection,
  AboutSection,
  FeaturedMenuSection,
  SimpleHeaderSection,
  ProductGridSection,
  VideoHeroSection,
  CardsSection,
  TextSection,
  SplitHeroSection,
  IconGridSection,
  ProductCarouselSection
};

const TemplateSpecificRegistries: Record<string, Record<string, React.FC<any>>> = {
  'premium-restaurant-v2': {
    HeroSection: RestaurantHeroSection,
    AboutSection: RestaurantAboutSection,
    FeaturedMenuSection: RestaurantFeaturedMenuSection
  },
  'premium-gym-v2': {
    VideoHeroSection: GymVideoHeroSection,
    CardsSection: GymCardsSection,
    TextSection: GymTextSection
  },
  'premium-ecommerce-v2': {
    SplitHeroSection: RetailSplitHeroSection,
    ProductCarouselSection: RetailProductCarouselSection,
    IconGridSection: RetailIconGridSection
  },
  'premium-law-v2': {
    SplitHeroSection: LawSplitHeroSection
  },
  'premium-dental-v2': {
    HeroSection: DentalHeroSection
  },
  'premium-bakery-v2': {
    HeroSection: BakeryHeroSection
  }
};

export default function TemplateEngine({
  business,
  template,
  pageId
}: {
  business: any;
  template: TemplateDef;
  pageId: string;
}) {
  const config = business.templateConfig ? (typeof business.templateConfig === 'string' ? JSON.parse(business.templateConfig) : business.templateConfig) : {};
  const page = template.pages?.find((p: any) => p.id === pageId);

  if (!page) return <div>Page not found in template.</div>;

  const theme = TemplateThemes[template.id] || FallbackTheme;
  const specificRegistry = TemplateSpecificRegistries[template.id] || {};

  return (
    <div className={`min-h-screen w-full flex flex-col ${theme.headingFont} ${theme.bodyFont}`} style={{
      '--color-primary': template.colors[0],
      '--color-secondary': template.colors[1],
      '--color-background': template.colors[2],
      backgroundColor: 'var(--color-background)',
      ...theme.cssVariables
    } as React.CSSProperties}>
      {page.sections.map((section: any) => {
        const Component = specificRegistry[section.type] || FallbackRegistry[section.type];
        if (!Component) {
          return <div key={section.id} className="p-8 text-red-500">Missing Component for {section.type}</div>;
        }

        const sectionData = config[pageId]?.[section.id] || {};
        
        return (
          <Component 
            key={section.id} 
            data={sectionData} 
            products={business.products} 
          />
        );
      })}
    </div>
  );
}
