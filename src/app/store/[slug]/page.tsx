import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BoldTemplate from '@/components/templates/BoldTemplate';
import CatalogTemplate from '@/components/templates/CatalogTemplate';
import EcommerceClothingChicTemplate from '@/components/templates/EcommerceClothingChicTemplate';
import EcommerceClothingStreetTemplate from '@/components/templates/EcommerceClothingStreetTemplate';
import EcommerceFoodFreshTemplate from '@/components/templates/EcommerceFoodFreshTemplate';
import EcommerceFoodMenuTemplate from '@/components/templates/EcommerceFoodMenuTemplate';
import EcommerceTechCyberTemplate from '@/components/templates/EcommerceTechCyberTemplate';
import EcommerceTechGadgetTemplate from '@/components/templates/EcommerceTechGadgetTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import FuturisticTemplate from '@/components/templates/FuturisticTemplate';
import GymModernTemplate from '@/components/templates/GymModernTemplate';
import GymPowerTemplate from '@/components/templates/GymPowerTemplate';
import GymZenTemplate from '@/components/templates/GymZenTemplate';
import HotelBoutiqueTemplate from '@/components/templates/HotelBoutiqueTemplate';
import HotelLuxuryTemplate from '@/components/templates/HotelLuxuryTemplate';
import HotelResortTemplate from '@/components/templates/HotelResortTemplate';
import MinimalTemplate from '@/components/templates/minimal';
import PlayfulTemplate from '@/components/templates/PlayfulTemplate';
import ServiceModernTemplate from '@/components/templates/service-modern';
import PortfolioCreativeTemplate from '@/components/templates/PortfolioCreativeTemplate';
import LandingMinimalTemplate from '@/components/templates/LandingMinimalTemplate';

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

  const templateType = searchParams.template || business.templateType || 'minimal';

  const props = { business, products: business.products };

  switch (templateType) {
    case 'bold':
      return <BoldTemplate {...props} />;
    case 'catalog':
      return <CatalogTemplate {...props} />;
    case 'ecommerce-clothing-chic':
      return <EcommerceClothingChicTemplate {...props} />;
    case 'ecommerce-clothing-street':
      return <EcommerceClothingStreetTemplate {...props} />;
    case 'ecommerce-food-fresh':
      return <EcommerceFoodFreshTemplate {...props} />;
    case 'ecommerce-food-menu':
      return <EcommerceFoodMenuTemplate {...props} />;
    case 'ecommerce-tech-cyber':
      return <EcommerceTechCyberTemplate {...props} />;
    case 'ecommerce-tech-gadget':
      return <EcommerceTechGadgetTemplate {...props} />;
    case 'elegant':
      return <ElegantTemplate {...props} />;
    case 'futuristic':
      return <FuturisticTemplate {...props} />;
    case 'gym-modern':
      return <GymModernTemplate {...props} />;
    case 'gym-power':
      return <GymPowerTemplate {...props} />;
    case 'gym-zen':
      return <GymZenTemplate {...props} />;
    case 'hotel-boutique':
      return <HotelBoutiqueTemplate {...props} />;
    case 'hotel-luxury':
      return <HotelLuxuryTemplate {...props} />;
    case 'hotel-resort':
      return <HotelResortTemplate {...props} />;
    case 'playful':
      return <PlayfulTemplate {...props} />;
    case 'service-modern':
      return <ServiceModernTemplate {...props} />;
    case 'portfolio-creative':
      return <PortfolioCreativeTemplate {...props} />;
    case 'landing-minimal':
      return <LandingMinimalTemplate {...props} />;
    default:
      return <MinimalTemplate {...props} />;
  }
}
