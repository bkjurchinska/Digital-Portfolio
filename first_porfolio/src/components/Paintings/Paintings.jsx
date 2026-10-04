import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import styles from './Paintings.module.css';
import { GALLERY } from '../Gallery/galleryData';

gsap.registerPlugin(ScrambleTextPlugin);

const CTA_TEXT = 'Tap the ticket to enter';

const BARS = Array.from({ length: 34 }, (_, i) => [1, 2, 3, 2, 4, 1, 2][i % 7]);

export const Paintings = ({ onOpenGallery, onOpenReceipt }) => {
    const [phase, setPhase] = useState('idle');
    const [count, setCount] = useState(0);
    const timerRef = useRef(0);
    const ctaRef = useRef(null);

    const printed = phase !== 'idle';
    const serial = String(1900 + count).padStart(4, '0');

    const todayLabel = useMemo(
        () => new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
        }),
        [],
    );
    const worksLabel = `${GALLERY.length || 24} works`;

    useEffect(() => {
        if (phase !== 'ready' || !ctaRef.current) return;
        const tween = gsap.to(ctaRef.current, {
            duration: 1.1,
            scrambleText: { text: CTA_TEXT, chars: 'upperCase', speed: 0.4, revealDelay: 0.12 },
        });
        return () => tween.kill();
    }, [phase]);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const feed = () => {
        setCount((c) => c + 1);
        setPhase('printing');
        timerRef.current = setTimeout(() => setPhase('ready'), 1450);
    };

    const handlePrint = () => {
        if (phase === 'printing') return;
        clearTimeout(timerRef.current);
        if (phase === 'ready') {
            setPhase('idle');
            timerRef.current = setTimeout(feed, 620);
        } else {
            feed();
        }
    };

    return (
        <section id="gallery-entry" className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.copy}>

                    <h1 className={styles.title}>
                        The end of your<br />dining journey
                    </h1>

                    <p className={styles.lead}>
                        But before you go, would you like to check out our gallery?
                    </p>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.printBtn}
                            onClick={handlePrint}
                            disabled={phase === 'printing'}
                        >
                            {printed ? 'Print another ticket' : 'Print entrance ticket'}
                        </button>
                        <button
                            type="button"
                            className={styles.receiptBtn}
                            onClick={() => onOpenReceipt?.()}
                        >
                            No thanks, I'll get my receipt and pay
                        </button>
                    </div>
                </div>

                <div className={styles.stage}>
                    <div className={styles.printer}>
                        <div className={styles.printerHead}>
                            <span className={styles.printerReady}>
                                <span className={styles.lamp} aria-hidden="true" />
                                Ready
                            </span>
                        </div>
                        <div className={styles.slot} aria-hidden="true" />
                        <div className={styles.feet} aria-hidden="true">
                            <span />
                            <span />
                        </div>
                    </div>

                    <div className={styles.ticketArea} aria-live="polite">
                        <div className={styles.ticketClip}>
                            <button
                                type="button"
                                className={`${styles.ticketLink} ${printed ? styles.out : ''} ${phase === 'ready' ? styles.ready : ''}`}
                                onClick={() => phase === 'ready' && onOpenGallery?.()}
                                disabled={phase !== 'ready'}
                                aria-label="Enter the Gallery"
                            >
                                <span className={styles.ticket}>
                                    <span className={styles.ticketBody}>
                                        <span className={styles.ticketTop}>
                                            <span>
                                                <span className={styles.ticketKicker}>Entrance ticket</span>
                                                <span className={styles.ticketVenue}>The Gallery</span>
                                                <span className={styles.ticketMeta}>{todayLabel} · {worksLabel}</span>
                                            </span>
                                        </span>

                                        <span className={styles.barcode} aria-hidden="true">
                                            {BARS.slice(0, 16).map((w, i) => (
                                                <span key={i} style={{ height: `${w}px` }} />
                                            ))}
                                        </span>

                                        <span className={styles.ticketFoot}>
                                            <span ref={ctaRef} className={styles.ticketCta}>{CTA_TEXT}</span>
                                            <span className={styles.ticketSerial}>No. {serial}</span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                        {!printed && (
                            <div className={styles.placeholder}>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
