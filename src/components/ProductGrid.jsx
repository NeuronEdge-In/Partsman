import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './Cards.jsx';
import { Package, ChevronDown } from './Icons.jsx';

const PAGE = 24;
const SORTS = { relevance: 'Relevance', az: 'Name A–Z', za: 'Name Z–A' };

export default function ProductGrid({ items, emptyText = 'No parts match these filters.' }) {
  const [sort, setSort] = useState('relevance');
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => { setLimit(PAGE); }, [items]);
  const sorted = useMemo(() => {
    const a = [...items];
    if (sort === 'az') a.sort((x, y) => x.name.localeCompare(y.name));
    if (sort === 'za') a.sort((x, y) => y.name.localeCompare(x.name));
    return a;
  }, [items, sort]);
  const shown = sorted.slice(0, limit);

  if (!items.length) return <div className="empty"><Package /><b>Nothing here yet</b>{emptyText}</div>;
  return (
    <>
      <div className="toolbar" style={{ marginBottom: 14 }}>
        <span className="count">Showing <b>{shown.length}</b> of <b>{items.length}</b> parts</span>
        <div className="select" style={{ width: 180 }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" style={{ height: 40 }}>
            {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select><ChevronDown />
        </div>
      </div>
      <div className="grid grid-4">
        {shown.map((p, i) => (
          <motion.div key={p.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: Math.min((i % PAGE) * .035, .6), ease: [0.22, 1, 0.36, 1] }}>
            <ProductCard p={p} />
          </motion.div>
        ))}
      </div>
      {limit < sorted.length && (
        <div className="text-center" style={{ marginTop: 30 }}>
          <button className="btn btn-outline btn-lg" onClick={() => setLimit((l) => l + PAGE)}>Load more ({sorted.length - limit} remaining)</button>
        </div>
      )}
    </>
  );
}
