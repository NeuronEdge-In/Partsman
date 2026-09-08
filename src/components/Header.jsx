import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import SearchBox from './SearchBox.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';
import { company, waLink } from '../data/company.js';
import { Menu, X, Phone, Mail, WhatsApp, ChevronRight, Truck } from './Icons.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/models', label: 'Vehicle Models' },
  { to: '/categories', label: 'Parts Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { resolved } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: .3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span className="pill">Free all-India delivery</span>
            <span className="hide-sm"><Truck style={{ width: 14, height: 14, verticalAlign: -2, marginRight: 6 }} />Ships in 3–7 business days · COD available</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${company.phone}`}><Phone />{company.phoneDisplay}</a>
            <a className="hide-sm" href={`mailto:${company.email}`}><Mail />{company.email}</a>
          </div>
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <Logo light={resolved === 'dark'} />
            <div className="header-search"><SearchBox /></div>
            <nav className="nav" aria-label="Primary">
              {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}</NavLink>)}
            </nav>
            <div className="header-actions">
              <ThemeSwitch />
              <a className="btn btn-wa btn-sm" href={waLink('Hi Partsman, I need help finding a truck body part.')} target="_blank" rel="noreferrer" style={{ display: 'inline-flex' }}>
                <WhatsApp /><span className="hide-sm">WhatsApp</span>
              </a>
              <button className="icon-btn burger" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
            </div>
          </div>
          <div className="mobile-search-bar"><SearchBox showKbd={false} placeholder="Search parts…" /></div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="scrim" onClick={() => setOpen(false)} />
            <motion.div className="panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <div className="panel-head">
                <Logo tagline={false} height={18} />
                <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
              </div>
              <nav>
                {NAV.map((n, i) => (
                  <motion.div key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .06 + i * .05 }}>
                    <NavLink to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}<ChevronRight /></NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="drawer-foot">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>Appearance</span><ThemeSwitch id="drawer" /></div>
                <a className="btn btn-wa btn-block" href={waLink('Hi Partsman, I need help finding a truck body part.')} target="_blank" rel="noreferrer"><WhatsApp />Chat on WhatsApp</a>
                <a className="btn btn-outline btn-block" href={`tel:${company.phone}`}><Phone />{company.phoneDisplay}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
