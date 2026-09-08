import { useState } from 'react';
import PageHead from '../components/PageHead.jsx';
import Reveal from '../components/Reveal.jsx';
import { company, waLink } from '../data/company.js';
import { models } from '../data/catalog.js';
import { Phone, Mail, MapPin, Clock, WhatsApp, Send, ChevronDown } from '../components/Icons.jsx';

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', model: '', part: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const modelName = models.find((m) => m.slug === f.model)?.short || 'Not specified';
    const text = `Hello ${company.name},\n\nName: ${f.name}\nPhone: ${f.phone}\nVehicle model: ${modelName}\nPart needed: ${f.part}\n\n${f.message}`;
    window.open(waLink(text), '_blank', 'noopener');
  };
  return (
    <>
      <PageHead eyebrow="Contact" title="Let's find your part" lead="Message us on WhatsApp for the fastest response, or use the enquiry form. We reply within business hours, usually in minutes." crumbs={[{ label: 'Contact' }]} />
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <Reveal>
              <div className="card" style={{ padding: '10px 24px' }}>
                <div className="info-row"><span className="ii"><WhatsApp /></span><div><b>WhatsApp</b><a href={waLink('Hi Partsman, I need a truck body part.')} target="_blank" rel="noreferrer">{company.phoneDisplay} · Chat now</a></div></div>
                <div className="info-row"><span className="ii"><Phone /></span><div><b>Phone</b><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a></div></div>
                <div className="info-row"><span className="ii"><Mail /></span><div><b>Email</b><a href={`mailto:${company.email}`}>{company.email}</a></div></div>
                <div className="info-row"><span className="ii"><MapPin /></span><div><b>Warehouse</b><span>{company.address}</span></div></div>
                <div className="info-row"><span className="ii"><Clock /></span><div><b>Hours</b><span>{company.hours}</span></div></div>
              </div>
              <div className="map" style={{ marginTop: 16 }}><iframe title="Map" src={company.mapEmbed} loading="lazy" allowFullScreen /></div>
            </Reveal>
            <Reveal delay={.1}>
              <form className="card" style={{ padding: 28 }} onSubmit={submit}>
                <span className="eyebrow">Enquiry form</span>
                <h2 className="h3" style={{ margin: '10px 0 6px' }}>Tell us what you need</h2>
                <p className="muted" style={{ marginBottom: 20, fontSize: 14 }}>This opens WhatsApp with your details pre-filled, so we can answer straight away.</p>
                <div className="form-grid">
                  <div className="field"><label>Your name</label><input className="input" required value={f.name} onChange={set('name')} placeholder="Ramesh Patel" /></div>
                  <div className="field"><label>Phone</label><input className="input" required type="tel" value={f.phone} onChange={set('phone')} placeholder="+91 98765 43210" /></div>
                  <div className="field"><label>Vehicle model</label><div className="select"><select value={f.model} onChange={set('model')}><option value="">Select model</option>{models.map((m) => <option key={m.slug} value={m.slug}>{m.short}</option>)}</select><ChevronDown /></div></div>
                  <div className="field"><label>Part needed</label><input className="input" required value={f.part} onChange={set('part')} placeholder="Front bumper, door assy RH…" /></div>
                  <div className="field full"><label>Message</label><textarea className="input" value={f.message} onChange={set('message')} placeholder="Quantity, variant (old / new model), city for delivery…" /></div>
                </div>
                <button className="btn btn-wa btn-lg btn-block" type="submit" style={{ marginTop: 18 }}><Send />Send on WhatsApp<span className="shine" /></button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
