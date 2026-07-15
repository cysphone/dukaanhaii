'use client';

import { useState } from 'react';
import { TemplateDef, TemplateSection, TemplateField } from '@/lib/templates';

export default function GenericDashboardConfig({ business, template }: { business: any, template: TemplateDef }) {
  const [config, setConfig] = useState<any>(business.templateConfig ? (typeof business.templateConfig === 'string' ? JSON.parse(business.templateConfig) : business.templateConfig) : {});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!template.sections || template.sections.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm text-center">
        <p className="text-surface-500">This template does not have specific configuration sections.</p>
      </div>
    );
  }

  const handleChange = (sectionId: string, fieldId: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [fieldId]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('templateConfig', JSON.stringify(config));
      
      const res = await fetch(`/api/business/${business.id}`, {
        method: 'PUT',
        body: formData
      });
      
      if (!res.ok) throw new Error('Failed to save');
      setMessage('✅ Configuration saved successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {template.sections.map((section) => (
        <div key={section.id} className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <h2 className="text-xl font-bold text-surface-900 mb-4">{section.name}</h2>
          <div className="space-y-4">
            {section.fields.map((field) => {
              const val = config[section.id]?.[field.id] || '';
              return (
                <div key={field.id}>
                  <label className="block text-sm font-semibold text-surface-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.description && <p className="text-xs text-surface-500 mb-2">{field.description}</p>}
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      value={val}
                      onChange={(e) => handleChange(section.id, field.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-[#166534] min-h-[100px]"
                    />
                  ) : field.type === 'image' || field.type === 'gallery' ? (
                    <div className="text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-200">
                      Currently, image uploads for the {field.label} can only be managed via the WhatsApp Bot to ensure automatic optimization. Please text your bot to update these!
                      {val && (
                         <div className="mt-2 font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap bg-white p-2 rounded border border-green-200">
                           Current: {Array.isArray(val) ? val.join(', ') : val}
                         </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleChange(section.id, field.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="px-8 py-3 bg-[#166534] text-white rounded-xl font-semibold disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
        {message && <p className="text-sm font-medium">{message}</p>}
      </div>
    </div>
  );
}
