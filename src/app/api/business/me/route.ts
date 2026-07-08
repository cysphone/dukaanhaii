import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    
    // Fetch the current user to get their email and phone number
    const dbUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Build the OR conditions to find the store
    // 1. By user ID directly
    const orConditions: any[] = [{ userId: dbUser.id }];
    
    // 2. By WhatsApp number matching user's phone number
    if (dbUser.phoneNumber) {
      orConditions.push({ whatsappNumber: dbUser.phoneNumber });
    }
    
    // 3. By Email matching the business owner's email
    if (dbUser.email) {
      orConditions.push({ user: { email: dbUser.email } });
    }

    // Find the business matching any of these criteria
    let business = await prisma.business.findFirst({
      where: {
        OR: orConditions
      },
      include: { _count: { select: { products: true } } },
    });
    
    // If we found a business but it's not linked to the current user's ID, 
    // update it so it is linked to the current session user.
    // This officially "merges" the WhatsApp-created business with their Google login or vice versa.
    if (business && business.userId !== dbUser.id) {
      business = await prisma.business.update({
        where: { id: business.id },
        data: { userId: dbUser.id },
        include: { _count: { select: { products: true } } },
      });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}
