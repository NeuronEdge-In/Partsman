// Prefixes a public asset path (e.g. "/images/logo.png") with the deployed base path,
// so images work both at "/" and under a sub-folder such as GitHub Pages "/Partsman/".
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (p) => {
  if (!p || typeof p !== 'string') return p;
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('data:')) return p;

  const cleanPath = p.startsWith('/') ? p : '/' + p;
  if (BASE && cleanPath.startsWith(BASE + '/')) {
    return cleanPath;
  }
  return BASE ? `${BASE}${cleanPath}` : cleanPath;
};

export const PLACEHOLDER = asset('/images/placeholder.svg');

