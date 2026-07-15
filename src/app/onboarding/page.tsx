'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CATEGORIES = ['Retail', 'Services', 'Single Page'];
const TEMPLATE_MAP: Record<string, string> = {
  'Retail': 'ecommerce-multipage-v1',
  'Services': 'service-multipage-v1',
  'Single Page': 'singlepage-v1'
};

export default function OnboardingWizard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    useAi: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (useAi: boolean) => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Create Business
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('templateType', TEMPLATE_MAP[formData.category] || 'ecommerce-multipage-v1');

      const res = await fetch('/api/business', {
        method: 'POST',
        body: data
      });

      if (!res.ok) throw new Error('Failed to create business');
      
      const { business } = await res.json();

      // 2. Generate Template if AI selected
      if (useAi) {
        const tRes = await fetch(`/api/business/${business.id}/generate-template`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            templateId: TEMPLATE_MAP[formData.category] || 'ecommerce-multipage-v1'
          })
        });
        if (!tRes.ok) throw new Error('Failed to generate template content');
      }

      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
      setLoading(false);
      setStep(1); // Go back if error
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-surface-400 mb-2 px-2">
            <span className={step >= 1 ? 'text-brand-500' : ''}>Store Details</span>
            <span className={step >= 2 ? 'text-brand-500' : ''}>Template</span>
            <span className={step >= 3 ? 'text-brand-500' : ''}>Finish</span>
          </div>
          <div className="h-2 w-full bg-surface-800 rounded-full overflow-hidden flex">
            <div className={`h-full bg-brand-500 transition-all duration-500 ease-out`} style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        <div className="bg-surface-900 border border-surface-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {loading && (
            <div className="absolute inset-0 bg-surface-900/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-surface-800 border-t-brand-500 rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Building Your Store</h3>
              <p className="text-surface-400 text-center max-w-xs">
                {formData.useAi ? "Our AI is crafting beautiful, customized content for you..." : "Setting up your template..."}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black text-white mb-2">Let's set up your store</h2>
              <p className="text-surface-400 mb-8">Tell us a bit about your business so we can tailor the experience.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-surface-300 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="My Awesome Store"
                    className="w-full bg-surface-950 border border-surface-700 text-white placeholder:text-surface-600 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-300 mb-2">Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                          formData.category === cat 
                            ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                            : 'bg-surface-950 border-surface-700 text-surface-400 hover:border-surface-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-300 mb-2">Short Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="We sell the best handcrafted coffee in Mumbai..."
                    rows={3}
                    className="w-full bg-surface-950 border border-surface-700 text-white placeholder:text-surface-600 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.category}
                  className="w-full btn-primary py-4 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <button onClick={handleBack} className="text-surface-400 hover:text-white mb-6 text-sm flex items-center gap-1">
                ← Back
              </button>
              <h2 className="text-3xl font-black text-white mb-2">Template Selected</h2>
              <p className="text-surface-400 mb-8">Based on your category, we've selected the perfect premium layout.</p>
              
              <div className="bg-surface-950 border border-brand-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent" />
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{TEMPLATE_MAP[formData.category]}</h3>
                <p className="text-surface-400 relative z-10">A fully responsive, multi-page structure optimized for conversion.</p>
              </div>

              <button onClick={handleNext} className="w-full btn-primary py-4 text-lg">
                Continue to Content
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <button onClick={handleBack} className="text-surface-400 hover:text-white mb-6 text-sm flex items-center gap-1">
                ← Back
              </button>
              <h2 className="text-3xl font-black text-white mb-2">Content Generation</h2>
              <p className="text-surface-400 mb-8">How would you like to populate your new site?</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => { setFormData({...formData, useAi: true}); handleSubmit(true); }}
                  className="text-left bg-gradient-to-br from-brand-900/40 to-surface-950 border border-brand-500/50 p-6 rounded-2xl hover:border-brand-400 transition-all group"
                >
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">✨ Auto-Generate with AI</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">Let our AI write professional, conversion-optimized copy for your entire site instantly based on your description.</p>
                </button>

                <button 
                  onClick={() => { setFormData({...formData, useAi: false}); handleSubmit(false); }}
                  className="text-left bg-surface-950 border border-surface-700 p-6 rounded-2xl hover:border-surface-600 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">✏️ Start with Blank Canvas</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">Give me the raw template structure. I'll write my own headlines and content manually.</p>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
