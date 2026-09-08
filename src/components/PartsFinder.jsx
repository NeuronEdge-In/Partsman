import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BRANDS, categories, modelsForBrand } from '../data/catalog.js';
import { Search, ChevronDown, Wrench } from './Icons.jsx';

export default function PartsFinder({ compact = false }) {
  const [sp] = useSearchParams();
  const [brand, setBrand] = useState(sp.get('brand') || '');
  const [model, setModel] = useState(sp.get('model') || '');
  const [category, setCategory] = useState(sp.get('category') || '');
  const nav = useNavigate();
  const models = useMemo(() => (brand ? modelsForBrand(brand) : []), [brand]);

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (brand) q.set('brand', brand);
    if (model) q.set('model', model);
    if (category) q.set('category', category);
    if (model && !category) return nav(`/model/${model}`);
    if (category && !brand && !model) return nav(`/category/${category}`);
    nav(`/search?${q.toString()}`);
  };

  return (
    <form className="finder" onSubmit={submit}>
      {!compact && (
        <div className="finder-title">
          <div className="fi"><Wrench /></div>
          <div><b>Find your part</b><small>Select vehicle → part type</small></div>
        </div>
      )}
      <div className="field">
        <label>Vehicle brand</label>
        <div className="select">
          <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }}>
            <option value="">All brands</option>
            {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select><ChevronDown />
        </div>
      </div>
      <div className="field">
        <label>Vehicle model</label>
        <div className="select">
          <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
            <option value="">{brand ? 'All models' : 'Select brand first'}</option>
            {models.map((m) => <option key={m.slug} value={m.slug}>{m.short}</option>)}
          </select><ChevronDown />
        </div>
      </div>
      <div className="field">
        <label>Part category</label>
        <div className="select">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.short}</option>)}
          </select><ChevronDown />
        </div>
      </div>
      <button className="btn btn-primary" type="submit"><Search />Search parts<span className="shine" /></button>
    </form>
  );
}
