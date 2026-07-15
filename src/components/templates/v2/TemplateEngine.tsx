'use client';

import { TemplateDef } from '@/lib/templates';
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

const SectionRegistry: Record<string, React.FC<any>> = {
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

  return (
    <div className="min-h-screen w-full flex flex-col" style={{
      '--color-primary': template.colors[0],
      '--color-secondary': template.colors[1],
      '--color-background': template.colors[2],
      backgroundColor: 'var(--color-background)'
    } as React.CSSProperties}>
      {page.sections.map((section: any) => {
        const Component = SectionRegistry[section.type];
        if (!Component) {
          return <div key={section.id} className="p-8 text-red-500">Missing Component for {section.type}</div>;
        }

        const sectionData = config[pageId]?.[section.id] || {};
        
        return (
          <Component 
            key={section.id} 
            data={sectionData} 
            business={business}
            templateColors={template.colors}
          />
        );
      })}
    </div>
  );
}
