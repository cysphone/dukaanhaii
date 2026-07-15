'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getTemplateById } from '@/lib/templates';

import GenericDashboardConfig from '@/components/dashboard/GenericDashboardConfig';

// Pre-define dynamic imports for older dashboard configs
const MinimalDashboardConfig = dynamic(() => import('@/components/templates/minimal/DashboardConfig'), {
  loading: () => <p className="animate-pulse text-surface-500">Loading Minimal config...</p>,
});

const ServiceModernDashboardConfig = dynamic(() => import('@/components/templates/service-modern/DashboardConfig'), {
  loading: () => <p className="animate-pulse text-surface-500">Loading Service Modern config...</p>,
});

export default function ConfigPage() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business/me')
      .then(res => res.json())
      .then(data => {
        if (data.business) setBusiness(data.business);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!business) {
    return <div className="text-center py-20 text-surface-500">No active business found.</div>;
  }

  const template = getTemplateById(business.templateType);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-surface-900">Template Configuration</h1>
        <p className="text-surface-500 mt-2">
          Customize specific settings for your active template ({template?.name || 'Unknown'}).
        </p>
      </div>

      <div className="mt-6">
        {business.templateType === 'minimal' && <MinimalDashboardConfig business={business} />}
        {business.templateType === 'service-modern' && <ServiceModernDashboardConfig business={business} />}
        
        {/* If the template has defined sections, use the Generic Dashboard Config */}
        {template?.sections && template.sections.length > 0 && (
          <GenericDashboardConfig business={business} template={template} />
        )}
        
        {!['minimal', 'service-modern'].includes(business.templateType) && (!template?.sections || template.sections.length === 0) && (
           <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm text-center">
             <p className="text-surface-500">This template does not have specific configuration settings yet.</p>
           </div>
        )}
      </div>
    </div>
  );
}
