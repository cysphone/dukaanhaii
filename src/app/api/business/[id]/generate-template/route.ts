import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TEMPLATES } from '@/lib/templates';
import { generateFieldContent } from '@/lib/gemini';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const business = await prisma.business.findFirst({
      where: { id: params.id, userId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const { templateId } = await req.json();
    if (!templateId) {
      return NextResponse.json({ error: 'templateId is required' }, { status: 400 });
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Parse existing config so we don't overwrite user's manual entries
    let currentConfig: any = {};
    if (business.templateConfig) {
      try {
        currentConfig = typeof business.templateConfig === 'string' 
          ? JSON.parse(business.templateConfig) 
          : business.templateConfig;
      } catch (e) {
        currentConfig = {};
      }
    }

    const businessContext = `
      Business Name: ${business.name || 'My Business'}
      Category: ${business.category || 'Retail'}
      Description: ${business.description || 'A great local business.'}
      Location: ${business.location || 'India'}
    `;

    // Process all pages and sections in the template
    for (const page of template.pages || []) {
      if (!currentConfig[page.id]) {
        currentConfig[page.id] = {};
      }

      for (const section of page.sections) {
        if (!currentConfig[page.id][section.id]) {
          currentConfig[page.id][section.id] = {};
        }

        for (const field of section.fields) {
          // If the user hasn't filled this field, and it has an AI Prompt
          if (!currentConfig[page.id][section.id][field.id] && field.aiPrompt) {
            try {
              console.log(`Generating AI content for ${page.id} -> ${section.id} -> ${field.id}`);
              const generatedText = await generateFieldContent(field.aiPrompt, businessContext);
              currentConfig[page.id][section.id][field.id] = generatedText;
            } catch (err) {
              console.error(`AI Generation failed for ${field.id}:`, err);
              // Fallback to default if AI completely fails
              currentConfig[page.id][section.id][field.id] = field.defaultValue || '';
            }
          } 
          // If it doesn't have an AI prompt, just set default if empty
          else if (!currentConfig[page.id][section.id][field.id] && field.defaultValue !== undefined) {
             currentConfig[page.id][section.id][field.id] = field.defaultValue;
          }
        }
      }
    }

    // Update the business in the database
    const updated = await prisma.business.update({
      where: { id: params.id },
      data: {
        templateType: templateId,
        templateConfig: currentConfig,
      },
    });

    return NextResponse.json({ success: true, business: updated });
  } catch (error) {
    console.error('Template generation error:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
