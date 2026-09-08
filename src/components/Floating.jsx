import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { waLink } from '../data/company.js';
import { WhatsApp, ArrowUp } from './Icons.jsx';

export default function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <motion.div className="wa-float" initial={{ opacity: 0, scale: .6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}>
        <motion.span className="wa-label" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}>Need help finding a part?</motion.span>
        <a className="wa-btn" href={waLink('Hi Partsman, I need help finding a truck body part.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><WhatsApp /></a>
      </motion.div>
      <AnimatePresence>
        {show && (
          <motion.button className="to-top" aria-label="Back to top" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp /></motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
