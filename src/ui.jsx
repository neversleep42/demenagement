import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* Variantes d'apparition partagées */
export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Wrapper d'apparition au scroll (whileInView) */
export function Reveal({ children, delay = 0, className, as = "div", ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={delay}
      {...rest}
    >
      {children}
    </M>
  );
}

/* Conteneur à révélation échelonnée (stagger) pour les enfants <Reveal> */
export function Stagger({ children, className, amount = 0.2, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: 0.12 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Bouton/élément magnétique (suit le curseur) */
export function Magnetic({ as = "button", className, children, strength = 0.3, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const M = motion[as] || motion.button;

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * (strength + 0.1));
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <M ref={ref} className={className} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={reset} {...props}>
      {children}
    </M>
  );
}

/* Carte avec effet tilt 3D au survol */
export function Tilt({ className, children, max = 6, ...props }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect();
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -2 * max);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* Compteur animé déclenché à l'entrée dans le viewport */
export function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const dur = 1600;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span className="stat-num" ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* Image avec repli en dégradé si le chargement échoue */
export function SmartImg({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={failed ? "img-fallback" : undefined} style={{ display: "block", width: "100%", height: "100%" }}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} {...props} />
    </span>
  );
}
