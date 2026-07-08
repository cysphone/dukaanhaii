import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    const formData = await req.formData();
    
    // Process text fields
    const allowedFields = [
      'name', 'description', 'whatsappNumber', 'location', 'category', 'templateType', 'customDomain',
      'vision', 'mission', 'headline', 'tagline', 'about', 'marketingDesc',
      'ctaText', 'phoneNumber', 'email', 'instagramUrl', 'facebookUrl', 'websiteUrl',
      'primaryColor', 'secondaryColor', 'footerText', 'copyrightText'
    ];
    
    const data: any = {};
    for (const key of allowedFields) {
      const val = formData.get(key);
      if (val !== null && val !== '') {
        data[key] = val as string;
      } else if (val === '') {
        data[key] = null;
      }
    }

    // Process file uploads
    const logoFile = formData.get('logo') as File | null;
    const faviconFile = formData.get('favicon') as File | null;

    if (logoFile && logoFile.size > 0) {
      try {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        data.logoUrl = await uploadImageToCloudinary(buffer, `dukaanhai/business/${business.id}/logo`);
      } catch (err) {
        console.error('Logo upload error:', err);
      }
    }

    if (faviconFile && faviconFile.size > 0) {
      try {
        const buffer = Buffer.from(await faviconFile.arrayBuffer());
        data.faviconUrl = await uploadImageToCloudinary(buffer, `dukaanhai/business/${business.id}/favicon`);
      } catch (err) {
        console.error('Favicon upload error:', err);
      }
    }

    const updated = await prisma.business.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ business: updated });
  } catch (error) {
    console.error('Update business error:', error);
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    await prisma.business.deleteMany({ where: { id: params.id, userId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete business' }, { status: 500 });
  }
}
