'use client';

import { useState, useEffect } from 'react';

type PlatformSettings = {
  aiEnabled: boolean;
  aiTitleGen: boolean;
  aiDescGen: boolean;
  aiProductDesc: boolean;
  aiProductImage: boolean;
  aiAutoContent: boolean;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or fetch error');
        return res.json();
      })
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleToggle = (key: keyof PlatformSettings) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
  if (error && !settings) return <div className="p-8 text-center text-red-500">Error: {error}. You must be an admin to view this page.</div>;
  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Platform Admin Settings</h1>
      <p className="text-gray-500 mb-8">Control global AI features and automated workflows for all users.</p>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Master AI Toggle (Flow 1 vs Flow 2)</h2>
            <p className="text-sm text-gray-500 mt-1">If disabled, the platform operates entirely manually (Flow 2) and all features below are ignored.</p>
          </div>
          <ToggleSwitch checked={settings.aiEnabled} onChange={() => handleToggle('aiEnabled')} />
        </div>

        <div className={`p-6 space-y-6 ${!settings.aiEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="text-lg font-medium">Granular AI Controls</h3>
          <div className="space-y-4">
            
            <SettingRow 
              title="Store Headline Generation" 
              description="Ask users if they want AI to generate their store's SEO headline."
              checked={settings.aiTitleGen}
              onChange={() => handleToggle('aiTitleGen')}
            />
            
            <SettingRow 
              title="Store Description Generation" 
              description="Ask users if they want AI to generate their store's SEO description."
              checked={settings.aiDescGen}
              onChange={() => handleToggle('aiDescGen')}
            />

            <SettingRow 
              title="Product Description Generation" 
              description="Ask users if they want AI to write SEO descriptions for new products."
              checked={settings.aiProductDesc}
              onChange={() => handleToggle('aiProductDesc')}
            />

            <SettingRow 
              title="Product Image Enhancement" 
              description="Offer users the ability to remove backgrounds and enhance product images via AI."
              checked={settings.aiProductImage}
              onChange={() => handleToggle('aiProductImage')}
            />

            <SettingRow 
              title="Auto-Generate Taglines & Brand Content" 
              description="Automatically generate mission, vision, and taglines in the background during store setup."
              checked={settings.aiAutoContent}
              onChange={() => handleToggle('aiAutoContent')}
            />

          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
        {success && <span className="text-green-600 font-medium">? Settings saved successfully!</span>}
        {error && <span className="text-red-600 font-medium">? {error}</span>}
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }: { title: string, description: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button
      type="button"
      className={`${checked ? 'bg-green-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
    >
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}
