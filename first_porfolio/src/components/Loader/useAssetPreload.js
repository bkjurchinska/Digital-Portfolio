import { useEffect, useRef, useState } from 'react';
import { criticalAssets } from './criticalAssets';

// Never hold the visitor hostage to a stalled request: once this elapses we
// drop the loading screen and let the page render with whatever has arrived.
const TIMEOUT_MS = 20000;
// On a warm cache everything resolves in a few milliseconds, which would make
// the loading screen flash. Keep it up at least this long so it reads as a
// deliberate beat rather than a glitch.
const MIN_VISIBLE_MS = 700;

// Preloads the first screen's images (and the web fonts) and reports progress
// as a 0..1 fraction. `enabled` lets the caller delay the work -- e.g. while
// the small-screen notice is still up, there's no point pulling 15MB down.
export function useAssetPreload(enabled = true) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startedAt = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    if (startedAt.current === null) startedAt.current = Date.now();

    let cancelled = false;
    // Fonts count as one more "asset" so the headline doesn't swap typeface
    // the moment the page appears.
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
      // onerror too: a missing or broken asset shouldn't wedge the loader.
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
