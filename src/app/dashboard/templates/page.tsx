'use client';

import { useEffect, useState } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES, ECOMMERCE_SUBCATEGORIES, TemplateCategory, TemplateSubcategory } from '@/lib/templates';

export default function TemplatesPage() {
  const [business, setBusiness] = useState<any>(null);
  const [selected, setSelected] = useState('minimal');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [yarranModalOpen, setYarranModalOpen] = useState(false);
  const [yarranInput, setYarranInput] = useState('');
  const [generatingAi, setGeneratingAi] = useState(false);

  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('general');
  const [activeSubcategory, setActiveSubcategory] = useState<TemplateSubcategory | 'all'>('all');

  useEffect(() => {
    fetch('/api/business/me')
      .then(r => r.json())
      .then(d => {
        if (d.business) {
          setBusiness(d.business);
          if (d.business.templateType) {
            setSelected(d.business.templateType);
            // Auto-select category based on current template
            const t = TEMPLATES.find(x => x.id === d.business.templateType);
            if (t) {
              setActiveCategory(t.category);
              if (t.subcategory) setActiveSubcategory(t.subcategory);
            }
          }
        }
      });
  }, []);

  const handleSave = async () => {
    if (!business) return;

    if (selected === 'yarran' && business.templateType !== 'yarran') {
      setYarranModalOpen(true);
      return;
    }

    await saveTemplate(selected);
  };

  const saveTemplate = async (templateId: string, extraData?: any) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('templateType', templateId);
    
    if (extraData) {
      if (extraData.vision) formData.append('vision', extraData.vision);
      if (extraData.about) formData.append('about', extraData.about);
    }

    const res = await fetch(`/api/business/${business.id}`, {
      method: 'PUT',
      body: formData,
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleYarranSubmit = async (useAi: boolean) => {
    setYarranModalOpen(false);
    if (useAi) {
      setGeneratingAi(true);
      try {
        const aiPrompt = `Generate a short mission statement (vision) and a brief about description (about) for a specialty business in the insurance/services industry. Business Name: ${business?.name}.`;
        const aiResponse = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: aiPrompt })
        });
        
        let vision = "Demand Excellence.";
        let about = "Built on the belief that algorithms can't replace experience. We partner with you for the long term.";
        
        if (aiResponse.ok) {
           const data = await aiResponse.json();
           if (data.text) {
             about = data.text;
           }
        }
        await saveTemplate('yarran', { vision, about });
      } catch (e) {
        console.error('AI Error', e);
        await saveTemplate('yarran');
      }
      setGeneratingAi(false);
    } else {
      await saveTemplate('yarran', { about: yarranInput, vision: "Demand Excellence." });
    }
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    if (t.category !== activeCategory) return false;
    if (activeCategory === 'ecommerce' && activeSubcategory !== 'all') {
      return t.subcategory === activeSubcategory;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-24">
      <div>
        <h1 className="text-2xl font-black text-surface-900">Templates</h1>
        <p className="text-surface-500 mt-1">Choose a beautiful design for your online store</p>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-surface-200">
        <div className="flex gap-6 overflow-x-auto pb-[-1px]">
          {TEMPLATE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as TemplateCategory);
                setActiveSubcategory('all');
              }}
              className={`pb-3 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'border-b-2 border-brand-500 text-brand-600'
                  : 'text-surface-500 hover:text-surface-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Navigation for E-Commerce */}
      {activeCategory === 'ecommerce' && (
        <div className="flex gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeSubcategory === 'all'
                ? 'bg-surface-800 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            All E-Commerce
          </button>
          {ECOMMERCE_SUBCATEGORIES.map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id as TemplateSubcategory)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeSubcategory === sub.id
                  ? 'bg-surface-800 text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => setSelected(template.id)}
            className={`card p-5 text-left transition-all hover:shadow-lg flex flex-col ${selected === template.id
                ? 'border-2 border-brand-500 shadow-md bg-brand-50/20'
                : 'border border-surface-200 hover:border-surface-300'
              }`}
          >
            {/* Preview */}
            <div className="h-48 rounded-xl mb-5 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200 w-full group">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{template.preview}</span>
              <div className="absolute top-3 right-3 flex gap-1.5">
                {template.colors.map((c, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              {selected === template.id && (
                <div className="absolute inset-0 bg-brand-500/10 flex items-end justify-end p-3">
                  <div className="bg-brand-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm">✓</div>
                </div>
              )}
            </div>

            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-surface-900 leading-tight">{template.name}</h3>
              {template.tag && (
                <span className="badge bg-brand-100 text-brand-700 text-[10px] uppercase font-bold tracking-wider ml-2 flex-shrink-0">
                  {template.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-surface-500 leading-relaxed flex-grow">{template.desc}</p>

            {business && (
              <a
                href={`/store/${business.slug}?template=${template.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="mt-5 text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
              >
                Live Preview <span className="text-lg">→</span>
              </a>
            )}
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 text-surface-400">
          <span className="text-4xl block mb-2">🙈</span>
          <p>No templates found in this category.</p>
        </div>
      )}

      {/* Save Footer (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-surface-200 p-4 z-40 md:ml-64">
        <div className="max-w-6xl mx-auto flex items-center justify-end gap-4 pr-4">
          {generatingAi && <span className="text-brand-600 text-sm font-bold animate-pulse">✨ AI Generating Details...</span>}
          {saved && <span className="text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg">✓ Template applied live!</span>}
          {!business && <span className="text-surface-400 text-sm">Create a business first to apply templates</span>}
          <button
            onClick={handleSave}
            disabled={saving || generatingAi || !business}
            className="btn-primary px-8 py-2.5 shadow-md hover:shadow-lg transition-all"
          >
            {saving ? 'Saving...' : 'Apply Template'}
          </button>
        </div>
      </div>

      {/* Yarran Details Modal */}
      {yarranModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Yarran Template Details</h2>
            <p className="text-surface-500 mb-6 text-sm">
              This premium layout requires detailed company mission and service descriptions to look its best.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Enter Details Manually (Optional)</label>
              <textarea 
                value={yarranInput}
                onChange={(e) => setYarranInput(e.target.value)}
                placeholder="We specialize in..."
                className="w-full border border-surface-200 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleYarranSubmit(true)}
                className="w-full bg-brand-500 text-white rounded-lg py-3 font-bold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>✨</span> Let AI Generate Details
              </button>
              
              <button 
                onClick={() => handleYarranSubmit(false)}
                disabled={!yarranInput.trim()}
                className="w-full bg-surface-100 text-surface-700 rounded-lg py-3 font-bold hover:bg-surface-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Manual Input
              </button>
              
              <button 
                onClick={() => setYarranModalOpen(false)}
                className="w-full text-surface-500 rounded-lg py-2 text-sm font-semibold hover:text-surface-700 transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
