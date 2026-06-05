import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Truck, ArrowUpRight, ArrowRight, ArrowLeft, Check, Play, Star, MapPin,
  Compass, Package, ClipboardList, Home, Plus, ChevronDown,
  Instagram, Linkedin, Twitter, Facebook,
} from "lucide-react";
import { Reveal, Stagger, Magnetic, Tilt, Counter, SmartImg, fadeUp } from "./ui.jsx";
import { BRANDS } from "./BrandLogos.jsx";
import { TextHoverEffect } from "./components/ui/hover-text.jsx";

/* ====================== DONNÉES ====================== */
const NAV = [
  ["accueil", "Accueil"], ["services", "Services"], ["apropos", "À propos"],
  ["avis", "Avis"], ["conseils", "Conseils"], ["protection", "Protection"], ["blog", "Blog"],
];
const NEEDS = [
  "Un déménagement international", "Un déménagement local", "Une relocalisation d'entreprise",
  "Les douanes & documents", "L'emballage & le stockage",
];
const HERO_CHECKS = ["Déménagement porte-à-porte", "Assistance douanes & documents", "Emballage & stockage sécurisés"];
const ABOUT_FEATURES = [
  "Déménagement porte-à-porte", "Assistance douanes & documents",
  "Emballage & stockage sécurisés", "Réseau mondial & suivi en temps réel",
];
const STATS = [
  [50, "k+", "Déménagements réussis"], [250, "+", "Villes desservies"],
  [25, "+", "Pays couverts"], [100, "+", "Partenaires de confiance"],
];
const SERVICES = [
  { t: "Déménagement international", d: "Nos spécialistes vous accompagnent à chaque étape — de la documentation requise jusqu'aux réglementations d'expédition.", img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=600&q=80", feature: false },
  { t: "Dédouanement", d: "Nous gérons la complexité des douanes pour vous, en préparant chaque document et en garantissant la conformité.", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80", feature: true },
  { t: "Emballage complet", d: "Notre équipe d'emballage professionnelle utilise des matériaux de qualité et des techniques éprouvées pour protéger vos biens.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", feature: false },
];
const STEPS = [
  { Ic: Compass, t: "Planification du déménagement", d: "Des consultations détaillées pour cerner vos besoins, explorer les options et fournir un devis sur mesure." },
  { Ic: Package, t: "Emballage & chargement", d: "Des déménageurs qualifiés emballent et chargent vos biens en toute sécurité, par voie terrestre, maritime ou aérienne." },
  { Ic: ClipboardList, t: "Gestion du déménagement", d: "Un coordinateur dédié gère la logistique, les documents, le planning et le suivi de votre expédition." },
  { Ic: Home, t: "Livraison & installation", d: "Une livraison ponctuelle, avec assistance, pour vous aider à vous installer confortablement dans votre nouveau foyer." },
];
const REVIEWS = [
  { photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80", text: "Service incroyable ! Ils ont emballé, déménagé et déballé plus vite que prévu. Le site nous a donné toutes les infos en amont — aucune mauvaise surprise. Nous referons appel à eux, c'est certain !", av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80", name: "Mathilde Lanson", role: "Directrice & Fondatrice" },
  { photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", text: "Une équipe d'une grande douceur avec nos affaires fragiles. Le suivi en temps réel m'a énormément rassuré pendant tout le transport entre Paris et Montréal. Bravo !", av: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", name: "Julien Mercier", role: "Ingénieur expatrié" },
  { photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", text: "Nous avons relocalisé toute une équipe de 12 personnes à l'étranger. Coordination impeccable, zéro stress côté RH. Un vrai partenaire de confiance pour les entreprises.", av: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", name: "Sophie Renaud", role: "Responsable Mobilité RH" },
];
const TESTIMONIALS = [
  { text: "Emballé, déménagé et déballé plus vite que prévu. Aucune mauvaise surprise !", av: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80", name: "Mathilde Lanson", role: "Directrice & Fondatrice" },
  { text: "Le suivi en temps réel m'a rassuré sur tout le transport Paris–Montréal. Bravo !", av: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", name: "Julien Mercier", role: "Ingénieur expatrié" },
  { text: "Relocalisation de 12 collaborateurs à l'étranger : coordination impeccable, zéro stress.", av: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", name: "Sophie Renaud", role: "Responsable Mobilité RH" },
  { text: "Équipe ponctuelle et soigneuse. Nos bureaux déménagés en un seul week-end.", av: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", name: "Karim Belkacem", role: "Gérant de PME" },
  { text: "Des cartons fragiles arrivés intacts à l'autre bout du monde. Je recommande !", av: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", name: "Élodie Faure", role: "Cliente particulière" },
  { text: "Devis clair, douanes gérées de A à Z. Un vrai partenaire de confiance.", av: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&q=80", name: "Thomas Girard", role: "Architecte" },
];
const FAQ = [
  ["Que comprennent vos services de relocalisation ?", "Nos services couvrent l'ensemble du parcours : planification, emballage, chargement, transport international, dédouanement, livraison et installation dans votre nouveau logement."],
  ["Gérez-vous les déménagements individuels et d'équipe ?", "Absolument. Que vous soyez un particulier ou une entreprise relocalisant plusieurs collaborateurs, nous adaptons notre accompagnement à votre situation."],
  ["Comment garantissez-vous la sécurité des biens ?", "Nous utilisons des matériaux d'emballage de qualité professionnelle, un suivi en temps réel et une assurance complète pour protéger vos biens du départ à l'arrivée."],
  ["Pouvez-vous gérer les documents et les douanes ?", "Oui. Notre équipe prépare et gère l'intégralité de la documentation douanière afin d'assurer une conformité totale et un passage sans accroc aux frontières."],
  ["Combien de temps dure un déménagement international ?", "Cela dépend de la destination et du mode de transport, mais nous vous fournissons un calendrier précis dès le devis, et le suivi vous tient informé à chaque étape."],
];

/* ====================== LOGO ====================== */
function Logo({ light }) {
  return (
    <a href="#accueil" className={"logo" + (light ? " logo--light" : "")} aria-label="Positive Moving — accueil">
      <span className="logo-mark"><Truck strokeWidth={2} /></span>
      <span className="logo-text">P<span className="logo-o">O</span>SITIVE<br /><b>MOVING</b></span>
    </a>
  );
}

/* ====================== HEADER ====================== */
function Header({ onToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="container header-inner">
        <Logo />
        <nav className={"nav" + (open ? " open" : "")} aria-label="Navigation principale">
          {NAV.map(([id, label]) => (
            <a key={id} href={"#" + id} className={"nav-link" + (active === id ? " active" : "")} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn-pill nav-cta" onClick={() => setOpen(false)}>
            Obtenir un devis <ArrowUpRight className="arrow" />
          </a>
        </nav>
        <Magnetic as="a" href="#contact" className="btn btn-pill">
          Obtenir un devis <ArrowUpRight className="arrow" />
        </Magnetic>
        <button type="button" className={"burger" + (open ? " open" : "")} aria-label="Ouvrir le menu" aria-expanded={open}
                onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

/* ====================== SELECT CUSTOM ====================== */
function NeedSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <div className={"select" + (open ? " open" : "")} tabIndex={0} role="button" aria-haspopup="listbox"
         aria-expanded={open} onClick={() => setOpen((o) => !o)}
         onBlur={() => setTimeout(() => setOpen(false), 120)}>
      <span className={"select-value" + (value ? "" : " placeholder")}>{value || "J'ai besoin d'aide pour…"}</span>
      <span className="select-caret"><ChevronDown size={18} /></span>
      <AnimatePresence>
        {open && (
          <motion.ul className="select-options" role="listbox"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            {NEEDS.map((n) => (
              <li key={n} role="option" onClick={(e) => { e.stopPropagation(); setValue(n); setOpen(false); }}>{n}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====================== HERO ====================== */
function Hero({ onToast }) {
  return (
    <section className="hero" id="accueil">
      <div className="hero-glow" aria-hidden="true" />
      <svg className="hero-deco" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="deco-route" fill="none" d="M-40 470 C 220 360 460 520 700 380 S 1080 280 1300 220" />
        <circle className="deco-dot" cx="120" cy="430" r="6" />
        <circle className="deco-dot" cx="700" cy="380" r="6" />
        <circle className="deco-dot deco-dot--end" cx="1120" cy="262" r="9" />
      </svg>
      <div className="container hero-grid">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="hero-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}</span>
            <span><b>4,9/5</b> — déjà <b>+710 clients</b> accompagnés</span>
          </motion.div>
          <motion.h1 className="hero-title" variants={fadeUp}>
            Un déménagement facile et sans souci partout dans le <span className="highlight">monde</span>
          </motion.h1>
          <motion.p className="hero-q" variants={fadeUp}>Comment pouvons-nous vous aider aujourd'hui&nbsp;?</motion.p>
          <motion.div className="hero-form" variants={fadeUp}>
            <NeedSelect />
            <Magnetic className="btn btn-solid" onClick={() => onToast("Merci ! Nous vous recontactons très vite.")}>
              Contactez-nous
            </Magnetic>
          </motion.div>
          <motion.ul className="hero-checks" variants={fadeUp}>
            {HERO_CHECKS.map((c) => (
              <li key={c}><span className="tick"><Check className="ic-mini" strokeWidth={3} /></span> {c}</li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="hero-media" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <Tilt className="hero-photo">
            <SmartImg src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80" alt="Deux personnes lors d'une relocalisation" />
            <motion.div className="hero-chip" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              <MapPin size={15} /> Suivi en temps réel
            </motion.div>
            <motion.div className="hero-card float"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <strong>Rejoignez notre cercle</strong>
              <span>Un pas de plus vers des jours meilleurs.</span>
              <div className="avatars">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="" />
                <span className="avatar-count">710+</span>
              </div>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== PARTENAIRES ====================== */
function Partners() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="partners">
      <div className="container">
        <Reveal className="partners-title" as="p">Plus de <b>100+</b> entreprises partenaires</Reveal>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {row.map(({ C, name }, i) => (
            <span className="brand" key={i}><C />{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== À PROPOS ====================== */
function About({ onToast }) {
  return (
    <section className="about" id="apropos">
      <div className="container about-grid">
        <Reveal className="about-media">
          <Tilt className="about-img about-img--lg">
            <SmartImg src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80" alt="Déménageurs déchargeant un camion" />
          </Tilt>
          <Tilt className="about-img about-img--sm">
            <SmartImg src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=500&q=80" alt="Camion chargé de cartons" />
          </Tilt>
          <div className="badge-60">
            <svg viewBox="0 0 100 100" className="badge-ring" aria-hidden="true">
              <defs><path id="cp" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
              <text><textPath href="#cp">+ 60 ANS D'EXPÉRIENCE · DÉMÉNAGEMENT · MONDE · </textPath></text>
            </svg>
            <span className="badge-core">60<small>ANS</small></span>
          </div>
        </Reveal>

        <Stagger className="about-copy">
          <Reveal className="eyebrow" as="span"><span className="eb-line" /> À propos de l'entreprise</Reveal>
          <Reveal className="section-title" as="h2">Solutions de déménagement international</Reveal>
          <Reveal className="lead" as="p">Avec plus de 60 ans d'expérience, nous rendons les relocalisations mondiales simples et sans stress.</Reveal>
          <Reveal as="ul" className="feature-list">
            {ABOUT_FEATURES.map((f) => (
              <li key={f}><span className="dot"><Check className="ic-mini" strokeWidth={3} /></span> {f}</li>
            ))}
          </Reveal>
          <Reveal className="about-actions">
            <Magnetic as="a" href="#services" className="btn btn-solid">En savoir plus <ArrowRight className="arrow" /></Magnetic>
            <button type="button" className="play-btn" aria-label="Lire la vidéo" onClick={() => onToast("La vidéo de présentation arrive bientôt 🎬")}>
              <span className="play-ring" /><Play className="play-tri" fill="currentColor" />
            </button>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}

/* ====================== STATS ====================== */
function StatsBar() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map(([n, s, label]) => (
          <div className="stat" key={label}>
            <Counter target={n} suffix={s} />
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====================== SERVICES ====================== */
function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal className="eyebrow" as="span"><span className="eb-line" /> Ce que nous offrons</Reveal>
        <Reveal className="section-title" as="h2" delay={1}>Nous vous déménageons<br />partout dans le monde, sans stress</Reveal>
        <Stagger className="cards" amount={0.15}>
          {SERVICES.map((s) => (
            <motion.article key={s.t} className={"card" + (s.feature ? " card--feature" : "")} variants={fadeUp}>
              <Tilt className="card-img"><SmartImg src={s.img} alt={s.t} /></Tilt>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <a href="#contact" className="card-link">En savoir plus <ArrowUpRight className="arrow" /></a>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ====================== CORPORATE ====================== */
function Corporate() {
  return (
    <section className="corporate" id="protection">
      <div className="corporate-bg" aria-hidden="true" />
      <div className="container corporate-grid">
        <Stagger className="corporate-copy">
          <Reveal className="eyebrow eyebrow--light" as="span"><span className="eb-line" /> Relocalisation d'entreprise internationale</Reveal>
          <Reveal className="section-title section-title--light" as="h2">La mobilité de vos<br />collaborateurs, partout<br />dans le monde</Reveal>
          <Reveal className="lead lead--light" as="p">Que vos employés déménagent pour le travail ou qu'un responsable mobilité orchestre les départs de toute une équipe, nous avons tout prévu pour vous.</Reveal>
          <Reveal>
            <Magnetic as="a" href="#contact" className="btn btn-solid">Nous contacter <ArrowUpRight className="arrow" /></Magnetic>
          </Reveal>
        </Stagger>
        <Reveal className="corporate-media" delay={2}>
          <Tilt className="corporate-img">
            <SmartImg src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80" alt="Relocalisation d'entreprise" />
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================== PARTENAIRE FIABLE — parcours animé ====================== */
const nodeVar = { hidden: { scale: 0.5, opacity: 0.4 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 18 } } };
const cardVar = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

function Partner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const pos = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section className="partner" id="conseils">
      <div className="container">
        <Reveal className="eyebrow eyebrow--center" as="span"><span className="eb-line" /> Des relocalisations sans accroc, avec expertise</Reveal>
        <Reveal className="section-title section-title--center" as="h2" delay={1}>Votre partenaire de confiance pour</Reveal>

        <div className="journey" ref={ref}>
          <div className="journey-track">
            <motion.div className="journey-fill" style={{ height: pos }} />
            <motion.div className="journey-truck" style={{ top: pos }}>
              <span className="journey-truck-badge"><Truck size={18} /></span>
            </motion.div>
          </div>

          {STEPS.map((s, i) => {
            const Ic = s.Ic;
            return (
              <motion.div className="journey-step" data-side={i % 2} key={s.t}
                initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.55 }}>
                <motion.div className="journey-node" variants={nodeVar}><span>{i + 1}</span></motion.div>
                <motion.div className="journey-card" variants={cardVar}>
                  <span className="journey-ic"><Ic /></span>
                  <div><h3>{s.t}</h3><p>{s.d}</p></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====================== AVIS — deux bandeaux défilants ====================== */
function TCard({ t }) {
  return (
    <article className="tcard">
      <div className="tcard-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}</div>
      <p className="tcard-quote">« {t.text} »</p>
      <div className="tcard-foot">
        <img src={t.av} alt="" />
        <div><strong>{t.name}</strong><span>{t.role}</span></div>
      </div>
    </article>
  );
}
function Reviews() {
  const rowA = [...TESTIMONIALS, ...TESTIMONIALS];
  const rowB = [...TESTIMONIALS].reverse();
  const rowBLoop = [...rowB, ...rowB];
  return (
    <section className="reviews" id="avis">
      <div className="container">
        <Reveal className="eyebrow eyebrow--center" as="span"><span className="eb-line" /> Ils nous ont fait confiance</Reveal>
        <Reveal className="section-title section-title--center" as="h2" delay={1}>Ce que disent nos clients</Reveal>
      </div>
      <div className="tmarquee">
        <div className="tmarquee-row tmarquee-row--left">
          {rowA.map((t, i) => <TCard key={"a" + i} t={t} />)}
        </div>
        <div className="tmarquee-row tmarquee-row--right">
          {rowBLoop.map((t, i) => <TCard key={"b" + i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* ====================== FAQ ====================== */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="blog">
      <div className="container faq-inner">
        <Reveal className="section-title section-title--center" as="h2">Des questions&nbsp;?</Reveal>
        <Reveal className="accordion" delay={1}>
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={"acc-item" + (isOpen ? " open" : "")} key={q}>
                <button type="button" className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{q}</span>
                  <span className="acc-ic"><Plus /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="acc-panel"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ====================== CTA ====================== */
function Cta() {
  return (
    <section className="cta" id="contact">
      <div className="cta-bg" aria-hidden="true" />
      <Reveal className="container cta-inner">
        <h2>Votre prochaine destination<br />n'est qu'à un <span className="highlight highlight--gold">clic</span></h2>
        <Magnetic as="a" href="#accueil" className="btn btn-solid btn-lg">
          Obtenir un devis gratuit <ArrowUpRight className="arrow" />
        </Magnetic>
      </Reveal>
    </section>
  );
}

/* ====================== FOOTER ====================== */
function Footer({ onToast }) {
  const submit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    onToast("Inscription à la newsletter confirmée ✓");
  };
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Un déménagement facile et sans souci partout dans le monde, depuis plus de 60 ans.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><Instagram /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin /></a>
            <a href="#" aria-label="X"><Twitter /></a>
            <a href="#" aria-label="Facebook"><Facebook /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <a href="#services">Déménagement international</a>
          <a href="#services">Dédouanement</a>
          <a href="#services">Emballage complet</a>
          <a href="#services">Stockage sécurisé</a>
        </div>
        <div className="footer-col">
          <h4>Entreprise</h4>
          <a href="#apropos">À propos</a>
          <a href="#avis">Avis clients</a>
          <a href="#conseils">Conseils déménagement</a>
          <a href="#blog">Blog</a>
        </div>
        <div className="footer-col footer-news">
          <h4>Newsletter</h4>
          <p>Recevez nos meilleurs conseils de déménagement.</p>
          <form className="news-form" onSubmit={submit}>
            <input type="email" placeholder="Votre e-mail" required aria-label="Votre e-mail" />
            <button type="submit" aria-label="S'abonner"><ArrowUpRight /></button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Positive Moving. Tous droits réservés.</span>
        <span>Conçu avec soin · Mentions légales · Confidentialité</span>
      </div>

      {/* Grand texte interactif (survolez-le) */}
      <div className="footer-hover">
        <TextHoverEffect text="Positive Moving" />
      </div>
    </footer>
  );
}

/* ====================== APP ====================== */
export default function App() {
  const [toast, setToast] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(null), 3200);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <Header onToast={showToast} />
      <main>
        <Hero onToast={showToast} />
        <Partners />
        <About onToast={showToast} />
        <StatsBar />
        <Services />
        <Corporate />
        <Partner />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer onToast={showToast} />
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" role="status"
            initial={{ y: 120, opacity: 0, x: "-50%" }} animate={{ y: 0, opacity: 1, x: "-50%" }} exit={{ y: 120, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
