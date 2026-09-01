import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { company } from '../data/company.js';
import Breadcrumbs from './Breadcrumbs.jsx';

export default function PageHead({ eyebrow, title, lead, crumbs = [], image, children }) {
  useEffect(() => { document.title = `${title} | ${company.name}`; }, [title]);
  return (
    <section className="page-head">
      <div className="hero-bg"><div className="grid" /><div className="blob b1" /><div className="blob b2" /><div className="stripes" /></div>
      <div className="container">
        <div className="page-head-inner">
          <div>
            <Breadcrumbs items={crumbs} />
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}>
              {eyebrow && <div className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</div>}
              <h1 className="h1">{title}</h1>
              {lead && <p className="lead">{lead}</p>}
              {children}
            </motion.div>
          </div>
          {image && <motion.img src={image} alt="" initial={{ opacity: 0, x: 40, scale: .9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }} />}
        </div>
      </div>
    </section>
  );
}
