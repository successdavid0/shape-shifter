"use client";

import { useEffect, useState } from "react";

/** True on small / coarse-pointer devices — used to cap dpr and disable AA. */
export function useIsMobile(query = "(max-width: 768px)"): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}
