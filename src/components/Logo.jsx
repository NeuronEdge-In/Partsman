import { Link } from 'react-router-dom';
import { company } from '../data/company.js';

export default function Logo({ tagline = true, light = false, height }) {
  const src = tagline ? (light ? '/images/logo-tagline-dark.png' : '/images/logo-tagline.png') : '/images/logo.png';
  return (
    <Link to="/" className="logo" aria-label={`${company.name} home`}>
      <img src={src} alt={`${company.name} – ${company.tagline}`} style={height ? { height } : undefined} />
    </Link>
  );
}
