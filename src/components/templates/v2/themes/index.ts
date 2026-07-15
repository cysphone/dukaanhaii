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
  'ecommerce-multipage-v1': {
    headingFont: inter.variable,
    bodyFont: inter.variable,
    cssVariables: {
      '--radius-base': '8px',
      '--spacing-section': '5rem',
    } as React.CSSProperties,
  },
  'service-multipage-v1': {
    headingFont: playfair.variable,
    bodyFont: lato.variable,
    cssVariables: {
      '--radius-base': '4px',
      '--spacing-section': '6rem',
    } as React.CSSProperties,
  },
  'singlepage-v1': {
    headingFont: oswald.variable,
    bodyFont: roboto.variable,
    cssVariables: {
      '--radius-base': '12px',
      '--spacing-section': '5rem',
    } as React.CSSProperties,
  }
};

export const FallbackTheme: TemplateTheme = {
  headingFont: inter.variable,
  bodyFont: inter.variable,
  cssVariables: {
    '--radius-base': '8px',
    '--spacing-section': '4rem',
  } as React.CSSProperties,
};
