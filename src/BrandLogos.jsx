// Logos partenaires — marques monochromes (Lucide ne fournit pas de logos de marque)
const S = { className: "brand-mark", viewBox: "0 0 24 24", fill: "currentColor" };

export const Dropbox = () => (
  <svg {...S}><path d="M7.5 3 3 6l4.5 3L12 6zM16.5 3 12 6l4.5 3L21 6zM3 12l4.5 3L12 12 7.5 9zM21 12l-4.5 3L12 12l4.5-3zM7.5 16.2 12 19.2l4.5-3-4.5-3z" /></svg>
);
export const HubSpot = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="10.5" cy="15" r="4.3" /><path d="M14.8 11 17 8.5" strokeLinecap="round" /><circle cx="18" cy="7" r="1.9" /><circle cx="10.5" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const Square = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="1.9">
    <rect x="4" y="4" width="16" height="16" rx="4" /><rect x="9" y="9" width="6" height="6" rx="1.4" fill="currentColor" stroke="none" />
  </svg>
);
export const Intercom = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 9v5m4-6v7m4-6v5" />
  </svg>
);
export const Grammarly = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="8.3" /><path d="M12 12h4a4 4 0 1 1-1.2-2.9" />
  </svg>
);
export const Notion = () => (
  <svg {...S} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 16V9l6 7V9" />
  </svg>
);
export const Stripe = () => (
  <svg {...S}><path d="M10.6 9.4c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V6.1A11 11 0 0 0 12.1 5C9 5 7 6.6 7 9.3c0 4.2 5.8 3.5 5.8 5.3 0 .8-.7 1.1-1.7 1.1-1.4 0-3.3-.6-4.7-1.4v3.5c1.6.7 3.2 1 4.7 1 3.2 0 5.4-1.6 5.4-4.3 0-4.5-5.9-3.7-5.9-5.4z" /></svg>
);

export const BRANDS = [
  { C: HubSpot, name: "HubSpot" },
  { C: Dropbox, name: "Dropbox" },
  { C: Square, name: "Square" },
  { C: Intercom, name: "Intercom" },
  { C: Grammarly, name: "Grammarly" },
  { C: Notion, name: "Notion" },
  { C: Stripe, name: "Stripe" },
];
