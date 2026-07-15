import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateTemplateConfig } from '@/lib/gemini';

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

    const aiConfig = await generateTemplateConfig(templateId, {
      name: business.name,
      category: business.category || 'Retail',
      description: business.description || 'A great local business.',
      location: business.location || 'India',
    });

    // Update the business in the database
    const updated = await prisma.business.update({
      where: { id: params.id },
      data: {
        templateType: templateId,
        templateConfig: aiConfig,
      },
    });

    return NextResponse.json({ success: true, business: updated });
  } catch (error) {
    console.error('Template generation error:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
