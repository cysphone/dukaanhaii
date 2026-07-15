import { prisma } from '@/lib/prisma';
import { getTemplateById } from '@/lib/templates';
import MultiPageLayout from '@/components/templates/multi-page/MultiPageLayout';
import { notFound } from 'next/navigation';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) {
    return <>{children}</>;
  }

  const template = getTemplateById(business.templateType);

  const isMultiPage = template && template.id.startsWith('niche-');

  if (isMultiPage) {
    return (
      <MultiPageLayout business={business} template={template}>
        {children}
      </MultiPageLayout>
    );
  }

  return <>{children}</>;
}
