'use client';

import { useEffect, useState } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES, ECOMMERCE_SUBCATEGORIES, TemplateCategory, TemplateSubcategory } from '@/lib/templates';

export default function TemplatesPage() {
  const [business, setBusiness] = useState<any>(null);
  const [selected, setSelected] = useState('minimal');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<TemplateSubcategory | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [aiSaved, setAiSaved] = useState(false);

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
              setActiveCategory(t.category as TemplateCategory);
              if (t.subcategory) setActiveSubcategory(t.subcategory as TemplateSubcategory);
            }
          }
        }
      });
  }, []);

  const handleSave = async (isAi: boolean) => {
    if (!business) return;
    setSaving(true);
    setShowModal(false);

    try {
      if (isAi) {
        const res = await fetch(`/api/business/${business.id}/generate-template`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateId: selected })
        });
        if (res.ok) {
          setAiSaved(true);
          setTimeout(() => setAiSaved(false), 5000);
        } else {
          alert("Failed to generate template content using AI.");
        }
      } else {
        const formData = new FormData();
        formData.append('templateType', selected);
        const res = await fetch(`/api/business/${business.id}`, {
          method: 'PUT',
          body: formData
        });
        if (res.ok) {
          setSaved(true);
          setTimeout(() => setSaved(false), 5000);
        } else {
          alert("Failed to update template.");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (activeCategory === 'Retail' && activeSubcategory !== 'all') {
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

      {/* Subcategory Navigation for Retail */}
      {activeCategory === 'Retail' && (
        <div className="flex gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeSubcategory === 'all'
                ? 'bg-surface-800 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            All Retail
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
              {template.preview.startsWith('http') || template.preview.startsWith('/') ? (
                <img src={template.preview} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{template.preview}</span>
              )}
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-surface-200 p-4 z-50 md:ml-64">
        <div className="max-w-6xl mx-auto flex items-center justify-end gap-4 pr-4">
          {aiSaved && <span className="text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg">✨ AI generated all copy & media successfully! Head to Config to review.</span>}
          {saved && <span className="text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg">✅ Template applied! Fill content in Template Config.</span>}
          {!business && <span className="text-surface-400 text-sm">Create a business first to apply templates</span>}
          <button
            onClick={() => setShowModal(true)}
            disabled={saving || !business}
            className="btn-primary px-8 py-2.5 shadow-md hover:shadow-lg transition-all"
          >
            {saving ? '⏳ Setting up...' : 'Save & Apply Template'}
          </button>
        </div>
      </div>

      {/* AI vs Manual Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-surface-150 mx-4">
            <div className="text-center">
              <span className="text-4xl">🎨</span>
              <h3 className="text-xl font-black text-surface-900 mt-4">Template Setup Choice</h3>
              <p className="text-sm text-surface-500 mt-2 leading-relaxed">
                You selected <strong>{TEMPLATES.find(t => t.id === selected)?.name}</strong>.<br />
                How would you like to set up the content for this template?
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => handleSave(true)}
                className="w-full py-3.5 bg-[#166534] hover:bg-[#15803d] text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                ✨ Auto-Generate with AI
              </button>
              <button
                onClick={() => handleSave(false)}
                className="w-full py-3.5 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl font-bold transition-all border border-surface-200"
              >
                ✍️ Setup Manually (Self)
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 text-surface-400 hover:text-surface-600 text-sm font-semibold transition-all mt-2"
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
