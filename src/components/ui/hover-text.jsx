"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * TextHoverEffect — adapté du composant Nur/ui (TS + Tailwind + motion/react)
 * vers la stack du projet : JSX + framer-motion + CSS classique.
 * Couleurs alignées sur la charte Positive Moving (vert forêt + doré).
 */
export const TextHoverEffect = ({ text, duration, className }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    // Évite NaN quand le SVG n'a pas (encore) de dimensions (ex. masqué en mobile).
    if (svgRect.width === 0 || svgRect.height === 0) return;
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
    if (!Number.isFinite(cxPercentage) || !Number.isFinite(cyPercentage)) return;
    setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 820 130"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={"hovertext " + (className || "")}
    >
      <defs>
        <linearGradient id="pmTextGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#f2c14e" />
              <stop offset="28%" stopColor="#e0a92e" />
              <stop offset="55%" stopColor="#7fc6a4" />
              <stop offset="80%" stopColor="#2e7d5b" />
              <stop offset="100%" stopColor="#1d5a3d" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="pmRevealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="pmTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pmRevealMask)" />
        </mask>
      </defs>

      {/* Contour révélé au survol (clair, discret) */}
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        className="hovertext-base" style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* Tracé doré animé au chargement */}
      <motion.text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.7"
        className="hovertext-stroke"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Dégradé révélé sous le curseur */}
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#pmTextGradient)" strokeWidth="0.8" mask="url(#pmTextMask)"
        className="hovertext-grad"
      >
        {text}
      </text>
    </svg>
  );
};

/** Dégradé de fond optionnel (adapté à la charte). */
export const FooterBackgroundGradient = () => (
  <div
    className="footer-bg-gradient"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 8%, rgba(12,42,30,.0) 45%, rgba(242,193,78,.16) 100%)",
    }}
  />
);
