import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PartsFinder from '../components/PartsFinder.jsx';
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import { ProductCard, CategoryCard, ModelCard } from '../components/Cards.jsx';
import { models, categories, featuredProducts, stats, BRANDS } from '../data/catalog.js';
import { company, waLink } from '../data/company.js';
import { ArrowRight, WhatsApp, Truck, Shield, Banknote, Wrench, Star, Zap, Package, Phone, BadgeCheck } from '../components/Icons.jsx';

const HERO_MODELS = ['tata-lpt-truck-body-parts', 'tata-signa-truck-body-parts', 'leyland-truck-body-parts', 'eicher-pro-truck-body-parts', 'bharatbenz-truck-body-parts'];

function Hero() {
  const slides = HERO_MODELS.map((s) => models.find((m) => m.slug === s)).filter(Boolean);
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 3800); return () => clearInterval(t); }, [slides.length]);
  const m = slides[i];
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="grid" />
        <motion.div className="blob b1" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="blob b2" animate={{ x: [0, -40, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="blob b3" />
        <div className="stripes" />
      </div>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .1 } } }}>
              {[
                <div className="eyebrow" key="e">{company.tagline}</div>,
                <h1 className="hero-title" key="t">Truck body parts<br /><span className="accent">that fit right.</span><br /><span className="outline">Every time.</span></h1>,
                <p className="hero-lead" key="l">Bumpers, doors, fenders, grills, pillars and cabins for TATA, Ashok Leyland, Eicher, BharatBenz and SML. Built for long life, delivered free anywhere in India.</p>,
                <div className="hero-cta" key="c">
                  <Link to="/models" className="btn btn-primary btn-lg">Browse by vehicle <ArrowRight /><span className="shine" /></Link>
                  <a className="btn btn-on-dark btn-lg" href={waLink('Hi Partsman, I am looking for a truck body part.')} target="_blank" rel="noreferrer"><WhatsApp />Ask on WhatsApp</a>
                </div>,
                <div className="hero-stats" key="s">
                  <div className="hero-stat"><b><CountUp to={stats.products} suffix="+" /></b><small>Parts in stock</small></div>
                  <div className="hero-stat"><b><CountUp to={stats.models} /></b><small>Vehicle models</small></div>
                  <div className="hero-stat"><b><span>100</span>%</b><small>Quality assured</small></div>
                </div>,
              ].map((el, k) => <motion.div key={k} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } } }}>{el}</motion.div>)}
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-card">
              <div className="hc-glow" />
              <div className="hc-dots">{slides.map((s, k) => <i key={s.slug} className={k === i ? 'on' : ''} />)}</div>
              <AnimatePresence mode="wait">
                <motion.div key={m.slug} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={`/model/${m.slug}`}>
                    <img src={m.image} alt={m.short} />
                    <div className="hc-label"><b>{m.short}</b><span>{m.count} parts available →</span></div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div className="float-chip fc-1" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><span className="ic"><Truck /></span><div>Free delivery<small>All over India</small></div></motion.div>
            <motion.div className="float-chip fc-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: .5 }}><span className="ic"><Banknote /></span><div>Cash on delivery<small>Pay when it arrives</small></div></motion.div>
            <motion.div className="float-chip fc-3" animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}><span className="ic"><BadgeCheck /></span><div>Perfect fitment<small>OEM-spec tooling</small></div></motion.div>
          </motion.div>
        </div>
      </div>
      <div className="hero-scroll"><span>Scroll</span><i /></div>
    </section>
  );
}

const FEATURES = [
  { Icon: Shield, t: 'Quality assured', d: 'Every panel is pressed on OEM-spec tooling and inspected before dispatch. No rework at the workshop.' },
  { Icon: Truck, t: 'Free all-India delivery', d: 'Packed for transit and shipped via trusted courier partners within 3–7 business days.' },
  { Icon: Banknote, t: 'Cash on delivery', d: 'Order on WhatsApp, pay when the part reaches you. Bulk discounts for garages and fleets.' },
  { Icon: Wrench, t: 'Expert fitment help', d: 'Not sure which variant you need? Send us a photo and chassis details, we will match it.' },
];

const TESTIMONIALS = [
  { n: 'Ramesh Patel', r: 'Fleet owner, Surat', t: 'Ordered 6 Signa bumper assemblies for our fleet. Fitment was perfect and delivery came in 4 days. Pricing was better than the local market.' },
  { n: 'Imran Shaikh', r: 'Garage owner, Nashik', t: 'Partsman is my go-to for LPT doors and fenders. The WhatsApp team knows the models well and never sends the wrong variant.' },
  { n: 'Suresh Yadav', r: 'Transporter, Indore', t: 'Got a full cabin front kit for my Hyva. Quality is like original and COD made it easy. Highly recommended.' },
];

export default function Home() {
  const featured = featuredProducts(8);
  useEffect(() => { document.title = `${company.name} – ${company.tagline} | Truck Body Parts`; }, []);
  return (
    <>
      <Hero />

      <div className="container finder-wrap"><Reveal y={20}><PartsFinder /></Reveal></div>

      <div className="marquee" style={{ marginTop: 40 }}>
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => <Link key={i} to={`/search?brand=${b.id}`} className="marquee-item"><i />{b.name}</Link>)}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Shop by vehicle</span><h2 className="h2">Popular models</h2><p className="muted">Pick your truck to see every body part we stock for it.</p></div>
            <Link to="/models" className="link">View all models <ArrowRight /></Link>
          </div>
          <StaggerGrid className="grid grid-4">
            {models.slice(0, 8).map((m) => <StaggerItem key={m.slug}><ModelCard m={m} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Shop by part</span><h2 className="h2">Parts categories</h2><p className="muted">{stats.products}+ parts across {stats.categories} categories.</p></div>
            <Link to="/categories" className="link">All categories <ArrowRight /></Link>
          </div>
          <StaggerGrid className="grid grid-6">
            {categories.slice(0, 12).map((c) => <StaggerItem key={c.slug}><CategoryCard c={c} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Fast movers</span><h2 className="h2">Featured parts</h2><p className="muted">Popular replacements our customers order every week.</p></div>
            <Link to="/search" className="link">Browse all parts <ArrowRight /></Link>
          </div>
          <StaggerGrid className="grid grid-4">
            {featured.map((p) => <StaggerItem key={p.slug}><ProductCard p={p} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <section className="section dark-band">
        <div className="hero-bg"><div className="grid" /><div className="blob b2" style={{ left: '-10%', top: '-30%' }} /><div className="stripes" /></div>
        <div className="container">
          <Reveal className="section-head" style={{ alignItems: 'center' }}>
            <div><span className="eyebrow">Why Partsman</span><h2 className="h2">Built for garages, fleets and transporters</h2></div>
            <a className="btn btn-primary" href={waLink('Hi Partsman, I want to know about bulk pricing.')} target="_blank" rel="noreferrer"><WhatsApp />Get bulk pricing<span className="shine" /></a>
          </Reveal>
          <StaggerGrid className="grid grid-4">
            {FEATURES.map((f, i) => (
              <StaggerItem key={f.t}>
                <div className="card fcard" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.1)', color: '#fff', height: '100%' }}>
                  <span className="num" style={{ color: 'rgba(255,255,255,.06)' }}>0{i + 1}</span>
                  <div className="fic"><f.Icon /></div>
                  <h3>{f.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,.65)' }}>{f.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <Reveal style={{ marginTop: 54 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="h2" style={{ marginTop: 10, marginBottom: 26 }}>From enquiry to doorstep in four steps</h2>
            <div className="steps">
              {[['Find your part', 'Search by vehicle model or part category, or send us a photo on WhatsApp.'], ['Confirm on WhatsApp', 'We confirm variant, price and availability within minutes.'], ['We pack & ship', 'Parts are packed for safe transit and dispatched in 3–7 business days.'], ['Pay on delivery', 'Pay cash on delivery or online. Bulk orders get extra savings.']].map(([t, d], i) => (
                <div className="step" key={t}><h3>{t}</h3><p>{d}</p>{i < 3 && <span className="connector" />}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="stat-strip">
            {[[stats.products, '+', 'Parts listed'], [stats.models, '', 'Vehicle models'], [stats.categories, '', 'Categories'], [5000, '+', 'Happy customers']].map(([n, s, l]) => (
              <div className="card stat-box" key={l}><b><span><CountUp to={n} suffix={s} /></span></b><small>{l}</small></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Customer stories</span><h2 className="h2">Trusted across India</h2></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="stars" style={{ color: 'var(--brand)', display: 'flex' }}>{[...Array(5)].map((_, i) => <Star key={i} style={{ width: 18, height: 18 }} />)}</span><b>4.9/5</b><span className="muted">from 1,200+ orders</span></div>
          </div>
          <StaggerGrid className="grid grid-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.n}>
                <div className="card testi" style={{ height: '100%' }}>
                  <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} />)}</div>
                  <p>“{t.t}”</p>
                  <div className="who"><span className="av">{t.n[0]}</span><div><b>{t.n}</b><small>{t.r}</small></div></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="cta-band">
            <span className="deco" /><span className="deco2" />
            <div><h2 className="h2">Can't find your part?</h2><p>Send us the model, variant and a photo. Our team will identify the exact part and quote in minutes.</p></div>
            <div className="cta-actions">
              <a className="btn btn-dark btn-lg" href={waLink('Hi Partsman, I need help identifying a part.')} target="_blank" rel="noreferrer"><WhatsApp />WhatsApp us</a>
              <a className="btn btn-on-dark btn-lg" style={{ '--btn-bg': 'rgba(28,25,43,.1)', '--btn-fg': 'var(--on-brand)', '--btn-bd': 'rgba(28,25,43,.25)' }} href={`tel:${company.phone}`}><Phone />Call now</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
