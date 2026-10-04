import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Gallery.module.css';
import { GALLERY } from './galleryData';
import PictureFrame from '../../assets/picture-frame.png';

const PLACEHOLDER_COUNT = 9;

export const Gallery = ({ onClose, onOpenReceipt }) => {
    const items = GALLERY;
    const [lightbox, setLightbox] = useState(null);  
    const backdropRef = useRef(null);
    const trackRef = useRef(null);     
    const viewportRef = useRef(null); 
    const railRef = useRef(null);  
    const outroRef = useRef(null);  
    const [atOutro, setAtOutro] = useState(false);

    useEffect(() => {
        backdropRef.current?.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const scroller = backdropRef.current;
        const outro = outroRef.current;
        if (!scroller || !outro) return;

        const observer = new IntersectionObserver(
            ([entry]) => setAtOutro(entry.isIntersecting),
            { root: scroller }
        );
        observer.observe(outro);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const scroller = backdropRef.current;
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const rail = railRef.current;
        if (!scroller || !track || !viewport || !rail) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.registerPlugin(ScrollTrigger);

        const amount = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
        const sizeTrack = () => {
            track.style.height = window.innerHeight + amount() + 'px';
        };
        sizeTrack();

        const xTo = gsap.quickTo(rail, 'x', { duration: 0.6, ease: 'power3.out' });

        const st = ScrollTrigger.create({
            trigger: track,
            scroller,
            start: 'top top',
            end: () => '+=' + amount(),
            invalidateOnRefresh: true,
            onRefreshInit: sizeTrack,
            onUpdate: (self) => xTo(-amount() * self.progress),
        });

        const refresh = () => { sizeTrack(); st.refresh(); };
        const raf = requestAnimationFrame(refresh);
        const settle = setTimeout(refresh, 500);
        const imgs = Array.from(rail.querySelectorAll('img'));
        imgs.forEach((img) => {
            if (!img.complete) img.addEventListener('load', refresh, { once: true });
        });

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(settle);
            imgs.forEach((img) => img.removeEventListener('load', refresh));
            st.kill();
            gsap.killTweensOf(rail);
            gsap.set(rail, { x: 0 });
            track.style.height = '';
        };
    }, [items.length]);

    const step = (dir) => {
        setLightbox((i) =>
            i === null ? i : (i + dir + items.length) % items.length
        );
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (lightbox !== null) setLightbox(null);
                else onClose();
            } else if (e.key === 'ArrowRight' && lightbox !== null) step(1);
            else if (e.key === 'ArrowLeft' && lightbox !== null) step(-1);
        };
        window.addEventListener('keydown', onKey);
        const bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';   // freeze page behind
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = bodyOverflow;
        };
    }, [onClose, lightbox, items.length]);

    return (
        <div
            ref={backdropRef}
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery"
        >
            <button
                className={`${styles.close} ${atOutro ? styles.closeHidden : ''}`}
                onClick={onClose}
                aria-label="Close"
                aria-hidden={atOutro}
                tabIndex={atOutro ? -1 : 0}
            >✕</button>

            <div className={styles.inner}>
                <header className={styles.intro}>
                    <h1 className={styles.title}>Gallery</h1>
                    <p className={styles.tagline}>Thank you for coming by. Hope you enjoy the collection.</p>
                </header>
            </div>

            <div className={styles.railTrack} ref={trackRef}>
                <div className={styles.railStage}>
                    <div className={styles.railViewport} ref={viewportRef}>
                        <div className={styles.rail} ref={railRef}>
                            {items.length > 0
                                ? items.map((item, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={styles.tile}
                                        onClick={() => setLightbox(i)}
                                        aria-label={item.title ? `View ${item.title}` : `View image ${i + 1}`}
                                    >
                                        <img src={item.src} alt="" className={styles.tileImage} />
                                        <img src={PictureFrame} alt="" aria-hidden="true" className={styles.tileFrame} />
                                        {(item.title || item.year) && (
                                            <span className={styles.caption}>
                                                {item.title}
                                                {item.year ? <em> · {item.year}</em> : null}
                                            </span>
                                        )}
                                    </button>
                                ))
                                : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`${styles.tile} ${styles.tilePlaceholder}`}
                                        aria-hidden="true"
                                    >
                                        <span>Artwork</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.outro} ref={outroRef}>
                <p className={styles.footnote}>
                    * A lot of these designs aren't originally mine, I found the reference online. But every piece was painted by hand by me.
                </p>
                <div className={styles.outroButtons}>
                    <button type="button" className={styles.goBackBtn} onClick={onClose}>
                        Go back
                    </button>
                    <button type="button" className={styles.receiptBtn} onClick={() => onOpenReceipt?.()}>
                        Get receipt and pay
                    </button>
                </div>
            </div>

            {lightbox !== null && items[lightbox] && (
                <div className={styles.lightbox} onClick={() => setLightbox(null)}>
                    {items.length > 1 && (
                        <>
                            <button
                                className={`${styles.lightboxArrow} ${styles.lightboxPrev}`}
                                onClick={(e) => { e.stopPropagation(); step(-1); }}
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                                onClick={(e) => { e.stopPropagation(); step(1); }}
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        </>
                    )}
                    <img className={styles.lightboxImage} src={items[lightbox].src} alt="" />
                </div>
            )}
        </div>
    );
};
