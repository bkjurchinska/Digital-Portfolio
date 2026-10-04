// The images that make up the first screen (the Hero soup bowl, its letters
// and the spoon). These are deliberately the *same* module imports Hero.jsx
// uses, so Vite resolves them to the identical hashed URLs -- preloading them
// here warms the browser cache and Hero's own <img> tags then paint instantly
// instead of trickling in one by one.
//
// Anything below the fold is left out on purpose: the assets folder is
// hundreds of megabytes, and gating the whole site on it would mean staring
// at a loading screen for minutes.
import soupBowl from '../../assets/bowl.svg';
import spoon from '../../assets/spoon.png';
import P from '../../assets/P.png';
import O from '../../assets/O1.png';
import R from '../../assets/R.png';
import T from '../../assets/T.png';
import F from '../../assets/F.png';
import L from '../../assets/L.png';
import I from '../../assets/I.png';
import O2 from '../../assets/O2.png';
import Random_A from '../../assets/random_letters_A.png';
import Random_B from '../../assets/random_letters_B.png';
import Random_C from '../../assets/random_letters_C.png';
import Random_Q from '../../assets/random_letters_Q.png';
import Random_S from '../../assets/random_letters_S.png';
import Random_V from '../../assets/random_letters_v.png';
import Year21 from '../../assets/2026_21.png';
import Year0 from '../../assets/2026_0.png';
import Year22 from '../../assets/2026_22.png';
import Year6 from '../../assets/2026_6.png';
import Squiggle from '../../assets/squiggle.svg';

// Deduped: Hero reuses O1.png for both O's, so the same URL can appear twice.
export const criticalAssets = [...new Set([
  soupBowl, spoon,
  P, O, R, T, F, L, I, O2,
  Random_A, Random_B, Random_C, Random_Q, Random_S, Random_V,
  Year21, Year0, Year22, Year6,
  Squiggle,
])];
