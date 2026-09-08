import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon, Monitor } from './Icons.jsx';

const OPTIONS = [
  { id: 'light', Icon: Sun, label: 'Light theme' },
  { id: 'system', Icon: Monitor, label: 'Follow system theme' },
  { id: 'dark', Icon: Moon, label: 'Dark theme' },
];

export default function ThemeSwitch({ id = 'hdr' }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-switch" role="radiogroup" aria-label="Theme">
      {OPTIONS.map(({ id: t, Icon, label }) => (
        <button key={t} role="radio" aria-checked={theme === t} aria-label={label} title={label}
          className={theme === t ? 'active' : ''} onClick={() => setTheme(t)}>
          {theme === t && <motion.span layoutId={`theme-thumb-${id}`} className="ts-thumb" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
          <Icon />
        </button>
      ))}
    </div>
  );
}
