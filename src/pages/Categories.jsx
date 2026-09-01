import PageHead from '../components/PageHead.jsx';
import { StaggerGrid, StaggerItem } from '../components/Reveal.jsx';
import { CategoryCard } from '../components/Cards.jsx';
import { categories, stats, getCategory } from '../data/catalog.js';

export default function Categories() {
  return (
    <>
      <PageHead eyebrow="Shop by part" title="Parts categories" lead={`${stats.products}+ truck body parts organised into ${stats.categories} categories, from bumpers to water channels.`} crumbs={[{ label: 'Parts categories' }]} image={getCategory('truck-bumpers')?.image} />
      <section className="section-tight">
        <div className="container">
          <StaggerGrid className="grid grid-5">
            {categories.map((c) => <StaggerItem key={c.slug}><CategoryCard c={c} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
