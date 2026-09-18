"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { isWebGLAvailable } from "@/lib/webgl";

const NftViewer = dynamic(() => import("./NftViewer"), {
  ssr: false,
  loading: () => <ViewerPoster />,
});

/** Static square fallback — same dimensions as the canvas → zero CLS. */
function ViewerPoster({ src, alt }: { src?: string; alt?: string } = {}) {
  return (
    <div className="scanlines relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-surface">
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />
      {src && (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-contain p-8 drop-shadow-[0_0_50px_var(--color-accent-soft)]"
        />
      )}
    </div>
  );
}

export function NftViewerLoader({ src, alt }: { src: string; alt: string }) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (webgl === null) return <ViewerPoster src={src} alt={alt} />;
  if (!webgl || reduced) return <ViewerPoster src={src} alt={alt} />;
  return <NftViewer src={src} />;
}
