'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { getTemplateById } from '@/lib/templates';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [business, setBusiness] = useState<any>(null);

  const [form, setForm] = useState({
    name: '', price: '', description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const bizRes = await fetch('/api/business/me');
      if (!bizRes.ok) throw new Error('Failed to fetch business');
      const bizData = await bizRes.json();
      
      if (bizData.business) {
        setBusiness(bizData.business);
        const prodRes = await fetch(`/api/products?businessId=${bizData.business.id}`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData.products || []);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSaving(true);

    const formData = new FormData();
    formData.append('businessId', business.id);
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await fetch(editing ? `/api/products/${editing.id}` : '/api/products', {
      method: editing ? 'PUT' : 'POST',
      body: formData,
    });

    if (res.ok) {
      await loadProducts();
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', price: '', description: '' });
      setImageFile(null);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '',
    });
    setImageFile(null);
    setShowForm(true);
  };

  const templateCat = business ? getTemplateById(business.templateType)?.category : 'ecommerce';
  const isService = templateCat === 'service' || templateCat === 'hotel';
  const itemWord = isService ? 'Service' : 'Product';
  const itemWordPlural = isService ? 'Services' : 'Products';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-surface-900">{itemWordPlural}</h1>
          <p className="text-surface-500 mt-1">{products.length} {itemWord.toLowerCase()}{products.length !== 1 ? 's' : ''} in your catalog</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', price: '', description: '' }); setImageFile(null); }}
          className="btn-primary"
        >
          + Add {itemWord}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card p-8 border-brand-200 bg-brand-50/30">
          <h2 className="font-bold text-surface-900 mb-6">{editing ? `Edit ${itemWord}` : `Add New ${itemWord}`}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="label">{itemWord} Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder={isService ? "e.g. Graphic Design" : "e.g. Basmati Rice 5kg"}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">{isService ? 'Hourly Rate / Price (₹) *' : 'Price (₹) *'}</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  placeholder={isService ? "e.g. 500/hr" : "e.g. 450"}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label">Description <span className="text-surface-400 font-normal">(AI auto-generates if empty)</span></label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder={`${itemWord} description (or leave empty for AI to generate)...`}
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="label">{isService ? 'Cover Photo' : 'Product Image'}</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
              />
              <p className="text-xs text-surface-400 mt-1">
                {editing && editing.imageUrl && !imageFile
                  ? "A new file will replace the existing image."
                  : "Upload a JPG, PNG, or WebP image."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving...' : editing ? `Update ${itemWord}` : `Add ${itemWord}`}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-64 bg-surface-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">{isService ? '⚙️' : '📦'}</div>
          <h3 className="font-bold text-surface-900 mb-2">No {itemWord.toLowerCase()}s yet</h3>
          <p className="text-surface-500 text-sm">Add your first {itemWord.toLowerCase()} to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="card overflow-hidden group hover:shadow-md transition-all">
              {/* Image */}
              <div className="h-44 bg-surface-100 relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">{isService ? '⚙️' : '📦'}</span>
                  </div>
                )}
                {!isService && (
                  <div className={`absolute top-2 right-2 badge ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-surface-900 mb-1 truncate">{product.name}</h3>
                <p className="text-brand-600 font-black text-lg mb-2">{formatPrice(product.price)} {isService ? <span className="text-sm font-normal text-surface-500">rate</span> : ''}</p>
                {product.description && (
                  <p className="text-surface-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-surface-100">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 btn-ghost text-sm justify-center"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 btn-ghost text-sm text-red-500 hover:text-red-600 hover:bg-red-50 justify-center"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
