import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import { stats, BRANDS, getModel } from '../data/catalog.js';
import { company, waLink } from '../data/company.js';
import { Shield, Truck, Users, Globe, Wrench, Package, WhatsApp, ArrowRight } from '../components/Icons.jsx';

const VALUES = [
  { Icon: Shield, t: 'Quality first', d: 'Every part is checked for gauge, finish and fitment before it leaves our warehouse.' },
  { Icon: Wrench, t: 'Model expertise', d: 'Our team lives and breathes TATA, Leyland, Eicher and BharatBenz cabins. Send a photo, we identify the part.' },
  { Icon: Truck, t: 'Pan-India logistics', d: 'Crated, padded and shipped via trusted courier partners so panels arrive dent-free.' },
  { Icon: Users, t: 'Built for the trade', d: 'Garages, body shops, transporters and fleets get bulk pricing and priority dispatch.' },
];

export default function About() {
  return (
    <>
      <PageHead eyebrow="About us" title={`${company.name} · ${company.tagline}`} lead="We keep India's trucks on the road with body parts that fit right the first time." crumbs={[{ label: 'About' }]} image={getModel('tata-lpt-truck-body-parts')?.image} />
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 48 }}>
            <Reveal>
              <span className="eyebrow">Our story</span>
              <h2 className="h2" style={{ marginTop: 10, marginBottom: 16 }}>One destination for every truck body panel</h2>
              <p className="lead" style={{ marginBottom: 14 }}>{company.name} started with a simple frustration: a transporter waiting weeks for a bumper that arrived as the wrong variant. We set out to build a catalogue where every part is mapped to its exact vehicle model, and where a WhatsApp message gets you a confirmed answer in minutes.</p>
              <p className="lead">Today we stock {stats.products}+ body parts across {stats.models} vehicle models, from TATA Ace to BharatBenz, and ship them free anywhere in India with cash on delivery.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href={waLink('Hi Partsman, I would like to know more about your company.')} target="_blank" rel="noreferrer"><WhatsApp />Talk to us<span className="shine" /></a>
                <Link className="btn btn-outline" to="/models">Browse catalogue <ArrowRight /></Link>
              </div>
            </Reveal>
            <Reveal delay={.15}>
              <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {[[stats.products, '+', 'Parts listed'], [stats.models, '', 'Vehicle models'], [BRANDS.length, '', 'Truck brands'], [28, '', 'States served']].map(([n, s, l]) => (
                  <div className="card stat-box" key={l}><b><span><CountUp to={n} suffix={s} /></span></b><small>{l}</small></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="container">
          <Reveal className="section-head"><div><span className="eyebrow">What we stand for</span><h2 className="h2">Why customers stay with us</h2></div></Reveal>
          <StaggerGrid className="grid grid-4">
            {VALUES.map((v, i) => <StaggerItem key={v.t}><div className="card fcard" style={{ height: '100%' }}><span className="num">0{i + 1}</span><div className="fic"><v.Icon /></div><h3>{v.t}</h3><p>{v.d}</p></div></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal className="cta-band">
            <span className="deco" /><span className="deco2" />
            <div><h2 className="h2">Brands we cover</h2><p>{BRANDS.map((b) => b.name).join(' · ')}</p></div>
            <div className="cta-actions"><Link className="btn btn-dark btn-lg" to="/models"><Package />See all models</Link></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
