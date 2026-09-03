import { Link } from 'react-router-dom';
import { modelMap, categoryMap } from '../data/catalog.js';
import { productEnquiryLink } from '../data/company.js';
import { ArrowUpRight, BadgeCheck, WhatsApp, Search } from './Icons.jsx';
import { withBase } from '../utils/assets.js';

export function ProductCard({ p }) {
  const model = modelMap[p.primaryModel];
  return (
    <div className="card pcard">
      <Link to={`/product/${p.slug}`} className="pcard-media" aria-label={p.name}>
        <img src={p.thumb} alt={p.name} loading="lazy" onError={(e) => { e.currentTarget.src = withBase('/images/placeholder.svg'); }} />
        <span className="badge badge-brand"><BadgeCheck />Quality assured</span>
        <span className="quick"><Search /></span>
      </Link>
      <div className="pcard-body">
        <span className="pcard-model">{model?.short || p.modelName}</span>
        <Link to={`/product/${p.slug}`} className="pcard-name">{p.name}</Link>
        <div className="pcard-foot">
          <span className="sku">{p.sku}</span>
          <a className="enq" href={productEnquiryLink(p)} target="_blank" rel="noreferrer"><WhatsApp />Enquire</a>
        </div>
      </div>
    </div>
  );
}

export function CategoryCard({ c }) {
  return (
    <Link to={`/category/${c.slug}`} className="card ccard">
      <div className="ccard-img"><img src={c.image} alt={c.short} loading="lazy" /></div>
      <b>{c.short}</b>
      <small>{c.count} parts</small>
    </Link>
  );
}

export function ModelCard({ m }) {
  return (
    <Link to={`/model/${m.slug}`} className="card mcard" style={{ '--mc-accent': m.accent }}>
      <span className="arrow"><ArrowUpRight /></span>
      <div className="mcard-media"><img src={m.image} alt={m.short} loading="lazy" /></div>
      <div className="mcard-body">
        <div><b>{m.short}</b><small>{m.tag}</small></div>
        <span className="count">{m.count} parts</span>
      </div>
    </Link>
  );
}

export { categoryMap };
