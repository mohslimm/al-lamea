import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const BackgroundAura = memo(() => {
  const prefersReduced = useReducedMotion();

  // Si l'utilisateur préfère réduire les animations, on affiche un fond statique
  if (prefersReduced) {
    return (
      <div className="fixed inset-0 z-[-1] bg-[var(--bg-void)] pointer-events-none overflow-hidden">
        {/* Grain de fond statique */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8L3N2Zz4=')]" style={{ backgroundSize: '100px 100px' }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-[var(--bg-void)] pointer-events-none overflow-hidden">
      {/* 
        Orb Supérieur Gauche (Gold)
        Animation uniquement sur opacity et transform (accélération GPU implicite via translateZ ou framer-motion defaults)
      */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,var(--gold-500)_0%,transparent_70%)] blur-[120px] mix-blend-screen will-change-transform"
      />
      
      {/* 
        Orb Inférieur Droit (Navy profond)
      */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,var(--navy)_0%,transparent_70%)] blur-[100px] mix-blend-screen will-change-transform"
      />

      {/* Grain Texture superposée (Quiet Luxury touch) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8L3N2Zz4=')]" style={{ backgroundSize: '100px 100px' }} />
    </div>
  );
});

BackgroundAura.displayName = 'BackgroundAura';
