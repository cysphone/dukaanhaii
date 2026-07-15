import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { getTemplateById } from '@/lib/templates';
import TemplateEngine from '@/components/templates/v2/TemplateEngine';

export default async function DynamicStorePage({
  params,
}: {
  params: { slug: string; path: string[] };
}) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { inStock: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!business) {
    notFound();
  }

  const template = getTemplateById(business.templateType);

  if (!template) {
    notFound();
  }

  const reqPath = '/' + params.path.join('/');
  
  // Find the page in the template that matches the requested path
  const page = template.pages?.find((p: any) => p.path === reqPath);
  
  if (!page) {
    notFound();
  }

  return <TemplateEngine business={business} template={template} pageId={page.id} />;
}
