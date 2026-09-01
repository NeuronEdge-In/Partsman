import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal.jsx';
import { ProductCard } from '../components/Cards.jsx';
import NotFound from './NotFound.jsx';
import { getProduct, modelMap, categoryMap, relatedProducts } from '../data/catalog.js';
import { company, productEnquiryLink } from '../data/company.js';
import { PLACEHOLDER } from '../data/assets.js';
import { WhatsApp, Phone, Mail, ChevronLeft, ChevronRight, X, Truck, Banknote, BadgeCheck, Share, Gift, ArrowRight, Maximize } from '../components/Icons.jsx';

export default function ProductPage() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setI(0); setZoom(false); if (p) document.title = `${p.name} | ${company.name}`; }, [slug, p]);
  useEffect(() => {
    if (!zoom) return;
    const k = (e) => { if (e.key === 'Escape') setZoom(false); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  if (!p) return <NotFound />;
  const model = modelMap[p.primaryModel];
  const cat = categoryMap[p.primaryCategory];
  const imgs = p.images.length ? p.images : [PLACEHOLDER];
  const next = () => setI((x) => (x + 1) % imgs.length);
  const prev = () => setI((x) => (x - 1 + imgs.length) % imgs.length);
  const related = relatedProducts(p, 8);
  const share = async () => {
    const url = window.location.href;
    try { if (navigator.share) await navigator.share({ title: p.name, url }); else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); } } catch {}
  };

  return (
    <>
      <section className="section-tight">
        <div className="container">
          <div className="product-layout">
            <motion.div className="gallery" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="gallery-main" onClick={() => setZoom(true)}>
                <span className="badge badge-brand"><BadgeCheck />Quality assured</span>
                <AnimatePresence mode="wait">
                  <motion.img key={imgs[i]} src={imgs[i]} alt={`${p.name} view ${i + 1}`} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: .3 }} onError={(e) => { e.currentTarget.src = PLACEHOLDER; }} />
                </AnimatePresence>
                {imgs.length > 1 && <>
                  <button className="gallery-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft /></button>
                  <button className="gallery-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight /></button>
                </>}
                <span className="gallery-nav" style={{ top: 'auto', bottom: 12, right: 12, transform: 'none', width: 36, height: 36 }} aria-hidden><Maximize style={{ width: 16, height: 16 }} /></span>
              </div>
              {imgs.length > 1 && (
                <div className="thumbs">
                  {imgs.map((src, k) => <button key={src} className={`thumb ${k === i ? 'active' : ''}`} onClick={() => setI(k)} aria-label={`View image ${k + 1}`}><img src={src} alt="" /></button>)}
                </div>
              )}
            </motion.div>

            <motion.div className="pinfo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1, ease: [0.22, 1, 0.36, 1] }}>
              <Breadcrumbs onSurface items={[{ label: model?.short || 'Models', to: model ? `/model/${model.slug}` : '/models' }, { label: cat?.short || 'Parts', to: cat ? `/category/${cat.slug}` : '/categories' }, { label: p.name }]} />
              <div className="pmeta">
                {model && <Link to={`/model/${model.slug}`} className="badge">{model.short}</Link>}
                {cat && <Link to={`/category/${cat.slug}`} className="badge" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>{cat.short}</Link>}
                <span className="badge badge-green"><Truck />In stock</span>
              </div>
              <h1 className="ptitle">{p.name}</h1>
              <p className="muted" style={{ fontSize: 14.5 }}>{p.title}</p>

              <div className="price-row">
                <div><b>Price on request</b><small>Best market rates · bulk discounts available</small></div>
                <a className="btn btn-wa btn-sm" href={productEnquiryLink(p)} target="_blank" rel="noreferrer"><WhatsApp />Get price</a>
              </div>

              <table className="spec-table">
                <tbody>
                  <tr><th>SKU</th><td style={{ fontFamily: 'ui-monospace, monospace' }}>{p.sku || '—'}</td></tr>
                  <tr><th>Material</th><td>{p.material || '—'}</td></tr>
                  <tr><th>Vehicle model</th><td>{model?.short || p.modelName}</td></tr>
                  <tr><th>Category</th><td>{cat?.short || '—'}</td></tr>
                  <tr><th>Brand</th><td>{company.name} aftermarket</td></tr>
                  <tr><th>Country of origin</th><td>{p.origin || 'India'}</td></tr>
                </tbody>
              </table>

              <div className="perks">
                <div className="perk"><span className="pi"><Truck /></span>Free all-India delivery</div>
                <div className="perk"><span className="pi"><Banknote /></span>Cash on delivery</div>
                <div className="perk"><span className="pi"><BadgeCheck /></span>Perfect fitment</div>
              </div>

              <div className="cta-stack">
                <a className="btn btn-wa btn-lg" href={productEnquiryLink(p)} target="_blank" rel="noreferrer"><WhatsApp />Buy now on WhatsApp<span className="shine" /></a>
                <a className="btn btn-outline" href={`tel:${company.phone}`}><Phone />Call to order</a>
                <button className="btn btn-outline" onClick={share}><Share />{copied ? 'Link copied!' : 'Share'}</button>
              </div>

              <div className="bulk"><Gift /><div><b>Bulk discount:</b> order 4 or more parts and enjoy extra savings. Ideal for garages, transporters and fleet operators.</div></div>

              {p.compatible?.length > 0 && (
                <div className="pblock">
                  <h3>Compatible variants</h3>
                  <div className="compat">{p.compatible.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              )}
              <div className="pblock">
                <h3>Product description</h3>
                <p>{p.description.replace(/Sparebix/gi, company.name)}</p>
              </div>
              {model && (
                <div className="pblock">
                  <Link to={`/model/${model.slug}`} className="btn btn-outline btn-block">View all {model.short} body parts <ArrowRight /></Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section band">
          <div className="container">
            <Reveal className="section-head">
              <div><span className="eyebrow">You may also need</span><h2 className="h2">Related {model?.short || ''} parts</h2></div>
              {model && <Link to={`/model/${model.slug}`} className="link">All {model.short} parts <ArrowRight /></Link>}
            </Reveal>
            <StaggerGrid className="grid grid-4">
              {related.map((r) => <StaggerItem key={r.slug}><ProductCard p={r} /></StaggerItem>)}
            </StaggerGrid>
          </div>
        </section>
      )}

      <AnimatePresence>
        {zoom && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(false)}>
            <button className="close" aria-label="Close" onClick={() => setZoom(false)}><X /></button>
            <motion.img src={imgs[i]} alt={p.name} initial={{ scale: .9 }} animate={{ scale: 1 }} exit={{ scale: .9 }} onClick={(e) => e.stopPropagation()} />
            {imgs.length > 1 && <>
              <button className="gallery-nav prev" style={{ left: 20 }} aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft /></button>
              <button className="gallery-nav next" style={{ right: 20 }} aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight /></button>
            </>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
