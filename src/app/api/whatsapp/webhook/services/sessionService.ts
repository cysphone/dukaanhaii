import { prisma } from '@/lib/prisma';
import { WhatsappSession } from '@prisma/client';

export const TIMEOUT_THRESHOLD = 30 * 60 * 1000; // 30 minutes

export async function getOrCreateSession(phoneNumber: string): Promise<{ session: WhatsappSession; isTimeout: boolean }> {
  let session = await prisma.whatsappSession.findUnique({
    where: { phoneNumber }
  });

  const now = new Date();
  let isTimeout = false;

  if (session && (now.getTime() - session.updatedAt.getTime() > TIMEOUT_THRESHOLD)) {
    if (session.step !== 'completed' && session.step !== 'start' && session.step !== 'main_menu') {
      isTimeout = true;
    }
  }

  if (!session) {
    session = await prisma.whatsappSession.create({
      data: { phoneNumber, step: 'start', collectedData: {} }
    });
  } else {
    session = await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { updatedAt: now }
    });
  }

  return { session, isTimeout };
}

export async function updateSessionStep(phoneNumber: string, nextStep: string, collectedData: any): Promise<WhatsappSession> {
  return await prisma.whatsappSession.update({
    where: { phoneNumber },
    data: { step: nextStep, collectedData },
  });
}
