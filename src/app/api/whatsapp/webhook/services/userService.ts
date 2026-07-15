import { prisma } from '@/lib/prisma';
import { User, Business } from '@prisma/client';

export async function getExistingUserAndBusiness(phoneNumber: string): Promise<{
  existingUser: (User & { businesses: Business[] }) | null;
  existingBusiness: Business | undefined;
}> {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'dukaanhai.in';
  const dummyEmail = `wa_${phoneNumber.replace('+', '')}@${rootDomain}`;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: dummyEmail },
        { phoneNumber },
        { phoneNumber: `+${phoneNumber}` }
      ]
    },
    include: { businesses: true }
  });

  const existingBusiness = existingUser?.businesses?.[0];

  return { existingUser, existingBusiness };
}
