const I = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);
export const Search = (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>;
export const ArrowRight = (p) => <I {...p}><path d="M5 12h14M13 5l7 7-7 7" /></I>;
export const ArrowUpRight = (p) => <I {...p}><path d="M7 17 17 7M8 7h9v9" /></I>;
export const ChevronDown = (p) => <I {...p}><path d="m6 9 6 6 6-6" /></I>;
export const ChevronRight = (p) => <I {...p}><path d="m9 6 6 6-6 6" /></I>;
export const ChevronLeft = (p) => <I {...p}><path d="m15 6-6 6 6 6" /></I>;
export const ArrowUp = (p) => <I {...p}><path d="M12 19V5M5 12l7-7 7 7" /></I>;
export const Menu = (p) => <I {...p}><path d="M4 7h16M4 12h16M4 17h16" /></I>;
export const X = (p) => <I {...p}><path d="M18 6 6 18M6 6l12 12" /></I>;
export const Sun = (p) => <I {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></I>;
export const Moon = (p) => <I {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></I>;
export const Monitor = (p) => <I {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></I>;
export const Phone = (p) => <I {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z" /></I>;
export const Mail = (p) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></I>;
export const MapPin = (p) => <I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></I>;
export const Clock = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>;
export const Truck = (p) => <I {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></I>;
export const Shield = (p) => <I {...p}><path d="M12 2 4 5v6c0 5 3.5 9.3 8 11 4.5-1.7 8-6 8-11V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></I>;
export const Check = (p) => <I {...p}><path d="m5 12 5 5L20 7" /></I>;
export const BadgeCheck = (p) => <I {...p}><path d="M3.9 8.6a2.4 2.4 0 0 1 2.3-2.7A2.4 2.4 0 0 1 8 2.9 2.4 2.4 0 0 1 12 2a2.4 2.4 0 0 1 4 .9 2.4 2.4 0 0 1 1.8 3 2.4 2.4 0 0 1 2.3 2.7c.9.9 1 2.4.2 3.4a2.4 2.4 0 0 1-.2 3.4 2.4 2.4 0 0 1-2.3 2.7 2.4 2.4 0 0 1-1.8 3 2.4 2.4 0 0 1-4 .9 2.4 2.4 0 0 1-4-.9 2.4 2.4 0 0 1-1.8-3 2.4 2.4 0 0 1-2.3-2.7 2.4 2.4 0 0 1-.2-3.4 2.4 2.4 0 0 1 .2-3.4Z" /><path d="m9 12 2 2 4-4" /></I>;
export const Tag = (p) => <I {...p}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z" /><circle cx="7" cy="7" r="1.5" /></I>;
export const Wrench = (p) => <I {...p}><path d="M14.7 6.3a4 4 0 0 0 5 5L22 9l-2 2-4-4 2-2-2.7 1.3ZM14.7 6.3 4 17l3 3 10.7-10.7" /></I>;
export const Package = (p) => <I {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></I>;
export const Zap = (p) => <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>;
export const Star = (p) => <I fill="currentColor" stroke="none" {...p}><path d="m12 2 3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9L12 2Z" /></I>;
export const Grid = (p) => <I {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></I>;
export const Layers = (p) => <I {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5M3 18l9 5 9-5" /></I>;
export const Home = (p) => <I {...p}><path d="m3 11 9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11Z" /></I>;
export const Users = (p) => <I {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></I>;
export const Globe = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></I>;
export const Banknote = (p) => <I {...p}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></I>;
export const Share = (p) => <I {...p}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" /></I>;
export const Maximize = (p) => <I {...p}><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /></I>;
export const Send = (p) => <I {...p}><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></I>;
export const Gift = (p) => <I {...p}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v9h14v-9M12 8a3 3 0 1 1 3-3c0 3-3 3-3 3ZM12 8a3 3 0 1 0-3-3c0 3 3 3 3 3Z" /></I>;
export const Quote = (p) => <I fill="currentColor" stroke="none" {...p}><path d="M7 6C4.8 6 3 7.8 3 10v8h6v-6H6c0-1.1.9-2 2-2V6H7Zm10 0c-2.2 0-4 1.8-4 4v8h6v-6h-3c0-1.1.9-2 2-2V6h-1Z" /></I>;
export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2Z" />
  </svg>
);
export const Facebook = (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5H14Z" /></svg>;
export const Instagram = (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></I>;
export const Youtube = (p) => <I {...p}><path d="M22 8.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C15.8 5 12 5 12 5s-3.8 0-6.9.2c-.4.1-1.4.1-2.2 1C2.2 6.9 2 8.5 2 8.5S1.8 10.3 1.8 12v1.7c0 1.8.2 3.5.2 3.5s.2 1.6.9 2.3c.8.9 1.9.8 2.4.9 1.8.2 6.7.2 6.7.2s3.8 0 6.9-.2c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.8.2-3.5V12c0-1.7-.2-3.5-.2-3.5Z" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" /></I>;
