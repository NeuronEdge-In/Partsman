import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { company } from '../data/company.js';

const SECTIONS = [
  { id: 'delivery', t: 'Delivery policy', body: (
    <>
      <p>Orders confirmed on WhatsApp or phone are dispatched through our courier partners within 3–7 business days depending on your location. Delivery is free across India for standard consignments.</p>
      <ul><li>Large panels (doors, cabins, roof tops) are crated for safe transit.</li><li>Any special freight charges are disclosed and agreed at order confirmation.</li><li>Tracking details are shared on WhatsApp once the parcel ships.</li></ul>
    </>
  ) },
  { id: 'returns', t: 'Returns & refunds', body: (
    <>
      <p>Returns are accepted only if the product is damaged in transit or an incorrect item was supplied.</p>
      <ul><li>Report the issue within 48 hours of delivery with photos of the part and packaging.</li><li>After verification we will send a replacement or issue a refund.</li><li>Parts that have been installed, painted or modified cannot be returned.</li></ul>
    </>
  ) },
  { id: 'privacy', t: 'Privacy policy', body: (
    <>
      <p>Personal information such as your name, phone number or address shared with us through this website or WhatsApp is used only to confirm and deliver your order.</p>
      <ul><li>We do not sell or share your data with third parties.</li><li>Delivery details are shared with courier partners solely for shipping.</li></ul>
    </>
  ) },
  { id: 'terms', t: 'Terms & conditions', body: (
    <>
      <p>Product images on this website are for reference only; the actual item may differ slightly in finish. Buyers are responsible for selecting the correct part for their vehicle variant.</p>
      <ul><li>An order is final once it is confirmed on WhatsApp.</li><li>{company.name} is not liable for installation errors, misuse or damage after delivery.</li><li>All disputes are subject to the jurisdiction of {company.city} courts.</li></ul>
    </>
  ) },
];

export default function Policies() {
  const { hash } = useLocation();
  useEffect(() => { if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150); }, [hash]);
  return (
    <>
      <PageHead eyebrow="Legal" title="Policies" lead="How we deliver, handle returns and protect your information." crumbs={[{ label: 'Policies' }]} />
      <section className="section">
        <div className="container">
          <div className="policy-nav">{SECTIONS.map((s) => <a key={s.id} href={`#${s.id}`} className="chip">{s.t}</a>)}</div>
          <div className="prose">{SECTIONS.map((s) => <div key={s.id}><h2 id={s.id}>{s.t}</h2>{s.body}</div>)}</div>
        </div>
      </section>
    </>
  );
}
