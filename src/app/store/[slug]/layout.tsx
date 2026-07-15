import { prisma } from '@/lib/prisma';

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <>{children}</>;
}
