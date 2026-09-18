"use client";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---- Scroll reveal: fade + rise, once, respects reduced motion ---- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={`js-reveal ${className ?? ""}`}
      initial={rm ? false : { opacity: 0, y }}
      whileInView={rm ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Page-load orchestration (the signature moment, ~1s) ---- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function LoadStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} initial="hidden" animate="show" variants={container}>
      {children}
    </motion.div>
  );
}

export function LoadItem({
  children,
  className,
  y = 22,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const rm = useReducedMotion();
  const item: Variants = {
    hidden: rm ? { opacity: 1 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div className={`js-reveal ${className ?? ""}`} variants={item}>
      {children}
    </motion.div>
  );
}

/* ---- Pointer-tilt: the unexpected interaction on the hero totem ---- */
export function Tilt({
  children,
  className,
  max = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  if (rm) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
