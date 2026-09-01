import { useState } from 'react';
import PageHead from '../components/PageHead.jsx';
import { StaggerGrid, StaggerItem } from '../components/Reveal.jsx';
import { ModelCard } from '../components/Cards.jsx';
import { models, BRANDS, getModel } from '../data/catalog.js';

export default function Models() {
  const [brand, setBrand] = useState('');
  const list = brand ? models.filter((m) => m.brand === brand) : models;
  return (
    <>
      <PageHead eyebrow="Shop by vehicle" title="All vehicle models" lead="Choose your truck to see every bumper, door, fender, pillar and panel we stock for it." crumbs={[{ label: 'Vehicle models' }]} image={getModel('tata-signa-truck-body-parts')?.image} />
      <section className="section-tight">
        <div className="container">
          <div className="toolbar">
            <div className="chips">
              <button className={`chip ${!brand ? 'active' : ''}`} onClick={() => setBrand('')}>All brands</button>
              {BRANDS.map((b) => <button key={b.id} className={`chip ${brand === b.id ? 'active' : ''}`} onClick={() => setBrand(b.id)}>{b.name}</button>)}
            </div>
            <span className="count"><b>{list.length}</b> models</span>
          </div>
          <StaggerGrid className="grid grid-4" key={brand}>
            {list.map((m) => <StaggerItem key={m.slug}><ModelCard m={m} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
