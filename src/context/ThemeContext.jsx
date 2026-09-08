import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'system', resolved: 'light', setTheme: () => {} });
const KEY = 'pm-theme';

function getSystem() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; }
  });
  const [system, setSystem] = useState(getSystem);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystem(getSystem());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved = theme === 'system' ? system : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', resolved);
    const t = setTimeout(() => root.classList.remove('theme-transition'), 400);
    return () => clearTimeout(t);
  }, [resolved]);

  const setTheme = (t) => {
    setThemeState(t);
    try { localStorage.setItem(KEY, t); } catch {}
  };

  const value = useMemo(() => ({ theme, resolved, setTheme }), [theme, resolved]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
