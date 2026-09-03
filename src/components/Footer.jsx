import { Link } from 'react-router-dom';
import { company } from '../data/company.js';
import { categories, models } from '../data/catalog.js';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, WhatsApp } from './Icons.jsx';
import { withBase } from '../utils/assets.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="stripe" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={withBase('/images/logo-tagline-dark.png')} alt={`${company.name} – ${company.tagline}`} />
            <p>{company.name} is your one-stop destination for genuine-fit truck body parts. Bumpers, doors, fenders, grills, pillars and cabins for TATA, Ashok Leyland, Eicher, BharatBenz and SML, delivered anywhere in India.</p>
            <div className="social">
              <a href={company.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href={company.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={company.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
            </div>
          </div>
          <div>
            <h4>Vehicle Models</h4>
            <div className="footer-links">
              {models.slice(0, 8).map((m) => <Link key={m.slug} to={`/model/${m.slug}`}>{m.short} Parts</Link>)}
              <Link to="/models" style={{ color: 'var(--brand)', fontWeight: 700 }}>All models →</Link>
            </div>
          </div>
          <div>
            <h4>Parts Categories</h4>
            <div className="footer-links">
              {categories.slice(0, 8).map((c) => <Link key={c.slug} to={`/category/${c.slug}`}>{c.short}</Link>)}
              <Link to="/categories" style={{ color: 'var(--brand)', fontWeight: 700 }}>All categories →</Link>
            </div>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul className="footer-contact">
              <li><Phone /><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a></li>
              <li><Mail /><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><MapPin /><span>{company.address}</span></li>
              <li><Clock /><span>{company.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.name} · {company.tagline}. All rights reserved.</span>
          <div className="links">
            <Link to="/policies#privacy">Privacy</Link>
            <Link to="/policies#delivery">Delivery</Link>
            <Link to="/policies#returns">Returns</Link>
            <Link to="/policies#terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
