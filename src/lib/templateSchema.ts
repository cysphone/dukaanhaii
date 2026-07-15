export type FieldType = 'text' | 'textarea' | 'image' | 'gallery' | 'color' | 'faq' | 'cards' | 'buttons' | 'icons' | 'video' | 'select' | 'boolean';

export interface TemplateField {
    id: string;
    label: string;
    type: FieldType;
    required?: boolean;
    description?: string;
    aiPrompt?: string; // Prompt to generate this specific field's content
    options?: { label: string; value: string }[]; // For select fields
    defaultValue?: any;
}

export interface TemplateSection {
    id: string;
    type: string; // The React Component name that will render this, e.g., 'HeroSection'
    name: string;
    description?: string;
    fields: TemplateField[];
}

export interface TemplatePage {
    id: string;
    name: string;
    path: string; // e.g. '/', '/about', '/menu'
    sections: TemplateSection[];
}

export interface TemplateDef {
    id: string;
    version: 2; // Strict versioning
    name: string;
    desc: string;
    category: string;
    subcategory?: string;
    colors: string[];
    pages: TemplatePage[];
    preview: string;
    tag?: string;
}
