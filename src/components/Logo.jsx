import { Link } from 'react-router-dom';
import { company } from '../data/company.js';
import { withBase } from '../utils/assets.js';

export default function Logo({ tagline = true, light = false, height }) {
  const src = tagline ? (light ? withBase('/images/logo-tagline-dark.png') : withBase('/images/logo-tagline.png')) : withBase('/images/logo.png');
  return (
    <Link to="/" className="logo" aria-label={`${company.name} home`}>
      <img src={src} alt={`${company.name} – ${company.tagline}`} style={height ? { height } : undefined} />
    </Link>
  );
}
