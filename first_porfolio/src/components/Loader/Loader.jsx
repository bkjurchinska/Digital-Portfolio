import { useState } from 'react';
import styles from './Loader.module.css';
import CoffeeCup from '../../assets/coffee-cup.png';
import Coffee from '../../assets/coffee.png';
import CoffeeFoam from '../../assets/coffee-foam.png';

const CUP_LAYERS = 3;

export const Loader = ({ progress = 0, fadingOut = false }) => {
  const clamped = Math.min(1, Math.max(0, progress));
  const percent = Math.round(clamped * 100);

  // The loading screen's own illustration is three stacked PNGs -- without
  // this they'd pop in on top of each other (cup, then liquid, then foam),
  // which is exactly the layered-pop-in look this whole screen exists to
  // avoid. Keep it invisible until all three have decoded.
  const [loadedLayers, setLoadedLayers] = useState(0);
  const cupReady = loadedLayers >= CUP_LAYERS;
  const onLayerLoad = () => setLoadedLayers((n) => n + 1);

  return (
    <div
      className={`${styles.backdrop} ${fadingOut ? styles.fadingOut : ''}`}
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div className={styles.card}>
        <div className={styles.cupStage}>
          {/* Steam, rising over the cup. Kept separate from the spinning cup
              below it so it drifts straight up instead of orbiting. */}
          <svg className={styles.steam} viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="var(--maroon, #852736)" strokeWidth="4" strokeLinecap="round">
              <path className={styles.steam1} d="M80 60 C 72 46 88 38 80 22" />
              <path className={styles.steam2} d="M110 56 C 102 40 118 32 110 14" />
              <path className={styles.steam3} d="M140 60 C 132 46 148 38 140 22" />
            </g>
          </svg>

          {/* The coffee illustration itself -- cup, liquid surface and latte
              art foam, the same three layers the Receipt page stacks, here
              laid full-frame and spun like a dial while assets come in. */}
          <div className={`${styles.cup} ${cupReady ? styles.cupReady : ''}`}>
            <img src={CoffeeCup} className={styles.cupLayer} alt="" onLoad={onLayerLoad} />
            <img src={Coffee} className={styles.cupLayer} alt="" onLoad={onLayerLoad} />
            <img src={CoffeeFoam} className={styles.cupLayer} alt="" onLoad={onLayerLoad} />
          </div>
        </div>

        <h1 className={styles.title}>Warming up the kitchen</h1>
        <p className={styles.percent}>{percent}%</p>
      </div>
    </div>
  );
};
