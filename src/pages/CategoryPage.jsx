import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import NotFound from './NotFound.jsx';
import { getCategory, productsForCategory, modelMap, categories, BRANDS } from '../data/catalog.js';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const all = useMemo(() => (category ? productsForCategory(slug) : []), [slug, category]);
  const modelCounts = useMemo(() => {
    const m = new Map();
    all.forEach((p) => p.models.forEach((s) => m.set(s, (m.get(s) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [all]);
  if (!category) return <NotFound />;
  const items = all.filter((p) => (!brand || p.brand === brand) && (!model || p.models.includes(model)));
  const brandsHere = BRANDS.filter((b) => all.some((p) => p.brand === b.id));

  return (
    <>
      <PageHead eyebrow="Parts category" title={category.short} lead={category.description || `Reliable, durable ${category.short.toLowerCase()} for TATA, Leyland, Eicher, BharatBenz and SML commercial vehicles.`} crumbs={[{ label: 'Parts categories', to: '/categories' }, { label: category.short }]} image={category.image} />
      <section className="section-tight">
        <div className="container">
          <div className="side-layout">
            <aside className="sidebar">
              <div className="card">
                <h4>Vehicle model</h4>
                <div className="side-list">
                  <a href="#" className={!model ? 'active' : ''} onClick={(e) => { e.preventDefault(); setModel(''); }}>All models <span>{all.length}</span></a>
                  {modelCounts.map(([s, n]) => <a href="#" key={s} className={model === s ? 'active' : ''} onClick={(e) => { e.preventDefault(); setModel(s); setBrand(''); }}>{modelMap[s]?.short || s} <span>{n}</span></a>)}
                </div>
              </div>
              <div className="card">
                <h4>Other categories</h4>
                <div className="side-list">{categories.filter((c) => c.slug !== slug).slice(0, 10).map((c) => <Link key={c.slug} to={`/category/${c.slug}`}>{c.short} <span>{c.count}</span></Link>)}</div>
              </div>
            </aside>
            <div>
              <div className="chips-scroll" style={{ marginBottom: 16 }}>
                <div className="chips">
                  <button className={`chip ${!brand && !model ? 'active' : ''}`} onClick={() => { setBrand(''); setModel(''); }}>All brands</button>
                  {brandsHere.map((b) => <button key={b.id} className={`chip ${brand === b.id ? 'active' : ''}`} onClick={() => { setBrand(b.id); setModel(''); }}>{b.name}</button>)}
                </div>
              </div>
              <ProductGrid items={items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
