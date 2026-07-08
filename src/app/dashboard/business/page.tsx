'use client';

import { useEffect, useState } from 'react';
import { getStoreUrl } from '@/lib/utils';

const CATEGORIES = [
  'Food & Beverages', 'Clothing & Fashion', 'Electronics', 'Home & Kitchen',
  'Health & Beauty', 'Grocery', 'Books & Stationery', 'Sports & Fitness',
  'Toys & Games', 'Jewelry', 'Handicrafts', 'Other'
];

export default function BusinessPage() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'contact'>('general');

  const [form, setForm] = useState({
    name: '', description: '', whatsappNumber: '', location: '', category: '', vision: '', mission: '', templateType: 'minimal',
    headline: '', tagline: '', about: '', marketingDesc: '',
    faviconUrl: '', ctaText: '', phoneNumber: '', email: '', instagramUrl: '', facebookUrl: '', websiteUrl: '',
    primaryColor: '', secondaryColor: '', footerText: '', copyrightText: ''
  });

  useEffect(() => {
    fetch('/api/business/me')
      .then(r => r.json())
      .then(d => {
        if (d.business) {
          setBusiness(d.business);
          setForm({
            name: d.business.name || '',
            description: d.business.description || '',
            whatsappNumber: d.business.whatsappNumber || '',
            location: d.business.location || '',
            category: d.business.category || '',
            vision: d.business.vision || '',
            mission: d.business.mission || '',
            templateType: d.business.templateType || 'minimal',
            headline: d.business.headline || '',
            tagline: d.business.tagline || '',
            about: d.business.about || '',
            marketingDesc: d.business.marketingDesc || '',
            faviconUrl: d.business.faviconUrl || '',
            ctaText: d.business.ctaText || '',
            phoneNumber: d.business.phoneNumber || '',
            email: d.business.email || '',
            instagramUrl: d.business.instagramUrl || '',
            facebookUrl: d.business.facebookUrl || '',
            websiteUrl: d.business.websiteUrl || '',
            primaryColor: d.business.primaryColor || '#000000',
            secondaryColor: d.business.secondaryColor || '#ffffff',
            footerText: d.business.footerText || '',
            copyrightText: d.business.copyrightText || '',
          });
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = business ? 'PUT' : 'POST';
    const url = business ? `/api/business/${business.id}` : '/api/business';

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const logoInput = document.getElementById('logo') as HTMLInputElement;
    if (logoInput && logoInput.files?.[0]) {
      formData.append('logo', logoInput.files[0]);
    }

    const faviconInput = document.getElementById('favicon') as HTMLInputElement;
    if (faviconInput && faviconInput.files?.[0]) {
      formData.append('favicon', faviconInput.files[0]);
    }

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setBusiness(data.business);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleRegenerateAI = async () => {
    if (!business) return;
    setGenerating(true);
    const res = await fetch(`/api/business/${business.id}/regenerate`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      setBusiness({ ...business, ...data.content });
      setForm(prev => ({ ...prev, ...data.content }));
    }
    setGenerating(false);
  };

  if (loading) {
    return <div className="space-y-4 animate-pulse max-w-4xl mx-auto">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-surface-200 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-24">
      <div>
        <h1 className="text-2xl font-black text-surface-900">Business Profile</h1>
        <p className="text-surface-500 mt-1">
          {business ? 'Manage your store information and branding' : 'Create your business profile to get started'}
        </p>
      </div>

      {business && (
        <div className="flex gap-4 border-b border-surface-200 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'general' ? 'border-b-2 border-brand-500 text-brand-600' : 'text-surface-500 hover:text-surface-900'}`}
          >
            General Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'branding' ? 'border-b-2 border-brand-500 text-brand-600' : 'text-surface-500 hover:text-surface-900'}`}
          >
            Branding & Design
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'contact' ? 'border-b-2 border-brand-500 text-brand-600' : 'text-surface-500 hover:text-surface-900'}`}
          >
            Contact & Social
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-8 space-y-8">
        
        {/* TAB: GENERAL */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Business Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Sharma Kirana Store" className="input-field" />
              </div>
              <div>
                <label className="label">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="input-field">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Headline (Hero Section)</label>
                <input type="text" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} placeholder="Catchy title for your store" className="input-field" />
              </div>
              <div>
                <label className="label">Tagline (Sub Heading)</label>
                <input type="text" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Short descriptive subtitle" className="input-field" />
              </div>
            </div>

            <div>
              <label className="label">Business Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tell us about your business..." rows={3} className="input-field resize-none" />
            </div>

            <div>
              <label className="label">Our Story (About Us)</label>
              <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="The story behind your brand..." rows={4} className="input-field resize-none" />
            </div>

            {!business && (
              <div>
                <label className="label">Location / City</label>
                <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Lajpat Nagar, Delhi" className="input-field" />
              </div>
            )}
          </div>
        )}

        {/* TAB: BRANDING */}
        {activeTab === 'branding' && business && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Brand Logo</label>
                <input type="file" id="logo" accept="image/*" className="input-field" />
                {business.logoUrl && <p className="text-xs text-brand-600 mt-1">✓ Logo uploaded</p>}
              </div>
              <div>
                <label className="label">Favicon (Browser Icon)</label>
                <input type="file" id="favicon" accept="image/*" className="input-field" />
                {business.faviconUrl && <p className="text-xs text-brand-600 mt-1">✓ Favicon uploaded</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Primary Color</label>
                <div className="flex gap-3">
                  <input type="color" value={form.primaryColor} onChange={e => setForm({ ...form, primaryColor: e.target.value })} className="w-12 h-12 rounded-lg cursor-pointer" />
                  <input type="text" value={form.primaryColor} onChange={e => setForm({ ...form, primaryColor: e.target.value })} placeholder="#000000" className="input-field flex-1" />
                </div>
              </div>
              <div>
                <label className="label">Secondary Color</label>
                <div className="flex gap-3">
                  <input type="color" value={form.secondaryColor} onChange={e => setForm({ ...form, secondaryColor: e.target.value })} className="w-12 h-12 rounded-lg cursor-pointer" />
                  <input type="text" value={form.secondaryColor} onChange={e => setForm({ ...form, secondaryColor: e.target.value })} placeholder="#ffffff" className="input-field flex-1" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">CTA Button Text</label>
                <input type="text" value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} placeholder="e.g. Shop Now, Order on WhatsApp" className="input-field" />
              </div>
              <div>
                <label className="label">Copyright Text</label>
                <input type="text" value={form.copyrightText} onChange={e => setForm({ ...form, copyrightText: e.target.value })} placeholder="© 2024 DukaanHai. All rights reserved." className="input-field" />
              </div>
            </div>

            <div>
              <label className="label">Footer Text (Small description at bottom)</label>
              <textarea value={form.footerText} onChange={e => setForm({ ...form, footerText: e.target.value })} placeholder="Thank you for shopping with us!" rows={2} className="input-field resize-none" />
            </div>
            
            <div className="p-4 bg-brand-50 border border-brand-100 rounded-xl mt-4">
              <p className="text-sm text-brand-800 font-medium">💡 Tip: You can change your active template on the <strong>Templates</strong> page.</p>
            </div>
          </div>
        )}

        {/* TAB: CONTACT */}
        {activeTab === 'contact' && business && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">WhatsApp Number</label>
                <input type="tel" value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="+91 98765 43210" className="input-field" />
              </div>
              <div>
                <label className="label">Phone Number (Calling)</label>
                <input type="tel" value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} placeholder="+91 98765 43210" className="input-field" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@store.com" className="input-field" />
              </div>
              <div>
                <label className="label">Physical Address / Location</label>
                <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Lajpat Nagar, Delhi" className="input-field" />
              </div>
            </div>

            <hr className="border-surface-100" />
            <h3 className="font-bold text-surface-900">Social Links</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Instagram URL</label>
                <input type="url" value={form.instagramUrl} onChange={e => setForm({ ...form, instagramUrl: e.target.value })} placeholder="https://instagram.com/yourstore" className="input-field" />
              </div>
              <div>
                <label className="label">Facebook URL</label>
                <input type="url" value={form.facebookUrl} onChange={e => setForm({ ...form, facebookUrl: e.target.value })} placeholder="https://facebook.com/yourstore" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Website URL (Optional)</label>
                <input type="url" value={form.websiteUrl} onChange={e => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://yourstore.com" className="input-field" />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : business ? 'Save Changes' : 'Create Business'}
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1 animate-fade-in">
              ✓ Saved successfully
            </span>
          )}
        </div>
      </form>

      {/* AI Content & Links Section */}
      {business && activeTab === 'general' && (
        <div className="card p-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-surface-900">AI Store Details</h2>
              <p className="text-sm text-surface-500">Auto-generated content for your store</p>
            </div>
            <button type="button" onClick={handleRegenerateAI} disabled={generating} className="btn-secondary text-sm">
              {generating ? '⏳ Regenerating...' : '🤖 Regenerate with AI'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-surface-500 uppercase mb-1">Vision</p>
              <p className="text-sm text-surface-900">{business.vision || 'Not generated yet'}</p>
            </div>
            <div className="bg-surface-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-surface-500 uppercase mb-1">Mission</p>
              <p className="text-sm text-surface-900">{business.mission || 'Not generated yet'}</p>
            </div>
            <div className="bg-surface-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-surface-500 uppercase mb-1">Marketing Hook</p>
              <p className="text-sm text-surface-900">{business.marketingDesc || 'Not generated yet'}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Your Store Link</p>
              <a href={getStoreUrl(business.slug)} target="_blank" className="font-mono text-sm text-brand-600 hover:text-brand-700 transition-colors font-bold">
                {getStoreUrl(business.slug)}
              </a>
            </div>
            <a href={getStoreUrl(business.slug)} target="_blank" className="btn-secondary text-sm px-4 py-2">
              Visit Store ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
