import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { getTemplateById } from '@/lib/templates';
import TemplateEngine from '@/components/templates/v2/TemplateEngine';

const prisma = new PrismaClient();

interface StorePageProps {
  params: { slug: string; path?: string[] };
  searchParams: { template?: string };
}

export async function generateMetadata({ params }: StorePageProps) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) {
    return { title: 'Store Not Found | DukaanHai' };
  }

  // Basic meta - can be enhanced to show specific product metadata if path[0] === 'product'
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

  if (!templateDef || !('pages' in templateDef)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 p-4">
        <div className="text-center max-w-md">
           <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
           <p>The requested template "{templateType}" could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Extract path array (undefined means root '/')
  const pathArray = params.path || [];

  // Special Route: Single Product Page
  if (pathArray[0] === 'product' && pathArray[1]) {
    const productId = pathArray[1];
    const product = business.products.find(p => p.id === productId);
    if (!product) {
      notFound();
    }
    // We render the TemplateEngine but tell it to inject the Product Detail view
    return (
      <TemplateEngine 
        business={business} 
        template={templateDef} 
        pageId="system-product-detail" 
        product={product} 
      />
    );
  }

  // Normal Multipage Routing
  // Construct the requested path string (e.g. /about, /services, or /)
  const requestedPath = '/' + pathArray.join('/');
  const page = templateDef.pages.find((p: any) => p.path === requestedPath);

  if (page) {
    return <TemplateEngine business={business} template={templateDef} pageId={page.id} />;
  }

  // Fallback if the path wasn't found in the template
  notFound();
}
