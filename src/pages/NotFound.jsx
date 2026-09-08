import { Link } from 'react-router-dom';
import { Package, ArrowRight } from '../components/Icons.jsx';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty">
          <Package />
          <b style={{ fontSize: 32, fontFamily: 'var(--font-display)' }}>Page not found</b>
          <p>The part or page you're looking for isn't here. Try searching, or browse by vehicle model.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Go home <ArrowRight /></Link>
            <Link to="/models" className="btn btn-outline">Browse models</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
