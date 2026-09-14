import React, {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Draggable} from "gsap/Draggable";
import {InertiaPlugin} from "gsap/InertiaPlugin";
import styles from "./About.module.css";
// import selfPortrait from '../../assets/self_portrait.png';
// import Arrow from '../../assets/arrow.png';
import Cracker1 from '../../assets/biscuit1.png';
import Cracker2 from '../../assets/biscuit2.png';
import Olive1 from '../../assets/olive1.png';
import Olive2 from '../../assets/olive2.png';
import Olive3 from '../../assets/olive3.png';
import Fig from '../../assets/Fig.png';
import TomatoStem from '../../assets/tomato-stem.png';
import Tomato1 from '../../assets/tomato1.png';
import Tomato2 from '../../assets/tomato2.png';
import Tomato3 from '../../assets/tomato3.png';
import Tomato4 from '../../assets/tomato4.png';
import Tomato5 from '../../assets/tomato5.png';
import Tomato6 from '../../assets/tomato6.png';
import CowCheese from '../../assets/cheese.png';
// import Mozarella from '../../assets/mozzarella.png';
import Board from '../../assets/charc-board.png';
import SliceTop from '../../assets/slice-top.png';
import SliceBottom from '../../assets/slice-bottom.png';


export const About = () => {

    const containerRef = useRef(null);
    const cheeseref = useRef(null);
    const squiggleRef = useRef(null);
    const viewportRef = useRef(null);
    const sliceRef = useRef(null);
    const cheeseDraggableRef = useRef(null);
    const sliceTopRef = useRef(null);
    const sliceBottomRef = useRef(null);
    const [sliceRemoved, setSliceRemoved] = useState(false);

    const SNAP_RADIUS_RATIO = 0.75; // fraction of the tomato's own width it can be dragged before it stops snapping back
    const tomato1Ref = useRef(null);
    const tomato2Ref = useRef(null);
    const tomato3Ref = useRef(null);
    const tomato4Ref = useRef(null);
    const tomato5Ref = useRef(null);
    const tomato6Ref = useRef(null);
    const experienceRef = useRef(null);
    const vineBoundsRef = useRef(null);

    const textContainerRef = useRef(null);
    const arrow1Ref = useRef(null);
    const arrow2Ref = useRef(null);
    const arrow3Ref = useRef(null);

    const CRACKER2_REVEAL_DURATION = 1.6; // seconds - cracker spin duration
    const CRACKER2_AUTO_HIDE_DELAY = 15000; // ms

    const cracker2AutoHideRef = useRef(null);
    const [cracker2Active, setCracker2Active] = useState(false);

    const handleCracker2Click = () => {
        clearTimeout(cracker2AutoHideRef.current);
        setCracker2Active((prev) => {
            const next = !prev;
            if (next) {
                cracker2AutoHideRef.current = setTimeout(
                    () => setCracker2Active(false),
                    CRACKER2_AUTO_HIDE_DELAY
                );
            }
            return next;
        });
    };

    useEffect(() => {
        return () => clearTimeout(cracker2AutoHideRef.current);
    }, []);

    const CRACKER1_REVEAL_DURATION = 1.6; // seconds - cracker spin duration
    const CRACKER1_AUTO_HIDE_DELAY = 15000; // ms

    const cracker1AutoHideRef = useRef(null);
    const [cracker1Active, setCracker1Active] = useState(false);

    const handleCracker1Click = () => {
        clearTimeout(cracker1AutoHideRef.current);
        setCracker1Active((prev) => {
            const next = !prev;
            if (next) {
                cracker1AutoHideRef.current = setTimeout(
                    () => setCracker1Active(false),
                    CRACKER1_AUTO_HIDE_DELAY
                );
            }
            return next;
        });
    };

    useEffect(() => {
        return () => clearTimeout(cracker1AutoHideRef.current);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

        const arrowPathGroups = [arrow1Ref, arrow2Ref, arrow3Ref]
            .map((ref) => ref.current && ref.current.querySelectorAll("path"))
            .filter(Boolean);

        if (!textContainerRef.current || arrowPathGroups.length === 0) return;

        gsap.set(arrowPathGroups.flatMap((paths) => Array.from(paths)), { drawSVG: "0%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textContainerRef.current,
                start: "top 70%",
                end: "+=550",
                scrub: 0.6,
            },
        });

        arrowPathGroups.forEach((paths) => {
            tl.to(paths, { drawSVG: "100%", ease: "none" });
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (!cheeseref.current) return;

        gsap.registerPlugin(Draggable, InertiaPlugin);

        const [cheeseDraggable] = Draggable.create(cheeseref.current, {
            type: "rotation",
            inertia: true,
            force3D: true,
            trigger: cheeseref.current,
            dragResistance: 0,
        });
        cheeseDraggableRef.current = cheeseDraggable;

        return () => {
            cheeseDraggable?.kill();
        };
    }, []);

    useEffect(() => {
      const tomatoRefs = [tomato1Ref, tomato2Ref, tomato3Ref, tomato4Ref, tomato5Ref, tomato6Ref];

      const draggables = tomatoRefs
        .filter((ref) => ref.current)
        .map((ref) =>
          Draggable.create(ref.current, {
            type: "x,y",
            bounds: vineBoundsRef.current,
            inertia: true,
            force3D: true,
            cursor: "grab",
            activeCursor: "grabbing",
            onPress() {
              gsap.set(this.target, { zIndex: 10 });
            },
            onDragEnd() {
              const distance = Math.hypot(this.x, this.y);
              const snapRadius = this.target.offsetWidth * SNAP_RADIUS_RATIO;

              if (distance <= snapRadius) {
                gsap.to(this.target, {
                  x: 0,
                  y: 0,
                  duration: 0.8,
                  ease: "elastic.out(1, 0.3)",
                  onComplete: () => gsap.set(this.target, { zIndex: "" }),
                });
              } else {
                gsap.set(this.target, { zIndex: "" });
              }
            },
          })[0]
    );

    // document.fonts.ready.then(initDraggables);

  return () => {
    draggables.forEach((d) => d.kill());
  };
}, []);


    // Pans the background squiggle sideways as the section scrolls by. This
    // used to track raw `window.scrollY`, so the pan's budget (maxOffset)
    // got spent by scrolling ANYWHERE on the whole page, not just while
    // this section was in view -- on a long page that budget was often
    // exhausted well before (or after) About was actually on screen, so by
    // the time you got here the strip was already pinned at one end with
    // its edge showing. A ScrollTrigger scoped to this section (same
    // pattern as the arrow-draw animation below, and Gallery's rail pan)
    // ties the pan directly to this section's own scroll-through instead.
    useEffect(() => {
        const strip = squiggleRef.current;
        const viewport = viewportRef.current;
        const trigger = containerRef.current;
        if (!strip || !viewport || !trigger) return;

        gsap.registerPlugin(ScrollTrigger);

        // The strip is flex-centred inside the viewport (x: 0 shows it dead
        // centre, with (scrollWidth - clientWidth) / 2 of hidden overlap on
        // EACH side). So the furthest it can pan before exposing its edge is
        // half that total overflow, not the whole thing -- panning the full
        // amount overshoots past the safe range around the scroll midpoint,
        // exposing a hard edge for the rest of the time the section is still
        // in view. Halving it also reads as a slower, gentler drift overall.
        const amount = () => Math.max(0, (strip.scrollWidth - viewport.clientWidth) / 2);
        const xTo = gsap.quickTo(strip, "x", { duration: 0.5, ease: "power2.out" });

        const st = ScrollTrigger.create({
            trigger,
            start: "top bottom",
            end: "bottom top",
            invalidateOnRefresh: true,
            onUpdate: (self) => xTo(-amount() * self.progress),
        });

        return () => {
            st.kill();
            gsap.killTweensOf(strip);
        };
    }, []);

    return <section id="about" className={styles.container} ref={containerRef}>
        <div className={styles.boardContainer}>
            <img src={Board} className={styles.charcBoard}></img>
            <div className={styles.squiggleViewport} ref={viewportRef}>
                <svg className={styles.squigly_backgr} ref={squiggleRef} width="11344" height="3400" viewBox="0 0 11344 4209" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M452.533 164.103C452.533 164.103 739.815 9.14022 949.491 4.92607C1167.27 0.548969 1468.81 164.103 1468.81 164.103C1468.81 164.103 1838.93 357.313 2095.08 342.372C2319.97 329.254 2636.77 164.103 2636.77 164.103C2636.77 164.103 2938.29 6.86743 3156.09 4.92607C3377.71 2.95069 3685.9 164.103 3685.9 164.103C3685.9 164.103 3988.8 361.814 4205.23 342.372C4389.23 325.842 4634.38 164.103 4634.38 164.103C4634.38 164.103 4939.54 -3.03334 5159.3 4.92609C5364.64 12.3631 5644.38 164.103 5644.38 164.103C5644.38 164.103 5929.81 372.617 6135.04 342.372C6296.71 318.546 6654.47 164.103 6654.47 164.103C6654.47 164.103 6881.61 4.92612 7155.57 4.92609C7429.54 4.92607 7508.11 103.192 7660.08 164.103C7812.05 225.014 7881.77 342.372 8036.44 342.372C8036.44 1581.43 8049.39 2585.15 8045.61 3824.2C7905.83 3824.2 7763.77 3926.29 7660.08 4007.12C7556.39 4087.94 7365.84 4203.9 7179.34 4204.05C6992.58 4204.2 6871.26 4176.77 6654.47 4007.12C6437.67 3837.46 6297.08 3848.24 6135.04 3824.2C5929.52 3793.7 5644.38 4007.12 5644.38 4007.12C5644.38 4007.12 5364.01 4196.75 5159.3 4204.05C4940.12 4211.87 4634.38 4007.12 4634.38 4007.12C4634.38 4007.12 4389.57 3840.88 4205.23 3824.2C3988.52 3804.59 3685.9 4007.12 3685.9 4007.12C3685.9 4007.12 3377.13 4205.99 3156.09 4204.05C2938.88 4202.14 2636.77 4007.12 2636.77 4007.12C2636.77 4007.12 2332.63 3841.97 2095.08 3824.2C1827.78 3804.2 1468.81 4007.12 1468.81 4007.12C1468.81 4007.12 1166.68 4208.35 949.491 4204.05C740.429 4199.91 452.533 4007.12 452.533 4007.12L4.5 3728.56V483.3L452.533 164.103Z" fill="#E2C99E"/>
                    <path d="M8036.44 342.372C8036.44 1581.43 8049.39 2585.15 8045.61 3824.2C8332.61 3824.2 8425.41 3926.95 8491.86 4007.12C8558.31 4087.28 8730.16 4204.05 8932.95 4204.05C9135.74 4204.05 9298.43 4092.44 9392.38 4007.12C9486.33 3921.79 9597.2 3824.2 9779.63 3824.2C9988.72 3824.2 10062 3917.45 10149.1 4007.12C10236.2 4096.78 10393.9 4212.63 10591.9 4204.05C10772.2 4196.24 10995.2 4007.12 10995.2 4007.12L11339.5 3719.54V342.372L11045.1 212.132C11045.1 212.132 10812.3 18.4822 10611.4 4.926C10443.5 -6.40666 10196.7 212.132 10196.7 212.132C10196.7 212.132 9968.7 359.714 9762.44 342.372C9554.29 324.871 9381.5 187.134 9381.5 187.134C9381.5 187.134 9152.93 4.92609 8932.95 4.92609C8712.98 4.92609 8470.09 187.134 8470.09 187.134C8470.09 187.134 8239.23 342.372 8036.44 342.372Z" fill="#E2C99E"/>
                    <path d="M8036.44 342.372C7881.77 342.372 7812.05 225.014 7660.08 164.103C7508.11 103.192 7429.54 4.92607 7155.57 4.92609C6881.61 4.92612 6654.47 164.103 6654.47 164.103C6654.47 164.103 6296.71 318.546 6135.04 342.372C5929.81 372.617 5644.38 164.103 5644.38 164.103C5644.38 164.103 5364.64 12.3631 5159.3 4.92609C4939.54 -3.03334 4634.38 164.103 4634.38 164.103C4634.38 164.103 4389.23 325.842 4205.23 342.372C3988.8 361.814 3685.9 164.103 3685.9 164.103C3685.9 164.103 3377.71 2.95069 3156.09 4.92607C2938.29 6.86743 2636.77 164.103 2636.77 164.103C2636.77 164.103 2319.97 329.254 2095.08 342.372C1838.93 357.313 1468.81 164.103 1468.81 164.103C1468.81 164.103 1167.27 0.548969 949.491 4.92607C739.815 9.14022 452.533 164.103 452.533 164.103L4.5 483.3V3728.56L452.533 4007.12C452.533 4007.12 740.429 4199.91 949.491 4204.05C1166.68 4208.35 1468.81 4007.12 1468.81 4007.12C1468.81 4007.12 1827.78 3804.2 2095.08 3824.2C2332.63 3841.97 2636.77 4007.12 2636.77 4007.12C2636.77 4007.12 2938.88 4202.14 3156.09 4204.05C3377.13 4205.99 3685.9 4007.12 3685.9 4007.12C3685.9 4007.12 3988.52 3804.59 4205.23 3824.2C4389.57 3840.88 4634.38 4007.12 4634.38 4007.12C4634.38 4007.12 4940.12 4211.87 5159.3 4204.05C5364.01 4196.75 5644.38 4007.12 5644.38 4007.12C5644.38 4007.12 5929.52 3793.7 6135.04 3824.2C6297.08 3848.24 6437.67 3837.46 6654.47 4007.12C6871.26 4176.77 6992.58 4204.2 7179.34 4204.05C7365.84 4203.9 7556.39 4087.94 7660.08 4007.12C7763.77 3926.29 7905.83 3824.2 8045.61 3824.2M8036.44 342.372C8036.44 1581.43 8049.39 2585.15 8045.61 3824.2M8036.44 342.372C8239.23 342.372 8470.09 187.134 8470.09 187.134C8470.09 187.134 8712.98 4.92609 8932.95 4.92609C9152.93 4.92609 9381.5 187.134 9381.5 187.134C9381.5 187.134 9554.29 324.871 9762.44 342.372C9968.7 359.714 10196.7 212.132 10196.7 212.132C10196.7 212.132 10443.5 -6.40666 10611.4 4.926C10812.3 18.4822 11045.1 212.132 11045.1 212.132L11339.5 342.372V3719.54L10995.2 4007.12C10995.2 4007.12 10772.2 4196.24 10591.9 4204.05C10393.9 4212.63 10236.2 4096.78 10149.1 4007.12C10062 3917.45 9988.72 3824.2 9779.63 3824.2C9597.2 3824.2 9486.33 3921.79 9392.38 4007.12C9298.43 4092.44 9135.74 4204.05 8932.95 4204.05C8730.16 4204.05 8558.31 4087.28 8491.86 4007.12C8425.41 3926.95 8332.61 3824.2 8045.61 3824.2" stroke="#E2C99E" stroke-width="9"/>
                </svg>
            </div>
        </div>
        <h2 className={styles.title}>About</h2>
        <div className={styles.textContainer} ref={textContainerRef}>
                {/* <img src={selfPortrait} alt="pic of me" className={styles.self_portrait} /> */}
                <div className={styles.description}>
                    <h3 className={styles.intro}>Hello!</h3>
                    <div className={styles.descriptionText}>
                        <p className={styles.welcome}>Welcome to my little restaurant! Enjoy this charcuterie board I prepared while you get to know me :)</p>
                        <div className={styles.bachelors}>
                            <img src={Olive1} className={styles.olive} alt="olive"></img>
                            <p><b>Bachelor's Degree in Computer Science</b> <br></br> <i>Constructor University</i></p>
                        </div>
                        {/* arrow one */}
                        <svg ref={arrow1Ref} className={styles.arrow1} width="192" height="92" viewBox="0 0 192 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.8497 2.5C19.7282 2.72745 15.138 3.6441 11.4576 5.82201C7.67056 8.06306 5.02039 12.3558 3.40762 17.1802C0.781111 25.0372 4.31739 29.1312 7.18105 35.7855C9.37955 40.8942 14.4075 43.6046 21.9819 47.1713C27.9072 49.9614 32.5613 50.7449 38.7504 51.889C50.5173 54.0642 56.6838 49.6008 60.5916 48.4533C66.0385 46.8538 68.1798 41.344 69.2205 37.3225C69.9368 34.5545 68.4279 31.2333 66.2535 28.3662C62.4101 23.2984 56.9525 24.5548 53.2825 25.1234C50.0759 25.6202 48.8957 28.9106 47.8653 31.0851C46.5286 33.9059 45.9045 39.4487 46.2456 45.7619C46.5769 51.8927 54.1474 54.4115 58.5239 56.138C63.5352 58.1148 78.4078 57.637 87.2435 56.8375C91.1203 56.4867 101.869 53.7498 111.697 51.441C119.584 49.5881 125.591 48.4567 130.202 47.3023C134.937 46.1168 139.61 46.1547 146.161 46.0341C151.177 45.9418 155.241 48.2086 158.922 49.4767C163.284 52.337 168.336 57.3889 169.846 63.3437C169.963 66.5416 169.963 72.0002 169.963 77.6242" stroke="#FCF3E2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M152.732 72.7996C153.415 74.1711 157.529 77.376 160.993 80.3706C164.07 83.0311 167.192 85.8808 170.752 88.6446C175.286 92.1644 180.976 80.1742 184.195 76.2594C184.891 75.3359 185.346 74.4261 185.921 73.5026C186.497 72.579 187.179 71.6693 189.261 70.0427" stroke="#FCF3E2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <img src={Fig} className={styles.fig1}></img>
                        <p className={styles.stem}>Even though I got into STEM, I'm a very imaginative and artsy person.
                            I like to sprinkle my creativity
                            into everything I make: <u>websites</u>, <u>apps</u>, <u>illustrations</u>, and <u>this portfolio</u>!
                        </p>
                        <img src={CowCheese} ref={cheeseref} className={styles.cheese} alt="wheel of cheese" draggable="false"></img>
                    </div>
                </div>
                
                <div className={styles.experience} ref={experienceRef}>
                    <p className={styles.corp}>I have some experience working in a corporate environment</p>
                    {/* second arrow */}
                    <svg ref={arrow2Ref} className={styles.arrow2} width="189" height="91" viewBox="0 0 189 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M167.624 2.00049C168.746 2.55821 172.109 5.54959 177.275 12.1069C185.186 22.1495 183.207 30.6973 183.212 40.4601C183.215 45.7741 179.094 48.5554 173.562 52.8735C169.115 56.3445 162.588 57.3887 154.696 57.5859C151.82 57.6577 149.98 55.7156 148.761 53.8424C145.659 49.0793 148.279 41.8178 149.214 40.5052C151.363 37.4899 156.155 37.1195 169.168 37.0209C175.216 36.9751 178.125 40.2968 181.041 42.1783C184.588 44.468 186.204 50.4257 186.499 67.9374C186.621 75.1208 181.911 78.6043 178.435 81.7957C174.654 85.2669 166.903 87.0545 161.735 88.0967C148.881 90.6885 140.032 82.5703 136.747 80.2211C133.485 77.8875 126.185 72.4639 120.785 68.0162C115.91 64.0009 109.239 59.8449 98.6737 53.7664C88.0024 47.6271 79.0101 44.8204 75.6357 43.6966C72.9214 42.7926 67.9516 41.0685 59.8056 39.5672C51.2137 37.9837 42.4151 39.7334 35.5677 41.9812C27.8402 44.5178 23.0585 51.1693 20.5038 54.9438C18.1574 58.6957 16.0899 62.4588 14.9661 63.8644C14.3999 64.5263 13.8422 65.084 13.2676 66.222" stroke="#FCF3E2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 55.5183C2.74363 61.4673 4.61394 69.3654 7.88979 76.3171C9.07156 78.8249 11.7234 77.6916 13.1486 77.1227C17.1991 75.0552 20.951 72.9877 23.5762 71.7709C24.7141 71.1117 25.4578 70.3681 27.3506 69.602" stroke="#FCF3E2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p className={styles.evn}><b>IT intern</b> <br></br> <i>EVN Macedonia</i></p>
                    <img src={Olive2} className={styles.olive2} alt="olive"></img>
                    <img src={Fig} className={styles.fig2}></img>
                    <p className={styles.people}>And I love working with and for people</p>
                    {/* third arrow */}
                    <svg ref={arrow3Ref} className={styles.arrow3} width="76" height="185" viewBox="0 0 76 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38.8662 2.00049C28.7813 21.5757 23.2155 33.4921 19.8558 41.4007C18.4704 44.9566 16.5081 50.451 15.4972 54.1645C14.4863 57.8779 14.4863 59.644 14.4863 61.4635" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 126.873C2 133.58 2.7849 141.525 4.5688 145.194C6.68346 149.543 11.8946 151.051 16.1492 152.24C24.8473 154.671 30.3163 150.076 35.0852 146.805C38.2231 144.653 41.0315 142.738 44.7004 140.657C48.2881 138.621 52.722 136.791 56.0995 135.894C57.6312 135.486 59.471 136.381 61.252 137.764C65.3336 140.932 66.4104 147.661 66.5204 154.398C66.6173 160.333 62.0696 164.323 60.6752 167.198C60.2797 167.897 59.6911 168.485 58.7991 169.966C57.9072 171.447 56.7298 173.801 53.7328 177.417" stroke="#FCF3E2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M46.5977 161.956C46.7939 164.911 47.9772 170.852 48.4796 174.726C48.7989 177.187 48.9762 179.979 49.5649 181.766C50.8574 185.689 58.2643 178.618 62.0461 177.321C65.6139 176.031 68.7893 175.24 70.4691 174.547C71.364 174.247 72.3452 174.051 73.9507 173.849" stroke="#FCF3E2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p className={styles.rea}><b>Residential Engagement Assistant</b> <br></br> <i>Constructor University</i></p>
                    <img src={Olive3} className={styles.olive3} alt="olive"></img>
                    <p className={styles.student}>Nominated as <b>Student of The Year</b> by peers <br></br> <i>Constructor University</i></p>
                    <div className={styles.wholeTomato}>
                        <img src={TomatoStem} className={styles.tomatoStem} alt="tomatoes on a vine"></img>
                        <div className={styles.vineBounds} ref={vineBoundsRef}></div>
                        <img src={Tomato1} className={styles.tomato1} ref={tomato1Ref} alt="tomato" draggable="false"></img>
                        <img src={Tomato2} className={styles.tomato2} ref={tomato2Ref} alt="tomato" draggable="false"></img>
                        <img src={Tomato3} className={styles.tomato3} ref={tomato3Ref} alt="tomato" draggable="false"></img>
                        <img src={Tomato4} className={styles.tomato4} ref={tomato4Ref} alt="tomato" draggable="false"></img>
                        <img src={Tomato5} className={styles.tomato5} ref={tomato5Ref} alt="tomato" draggable="false"></img>
                        <img src={Tomato6} className={styles.tomato6} ref={tomato6Ref} alt="tomato" draggable="false"></img>
                    </div>
                    
                    <img
                        src={Cracker1}
                        className={`${styles.cracker1} ${cracker1Active ? styles.cracker1Spinning : ""}`}
                        style={{ animationDuration: `${CRACKER1_REVEAL_DURATION}s` }}
                        alt="cracker"
                        draggable="false"
                        onClick={handleCracker1Click}
                    ></img>
                    <img src={Olive1} className={styles.olive4} alt="olive"></img>
                    <div className={styles.cracker2Wrap}>
                        <img
                            src={Cracker2}
                            className={`${styles.cracker2} ${cracker2Active ? styles.cracker2Spinning : ""}`}
                            style={{ animationDuration: `${CRACKER2_REVEAL_DURATION}s` }}
                            alt="cracker"
                            draggable="false"
                            onClick={handleCracker2Click}
                        ></img>
                    </div>

                    <img src={SliceTop} ref={sliceTopRef} className={styles.slice_top}></img>
                    <img src={SliceBottom} ref={sliceBottomRef} className={styles.slice_bottom}></img>
                    {/* <img src={Fig} className={styles.fig2} id="figNum2"></img> */}
                    {/* <img src={Fig} className={styles.fig3} id="fig3"></img> */}
                    {/* <div className={styles.education}>
                        <h3>Education</h3>
                        <p><span>High School diploma</span> majoring in Maths</p>
                        <p><span>B.Sc. in Computer Science</span> at Constructor University (formerly Jacobs University)</p>
                        <br></br>
                    </div> */}

                    {/* <img src={Cracker1} className={styles.cracker1} alt="cracker"></img> */}
                    {/* <img src={Olive1} className={styles.olive1} alt="olive"></img> */}
                    {/* <img src={Olive2} className={styles.olive2} alt="olive"></img> */}
                    {/* <img src={Mozarella} className={styles.mozarella} alt="mozzarella"></img> */}
                    {/* <div className={styles.experience}>
                        <h3>Experience</h3>
                        <p><span>Internship</span> at <a href="https://www.evn.mk/" target="_blank" rel="noopener noreferrer">EVN Macedonia</a></p>
                        <p><span>Residential Engagement Assistant</span> at Constructor University</p>
                        <p><span>Student Assistant</span> at Constructor University</p>
                        <img src={Cracker2} className={styles.cracker2} alt="cracker"></img>
                        <img src={Olive1} className={styles.olive3} alt="olive"></img>
                        <img src={Olive2} className={styles.olive4} alt="olive"></img>
                        <img src={Olive1} className={styles.olive5} alt="olive"></img>
                    </div> */}
                    {/* <div className={styles.accomp}>
                            <h3>Accomplishments</h3>
                            <p>Won 1st place for national essay competition - 
                                represented North Macedonia at the <span>70th anniversary of the Council of Europe</span> in Strasbourg
                            </p>
                            <p><span>Student of the year</span> - was nominated by the university community for building a welcoming environment and organizing events</p>
                    </div> */}
                </div>
        </div>
        

    </section>
}