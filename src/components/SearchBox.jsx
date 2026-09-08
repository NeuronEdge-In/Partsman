import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts, modelMap } from '../data/catalog.js';
import { Search, X } from './Icons.jsx';

export default function SearchBox({ autoFocus = false, onNavigate, placeholder = 'Search parts, e.g. "Signa bumper", "Ace door"…', showKbd = true }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(0);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const nav = useNavigate();

  const results = useMemo(() => (q.trim().length > 1 ? searchProducts({ q }).slice(0, 8) : []), [q]);
  const total = useMemo(() => (q.trim().length > 1 ? searchProducts({ q }).length : 0), [q]);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (!showKbd) return;
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showKbd]);

  useEffect(() => { setHl(0); }, [q]);

  const go = (path) => { setOpen(false); setQ(''); onNavigate?.(); nav(path); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHl((h) => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (results[hl] && results.length) go(`/product/${results[hl].slug}`); else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`); }
    else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div className="search-box" ref={ref}>
      <div className="search-input-wrap">
        <Search />
        <input ref={inputRef} value={q} autoFocus={autoFocus} placeholder={placeholder} aria-label="Search parts"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown} />
        {q ? <button className="icon-btn" style={{ width: 32, height: 32, border: 0 }} aria-label="Clear" onClick={() => { setQ(''); inputRef.current?.focus(); }}><X /></button>
          : showKbd && <kbd className="kbd-hint">/</kbd>}
      </div>
      <AnimatePresence>
        {open && q.trim().length > 1 && (
          <motion.div className="search-dropdown" initial={{ opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .18 }}>
            {results.length ? (
              <>
                <ul>
                  {results.map((p, i) => (
                    <li key={p.slug}>
                      <Link to={`/product/${p.slug}`} className={i === hl ? 'hl' : ''} onMouseEnter={() => setHl(i)} onClick={(e) => { e.preventDefault(); go(`/product/${p.slug}`); }}>
                        <img src={p.thumb} alt="" loading="lazy" />
                        <div>
                          <div className="sd-name">{p.name}</div>
                          <div className="sd-meta">{modelMap[p.primaryModel]?.short || p.modelName} · {p.sku}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="sd-foot">
                  <span>{total} part{total === 1 ? '' : 's'} found</span>
                  <a href={`/search?q=${encodeURIComponent(q.trim())}`} onClick={(e) => { e.preventDefault(); go(`/search?q=${encodeURIComponent(q.trim())}`); }}>View all results →</a>
                </div>
              </>
            ) : (
              <div className="search-empty">No parts match “{q}”. Try a model name like <b>LPT</b>, <b>Signa</b> or a part like <b>bumper</b>.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
