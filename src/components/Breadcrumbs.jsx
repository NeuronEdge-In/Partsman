import { Link } from 'react-router-dom';
import { ChevronRight, Home } from './Icons.jsx';

export default function Breadcrumbs({ items, onSurface = false }) {
  return (
    <nav className={`crumbs ${onSurface ? 'on-surface' : ''}`} aria-label="Breadcrumb">
      <Link to="/" aria-label="Home"><Home style={{ width: 15, height: 15, opacity: 1 }} /></Link>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ChevronRight />
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span className="cur">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
