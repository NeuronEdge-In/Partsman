import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import NotFound from './NotFound.jsx';
import { getModel, productsForModel, categoryMap, models } from '../data/catalog.js';
import { waLink } from '../data/company.js';
import { WhatsApp } from '../components/Icons.jsx';

export default function ModelPage() {
  const { slug } = useParams();
  const model = getModel(slug);
  const [cat, setCat] = useState('');
  const all = useMemo(() => (model ? productsForModel(slug) : []), [slug, model]);
  const cats = useMemo(() => {
    const m = new Map();
    all.forEach((p) => p.categories.forEach((c) => m.set(c, (m.get(c) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [all]);
  if (!model) return <NotFound />;
  const items = cat ? all.filter((p) => p.categories.includes(cat)) : all;
  const siblings = models.filter((m) => m.brand === model.brand && m.slug !== model.slug);

  return (
    <>
      <PageHead eyebrow={model.tag} title={`${model.short} body parts`} lead={`${all.length} aftermarket body parts for ${model.short}. Bumpers, doors, fenders, pillars, panels and more, quality assured with free all-India delivery.`} crumbs={[{ label: 'Vehicle models', to: '/models' }, { label: model.short }]} image={model.image}>
        <div style={{ marginTop: 22 }}>
          <a className="btn btn-primary" href={waLink(`Hi Partsman, I am looking for ${model.short} body parts.`)} target="_blank" rel="noreferrer"><WhatsApp />Ask about {model.short} parts<span className="shine" /></a>
        </div>
      </PageHead>
      <section className="section-tight">
        <div className="container">
          <div className="side-layout">
            <aside className="sidebar">
              <div className="card">
                <h4>Filter by category</h4>
                <div className="side-list">
                  <a href="#" className={!cat ? 'active' : ''} onClick={(e) => { e.preventDefault(); setCat(''); }}>All parts <span>{all.length}</span></a>
                  {cats.map(([c, n]) => <a href="#" key={c} className={cat === c ? 'active' : ''} onClick={(e) => { e.preventDefault(); setCat(c); }}>{categoryMap[c]?.short || c} <span>{n}</span></a>)}
                </div>
              </div>
              {siblings.length > 0 && (
                <div className="card">
                  <h4>Related models</h4>
                  <div className="side-list">{siblings.map((m) => <Link key={m.slug} to={`/model/${m.slug}`}>{m.short} <span>{m.count}</span></Link>)}</div>
                </div>
              )}
            </aside>
            <div>
              <div className="chips-scroll" style={{ marginBottom: 16 }}>
                <div className="chips">
                  <button className={`chip ${!cat ? 'active' : ''}`} onClick={() => setCat('')}>All ({all.length})</button>
                  {cats.map(([c, n]) => <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{categoryMap[c]?.short || c} ({n})</button>)}
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
