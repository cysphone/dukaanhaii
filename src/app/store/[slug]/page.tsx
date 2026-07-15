import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { getTemplateById } from '@/lib/templates';
import TemplateEngine from '@/components/templates/v2/TemplateEngine';

const prisma = new PrismaClient();

interface StorePageProps {
  params: { slug: string };
  searchParams: { template?: string };
}

export async function generateMetadata({ params }: StorePageProps) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) {
    return { title: 'Store Not Found | DukaanHai' };
  }

  return {
    title: `${business.name} | DukaanHai`,
    description: business.tagline || business.description || `Shop from ${business.name} on DukaanHai`,
    icons: business.faviconUrl ? [{ rel: 'icon', url: business.faviconUrl }] : undefined,
    openGraph: {
      title: business.name,
      description: business.tagline || business.description || '',
    },
  };
}

export default async function StorePage({ params, searchParams }: StorePageProps) {
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

  const templateType = searchParams.template || business.templateType || 'premium-ecommerce-v2';
  
  const templateDef = getTemplateById(templateType);

  if (templateDef && 'pages' in templateDef) {
    const homePage = templateDef.pages.find((p: any) => p.path === '/');
    if (homePage) {
      return <TemplateEngine business={business} template={templateDef} pageId={homePage.id} />;
    }
  }

  // Fallback if somehow template doesn't exist
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 p-4">
      <div className="text-center max-w-md">
         <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
         <p>The requested template "{templateType}" could not be loaded. Please ensure you have selected a valid template.</p>
      </div>
    </div>
  );
}
