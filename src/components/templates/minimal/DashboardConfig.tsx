'use client';

export default function MinimalDashboardConfig({ business }: { business: any }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm">
      <h3 className="text-xl font-bold text-surface-900 mb-6">Minimal Template Settings</h3>
      <p className="text-surface-600 mb-6">
        Configure settings specific to the Minimal E-Commerce template.
      </p>
      
      <div className="space-y-6">
        {/* Placeholder for future minimal-specific settings (e.g. layout toggle, hover effects) */}
        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
          <p className="text-sm text-surface-500 italic">No specific configuration available yet for this template.</p>
        </div>
      </div>
    </div>
  );
}
