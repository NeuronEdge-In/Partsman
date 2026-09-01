// Prefixes a public asset path (e.g. "/images/logo.png") with the deployed base path,
// so images work both at "/" and under a sub-folder such as GitHub Pages "/Partsman/".
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (p) => (p && p.startsWith('/') ? BASE + p : p);
export const PLACEHOLDER = asset('/images/placeholder.svg');
