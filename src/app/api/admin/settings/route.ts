import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// Check if user is an admin
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return false;
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  return session.user.email && adminEmails.includes(session.user.email);
}

export async function GET(req: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let settings = await prisma.platformSettings.findUnique({ where: { id: "global" } });
  
  if (!settings) {
    settings = await prisma.platformSettings.create({
      data: { id: "global" }
    });
  }

  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    
    // We only allow updating these specific boolean fields
    const updatedSettings = await prisma.platformSettings.upsert({
      where: { id: "global" },
      update: {
        aiEnabled: data.aiEnabled,
        aiTitleGen: data.aiTitleGen,
        aiDescGen: data.aiDescGen,
        aiProductDesc: data.aiProductDesc,
        aiProductImage: data.aiProductImage,
        aiAutoContent: data.aiAutoContent,
      },
      create: {
        id: "global",
        aiEnabled: data.aiEnabled ?? true,
        aiTitleGen: data.aiTitleGen ?? true,
        aiDescGen: data.aiDescGen ?? true,
        aiProductDesc: data.aiProductDesc ?? true,
        aiProductImage: data.aiProductImage ?? true,
        aiAutoContent: data.aiAutoContent ?? true,
      }
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating platform settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
