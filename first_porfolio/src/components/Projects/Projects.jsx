import React, { useEffect, useRef, useState } from 'react';
import {gsap} from "gsap";
import {InertiaPlugin} from "gsap/InertiaPlugin";
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin";
import styles from "./Projects.module.css";
import {Carousel} from '../Carousel/Carousel';
import Plate from '../../assets/plate1.svg';
import Fork from '../../assets/fork_2.png';
import Knife from '../../assets/knife_2.png';
import smallEgg from '../../assets/small-egg.svg';
import smallAvocado from '../../assets/small-avocado.svg';
import smallBanana from '../../assets/small-banana.svg';
import smallBlueberry from '../../assets/small-blueberry.svg';
import purpleRect from '../../assets/purple-rectangle.svg';

gsap.registerPlugin(ScrambleTextPlugin);

const navIcons = [
    { src: smallEgg, className: styles.smallEgg },
    { src: smallAvocado, className: styles.smallAvocado },
    { src: smallBanana, className: styles.smallBanana },
    { src: smallBlueberry, className: styles.smallBlueberry },
];

const INGREDIENTS = [
    "Figma • UX Research",
    "HTML • CSS • JavaScript • React • Python",
    "Godot • GDScript • Procreate",
    "Work in progress",
];

const DESCRIPTIONS = [
    "Conducted user research and designed 'RacoonFinds' -> surplus food delivery app. Designed the mascot.",
    "Conducted experiments to find out the impact of Gestalt Principles on interface design. Made two versions of the same website for the experiments",
    "Made a 2D puzzle game with hand-drawn illustrations",
    "Work in progress",
];

const ARROW_COLORS = ["#FFE2A4", "#F4F7A9", "#F7C445", "#DAC4D5"];

const ARROW_LINE_COLORS = ["#E79300", "#859B04", "#592300", "#364874"];

export const Projects = ({ onOpenProject, activeToast, onActiveToastChange }) => {
    const [toastHovered, setToastHovered] = useState(false);
    const rootRef = useRef(null);
    const knifeRef = useRef(null);
    const forkRef = useRef(null);
    const ingredientsRef = useRef(null);
    const descriptionRef = useRef(null);

    const delta = useRef({x: 0, y: 0});
    const oldCroods = useRef({x: 0, y: 0});

    const handlePrevToast = () => {
        onActiveToastChange(prev => (prev - 1 + navIcons.length) % navIcons.length);
    };
    const handleNextToast = () => {
        onActiveToastChange(prev => (prev + 1) % navIcons.length);
    };

    useEffect( ()=> {
        gsap.registerPlugin(InertiaPlugin)
        const root = rootRef.current;
        const knife = knifeRef.current;
        const fork = forkRef.current;

        if(!root || !knife || !fork) return;

        const handleMouseMove = (e) => {
            delta.current.x = e.clientX - oldCroods.current.x;
            delta.current.y = e.clientY - oldCroods.current.y;

            oldCroods.current.x = e.clientX;
            oldCroods.current.y = e.clientY;
        };

        const JERK_BOUNDS = 18;
        const clampToBounds = (value) => gsap.utils.clamp(-JERK_BOUNDS, JERK_BOUNDS, value);

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
                        end: clampToBounds,
                    },
                    y: {
                        velocity: currentDeltaY * 5,
                        end: clampToBounds,
                    },
                },
            });

            tl.fromTo(element, {
                rotate: 0
            }, {
                duration: 0.4,
                rotate: (Math.random() - 0.5) * 15,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            }, '<');
        };

        const knifeMouseEnterHandler = createMouseEnterHandler(knife);
        const forkMouseEnterHandler = createMouseEnterHandler(fork);

        root.addEventListener("mousemove", handleMouseMove);
        knife. addEventListener('mouseenter', knifeMouseEnterHandler);
        fork.addEventListener('mouseenter', forkMouseEnterHandler);

        return () => {
            root.removeEventListener("mousemove", handleMouseMove);

            knife.removeEventListener('mouseenter', knifeMouseEnterHandler);
            fork.removeEventListener('mouseenter', forkMouseEnterHandler);

            gsap.killTweensOf([knife, fork]);
        };

    }, []);

    useEffect(() => {
        if (!toastHovered) return;
        const ingredients = ingredientsRef.current;
        const description = descriptionRef.current;
        if (!ingredients || !description) return;

        const tweens = [
            gsap.to(ingredients, {
                duration: 1.5,
                scrambleText: { text: INGREDIENTS[activeToast], chars: "upperCase", speed: 0.4, revealDelay: 0.2 },
                overwrite: true,
            }),
            gsap.to(description, {
                duration: 1.5,
                scrambleText: { text: DESCRIPTIONS[activeToast], chars: "lowerCase", speed: 0.4, revealDelay: 0.2 },
                overwrite: true,
            }),
        ];
        return () => tweens.forEach(t => t.kill());
    }, [toastHovered, activeToast]);

    return <section className={styles.container} ref={rootRef}>
        <img src={purpleRect} className={styles.purple_rect}></img>
        <h1 id='projects' className={styles.title}>Projects</h1>
        <div className={styles.plateDiv}>
            <img src={Plate} className={styles.plate}></img>
            <img src={Knife} className={styles.knife} ref={knifeRef}></img>
            <img src={Fork} className={styles.fork} ref={forkRef}></img>
            <div className={styles.carouselDiv}>
                <Carousel
                    index={activeToast}
                    onToastEnter={() => setToastHovered(true)}
                    onToastLeave={() => setToastHovered(false)}
                    onToastClick={onOpenProject}
                />
            </div>
            <p
                ref={ingredientsRef}
                className={`${styles.ingredients} ${toastHovered ? styles.visible : ''}`}
            ></p>
            <p
                ref={descriptionRef}
                className={`${styles.description} ${toastHovered ? styles.visible : ''}`}
            ></p>
        </div>
        <div
            className={styles.navPanelRow}
            style={{
                '--arrow-color': ARROW_COLORS[activeToast] ?? ARROW_COLORS[0],
                '--arrow-line-color': ARROW_LINE_COLORS[activeToast] ?? ARROW_LINE_COLORS[0],
            }}
        >
            <button
                type="button"
                className={styles.arrowL}
                onClick={handlePrevToast}
            >
                <svg
                    className={styles.arrowIcon}
                    viewBox="0 0 94 84" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="93.2046" height="83.528" rx="15" transform="matrix(-1 0 0 1 93.2051 0)" fill="var(--arrow-color)"/>
                    <path d="M58.252 17.7885C58.252 17.7885 35.0821 37.5103 34.9508 41.3774C34.8196 45.2444 58.252 66.5131 58.252 66.5131" stroke="var(--arrow-line-color)" strokeWidth="5" strokeLinecap="round"/>
                </svg>
            </button>

            <div className={styles.navPanel}>
                {navIcons.map((icon, i) => (
                    <img
                        key={i}
                        src={icon.src}
                        alt=""
                        className={`${icon.className} ${i === activeToast ? styles.activeIcon : ''}`}
                    />
                ))}
            </div>

            <button
                type="button"
                className={styles.arrowR}
                onClick={handleNextToast}
            >
                <svg
                    className={styles.arrowIcon}
                    viewBox="0 0 94 84" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="93.2046" height="83.528" rx="15" fill="var(--arrow-color)"/>
                    <path d="M34.9531 17.7885C34.9531 17.7885 58.123 37.5103 58.2543 41.3774C58.3855 45.2444 34.9531 66.5131 34.9531 66.5131" stroke="var(--arrow-line-color)" strokeWidth="5" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    </section>
};