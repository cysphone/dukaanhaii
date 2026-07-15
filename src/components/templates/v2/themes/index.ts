import { Inter, Playfair_Display, Lato, Anton, Roboto, Oswald } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-lato' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export interface TemplateTheme {
  headingFont: string; // The CSS variable name
  bodyFont: string;    // The CSS variable name
  cssVariables: React.CSSProperties; // Global CSS variables for the template
}

export const TemplateThemes: Record<string, TemplateTheme> = {
  'premium-restaurant-v2': {
    headingFont: playfair.variable,
    bodyFont: lato.variable,
    cssVariables: {
      '--radius-base': '0px', // Restaurants usually look better with sharp or perfectly round
      '--spacing-section': '6rem',
    } as React.CSSProperties,
  },
  'premium-gym-v2': {
    headingFont: anton.variable,
    bodyFont: roboto.variable,
    cssVariables: {
      '--radius-base': '0px',
      '--spacing-section': '4rem',
    } as React.CSSProperties,
  },
  'premium-ecommerce-v2': {
    headingFont: inter.variable,
    bodyFont: inter.variable,
    cssVariables: {
      '--radius-base': '12px',
      '--spacing-section': '5rem',
    } as React.CSSProperties,
  },
  'premium-law-v2': {
    headingFont: playfair.variable,
    bodyFont: inter.variable,
    cssVariables: {
      '--radius-base': '4px',
      '--spacing-section': '6rem',
    } as React.CSSProperties,
  },
  'premium-dental-v2': {
    headingFont: roboto.variable,
    bodyFont: inter.variable,
    cssVariables: {
      '--radius-base': '24px',
      '--spacing-section': '5rem',
    } as React.CSSProperties,
  },
  'premium-bakery-v2': {
    headingFont: playfair.variable,
    bodyFont: lato.variable,
    cssVariables: {
      '--radius-base': '16px',
      '--spacing-section': '5rem',
    } as React.CSSProperties,
  },
};

export const FallbackTheme: TemplateTheme = {
  headingFont: inter.variable,
  bodyFont: inter.variable,
  cssVariables: {
    '--radius-base': '8px',
    '--spacing-section': '4rem',
  } as React.CSSProperties,
};
