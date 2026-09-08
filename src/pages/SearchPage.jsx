import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import PartsFinder from '../components/PartsFinder.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBox from '../components/SearchBox.jsx';
import { searchProducts, BRANDS, modelMap, categoryMap } from '../data/catalog.js';

export default function SearchPage() {
  const [sp] = useSearchParams();
  const q = sp.get('q') || '', brand = sp.get('brand') || '', model = sp.get('model') || '', category = sp.get('category') || '';
  const items = useMemo(() => searchProducts({ q, brand, model, category }), [q, brand, model, category]);
  const filters = [brand && BRANDS.find((b) => b.id === brand)?.name, model && modelMap[model]?.short, category && categoryMap[category]?.short].filter(Boolean);
  const title = q ? `Results for “${q}”` : filters.length ? filters.join(' · ') : 'All parts';

  return (
    <>
      <PageHead eyebrow="Search" title={title} lead={`${items.length} part${items.length === 1 ? '' : 's'} found${filters.length && q ? ` in ${filters.join(' · ')}` : ''}.`} crumbs={[{ label: 'Search' }]}>
        <div style={{ marginTop: 22, maxWidth: 560 }}><SearchBox showKbd={false} placeholder="Refine your search…" /></div>
      </PageHead>
      <section className="section-tight">
        <div className="container">
          <div style={{ marginBottom: 28 }}><PartsFinder compact /></div>
          <ProductGrid items={items} emptyText="Try a different spelling, a model name like “Signa”, or ask us on WhatsApp." />
        </div>
      </section>
    </>
  );
}
