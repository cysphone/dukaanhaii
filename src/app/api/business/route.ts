import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateBusinessContent } from '@/lib/gemini';
import { generateSlug } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const business = await prisma.business.findFirst({
      where: { userId },
      include: { _count: { select: { products: true } } },
    });

    return NextResponse.json({ business });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}

import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;
    const location = formData.get('location') as string | null;
    const templateType = formData.get('templateType') as string | null;

    if (!name) {
      return NextResponse.json({ error: 'Business name required' }, { status: 400 });
    }

    // Generate unique slug
    let slug = generateSlug(name);
    const existing = await prisma.business.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Generate AI content
    const aiContent = await generateBusinessContent({
      name,
      description: description || '',
      category: category || 'General',
      location: location || 'India',
    });

    const allowedFields = [
      'description', 'whatsappNumber', 'location', 'category', 'templateType', 'customDomain',
      'vision', 'mission', 'headline', 'tagline', 'about', 'marketingDesc', 
      'ctaText', 'phoneNumber', 'email', 'instagramUrl', 'facebookUrl', 'websiteUrl',
      'primaryColor', 'secondaryColor', 'footerText', 'copyrightText'
    ];
    
    const data: any = {
      userId,
      name,
      slug,
      headline: aiContent.headline,
      tagline: aiContent.tagline,
      about: aiContent.about,
      vision: aiContent.vision,
      mission: aiContent.mission,
      marketingDesc: aiContent.marketingDesc,
      templateType: templateType || 'minimal',
    };
    
    for (const key of allowedFields) {
      const val = formData.get(key);
      if (val !== null && val !== '') {
        data[key] = val as string;
      }
    }

    // The business ID doesn't exist yet, so we create it first, then upload images if present
    const business = await prisma.business.create({
      data,
    });

    // Process file uploads post-creation so we have the ID
    const logoFile = formData.get('logo') as File | null;
    const faviconFile = formData.get('favicon') as File | null;
    
    let updates: any = {};
    if (logoFile && logoFile.size > 0) {
      try {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        updates.logoUrl = await uploadImageToCloudinary(buffer, `dukaanhai/business/${business.id}/logo`);
      } catch (err) {}
    }

    if (faviconFile && faviconFile.size > 0) {
      try {
        const buffer = Buffer.from(await faviconFile.arrayBuffer());
        updates.faviconUrl = await uploadImageToCloudinary(buffer, `dukaanhai/business/${business.id}/favicon`);
      } catch (err) {}
    }

    if (Object.keys(updates).length > 0) {
      await prisma.business.update({ where: { id: business.id }, data: updates });
    }

    return NextResponse.json({ business }, { status: 201 });
  } catch (error) {
    console.error('Create business error:', error);
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  }
}
