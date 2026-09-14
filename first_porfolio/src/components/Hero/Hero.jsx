import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import soupBowl from '../../assets/bowl.svg';
import spoon from '../../assets/spoon.png';
import P from '../../assets/P.png';
import O from '../../assets/O1.png';
import R from '../../assets/R.png';
import T from '../../assets/T.png';
import F from '../../assets/F.png';
import O1 from '../../assets/O1.png';
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

export const Hero = () => {
  const rootRef = useRef(null);
  const letterRefs = useRef([]);

  const delta = useRef({ x: 0, y: 0 });
  const oldCroods = useRef({ x: 0, y: 0 });

  const letters = [
    { src: P, alt: "letter p", className: "p_image" },
    { src: O, alt: "letter o", className: "o_image" },
    { src: R, alt: "letter r", className: "r_image" },
    { src: T, alt: "letter t", className: "t_image" },
    { src: F, alt: "letter f", className: "f_image" },
    { src: O1, alt: "letter o1", className: "o1_image" },
    { src: L, alt: "letter l", className: "l_image" },
    { src: I, alt: "letter i", className: "i_image" },
    { src: O2, alt: "letter o2", className: "o2_image" }
  ];

  const randomLetters = [
    { src: Random_A, alt: "letter random a", className: "random_a_image" },
    { src: Random_B, alt: "letter random b", className: "random_b_image" },
    { src: Random_C, alt: "letter random c", className: "random_c_image" },
    { src: Random_Q, alt: "letter random q", className: "random_q_image" },
    { src: Random_S, alt: "letter random s", className: "random_s_image" },
    { src: Year21, alt: "year 21", className: "year_21"},
    { src: Year0, alt: "year 0", className: "year_0"},
    { src: Year22, alt: "year 22", className: "year_22"},
    { src: Year6, alt: "year 6", className: "year_6"}
  ];

  useEffect(() => {
    gsap.registerPlugin(InertiaPlugin);
    const root = rootRef.current;
    const letterEls = letterRefs.current.filter(Boolean);

    if (!root || letterEls.length === 0) return;

    const handleMouseMove = (e) => {
      delta.current.x = e.clientX - oldCroods.current.x;
      delta.current.y = e.clientY - oldCroods.current.y;

      oldCroods.current.x = e.clientX;
      oldCroods.current.y = e.clientY;
    };

    const createMouseEnterHandler = (element) => () => {
      const currentDeltaX = delta.current.x;
      const currentDeltaY = delta.current.y;

      const tl = gsap.timeline({
        onComplete: () => {
          tl.kill();
        }
      });

      tl.timeScale(1.2);

      tl.to(element, {
        inertia: {
          x: {
            velocity: currentDeltaX * 5,
            end: 0
          },
          y: {
            velocity: currentDeltaY * 5,
            end: 0
          },
        },
      });

      tl.fromTo(element, {
        rotate: 0
      }, {
        duration: 0.8,
        rotate: (Math.random() - 0.5) * 15,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      }, '<');
    };

    const handlers = letterEls.map((el) => createMouseEnterHandler(el));

    root.addEventListener("mousemove", handleMouseMove);
    letterEls.forEach((el, i) => el.addEventListener('mouseenter', handlers[i]));

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      letterEls.forEach((el, i) => el.removeEventListener('mouseenter', handlers[i]));
      gsap.killTweensOf(letterEls);
    };

  }, []);

  return <section id="home" className={styles.container}>
        <div className={styles.infoImg}>
            <div className={styles.content}>
                  <h2 className={styles.title}>Hi, I'm Bisera</h2>
                  <div className={styles.welcomeText}>
                    <h1 className={styles.welcome}>Welcome</h1>
                    <h1 className={styles.toMy}>to my</h1>
                  </div>
            </div>
            <div className={styles.imageContainer}>
                <img src={soupBowl} alt="soup bowl" className={styles.soup_image} />

                <div className={styles.randomLetters}>
                    {randomLetters.map((letter, index) => (
                      <img key={letter.className} src={letter.src} alt={letter.alt}
                      className={styles[letter.className]}
                      ref={(el)=> (letterRefs.current[index] = el)} />
                    ))}
                </div>

                <img src={spoon} alt="spoon" className={styles.spoon} />

                <div className={styles.letters} ref={rootRef}>
                    {letters.map((letter, index) => (
                        <img
                            key={letter.className}
                            src={letter.src}
                            alt={letter.alt}
                            className={styles[letter.className]}
                            ref={(el) => (letterRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <svg width="1390" height="434" viewBox="0 0 1400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.squiggle}>
                  <path d="M178.05 162.846C62.4617 174.99 -20.0967 311.653 4.286 325.184C15.2919 331.292 89.9809 246.583 207.928 264.467C307.927 279.63 376.786 392.943 452.455 420.414C540.509 452.382 672.861 426.768 762.242 355.863C925.777 226.131 917.914 140.477 1022.49 140.477C1141.21 140.477 1160.87 238.275 1248.93 283.013C1277.71 297.636 1356.09 309.1 1389.67 277.9C1395.17 272.787 1330.7 268.313 1266.24 140.477C1249.97 108.214 1194.62 -13.0305 963.525 1.14781C755.158 13.9317 705.624 286.837 489.402 270.86C405.435 264.656 322.714 147.648 178.05 162.846Z" fill="#E2C99E"/>
                </svg>
                <div className={styles.backgr_rect}></div>
            </div>
        </div>

        <div className={styles.buttons}>
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
              <button className={styles.checkMenu}>Check out Menu
                <span className={styles.blob_inner}>
                  <span className={styles.button_blobs}>
                    <span className={styles.blob}></span>
                    <span className={styles.blob}></span>
                    <span className={styles.blob}></span>
                    <span className={styles.blob}></span>
                  </span>
                </span>
               </button>
          </a>
        </div>
        </section>

}