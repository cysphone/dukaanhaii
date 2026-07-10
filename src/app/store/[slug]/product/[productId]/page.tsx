import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

interface ProductPageProps {
    params: { slug: string; productId: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
    const product = await prisma.product.findUnique({
        where: { id: params.productId },
        include: { business: true },
    });

    if (!product || product.business.slug !== params.slug) {
        return { title: 'Product Not Found | DukaanHai' };
    }

    return {
        title: `${product.name} - ${product.business.name} | DukaanHai`,
        description: product.description || `Buy ${product.name} from ${product.business.name}`,
    };
}

// Map template IDs to their respective dynamic components
const templateMap: Record<string, any> = {
    'minimal': dynamic(() => import('@/components/product-templates/MinimalProductTemplate')),
    'bold': dynamic(() => import('@/components/product-templates/BoldProductTemplate')),
    'catalog': dynamic(() => import('@/components/product-templates/CatalogProductTemplate')),
    'elegant': dynamic(() => import('@/components/product-templates/ElegantProductTemplate')),
    'futuristic': dynamic(() => import('@/components/product-templates/FuturisticProductTemplate')),
    'playful': dynamic(() => import('@/components/product-templates/PlayfulProductTemplate')),
    
    // E-commerce
    'ecommerce-clothing-chic': dynamic(() => import('@/components/product-templates/EcommerceClothingChicProductTemplate')),
    'ecommerce-clothing-street': dynamic(() => import('@/components/product-templates/EcommerceClothingStreetProductTemplate')),
    'ecommerce-tech-cyber': dynamic(() => import('@/components/product-templates/EcommerceTechCyberProductTemplate')),
    'ecommerce-tech-gadget': dynamic(() => import('@/components/product-templates/EcommerceTechGadgetProductTemplate')),
    'ecommerce-food-fresh': dynamic(() => import('@/components/product-templates/EcommerceFoodFreshProductTemplate')),
    'ecommerce-food-menu': dynamic(() => import('@/components/product-templates/EcommerceFoodMenuProductTemplate')),

    // Gym
    'gym-modern': dynamic(() => import('@/components/product-templates/GymModernProductTemplate')),
    'gym-power': dynamic(() => import('@/components/product-templates/GymPowerProductTemplate')),
    'gym-zen': dynamic(() => import('@/components/product-templates/GymZenProductTemplate')),

    // Hotels
    'hotel-luxury': dynamic(() => import('@/components/product-templates/HotelLuxuryProductTemplate')),
    'hotel-boutique': dynamic(() => import('@/components/product-templates/HotelBoutiqueProductTemplate')),
    'hotel-resort': dynamic(() => import('@/components/product-templates/HotelResortProductTemplate')),

    // General
    'portfolio-creative': dynamic(() => import('@/components/product-templates/PortfolioCreativeProductTemplate')),
    'service-modern': dynamic(() => import('@/components/product-templates/ServiceModernProductTemplate')),
};

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await prisma.product.findUnique({
        where: { id: params.productId },
        include: {
            business: {
                include: {
                    products: {
                        where: {
                            id: { not: params.productId },
                            inStock: true,
                        },
                        take: 4,
                    },
                },
            },
        },
    });

    if (!product || product.business.slug !== params.slug) {
        notFound();
    }

    const { business, business: { products: relatedProducts } } = product;

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Hi! I want to order "${product.name}" from ${business.name}.`
    )}`;

    const TemplateComponent = templateMap[business.templateType] || templateMap['minimal'];

    return (
        <TemplateComponent 
            product={product} 
            business={business} 
            relatedProducts={relatedProducts} 
            waLink={waLink} 
            waNumber={waNumber} 
        />
    );
}
