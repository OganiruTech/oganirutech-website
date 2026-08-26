"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Route transition. template.tsx (unlike layout.tsx) remounts on every
   navigation, so this cross-fades each page in rather than letting it snap.
   Opacity only — a transform here would create a containing block and break
   any position: fixed inside a page. */

export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
