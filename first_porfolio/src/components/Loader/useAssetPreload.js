import { useEffect, useRef, useState } from 'react';
import { criticalAssets } from './criticalAssets';


const TIMEOUT_MS = 20000;
const MIN_VISIBLE_MS = 700;

export function useAssetPreload(enabled = true) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startedAt = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    if (startedAt.current === null) startedAt.current = Date.now();

    let cancelled = false;
    const total = criticalAssets.length + 1;
    let done = 0;

    const tick = () => {
      if (cancelled) return;
      done += 1;
      setProgress(done / total);
      if (done >= total) finish();
    };

    const finish = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startedAt.current;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setProgress(1);
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, wait);
    };

    const images = criticalAssets.map((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
      return img;
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(tick, tick);
    } else {
      tick();
    }

    const timeout = window.setTimeout(finish, TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [enabled]);

  return { progress, ready };
}
