'use client';

export default function ServiceModernDashboardConfig({ business }: { business: any }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm">
      <h3 className="text-xl font-bold text-surface-900 mb-6">Service Modern Settings</h3>
      <p className="text-surface-600 mb-6">
        Configure settings specific to the Service Modern template.
      </p>
      
      <div className="space-y-6">
        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
           <label className="flex items-center justify-between cursor-pointer">
             <div>
               <span className="block font-semibold text-surface-900">Enable WhatsApp Booking</span>
               <span className="block text-sm text-surface-500">Allow customers to request service quotes via WhatsApp.</span>
             </div>
             <div className="relative">
               <input type="checkbox" className="sr-only" defaultChecked />
               <div className="block bg-brand-500 w-14 h-8 rounded-full"></div>
               <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
             </div>
           </label>
        </div>
      </div>
    </div>
  );
}
