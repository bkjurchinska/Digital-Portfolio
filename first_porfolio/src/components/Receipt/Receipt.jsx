import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import styles from './Receipt.module.css';
import { RECEIPT } from './receiptData';
import CoffeeCup from '../../assets/coffee-cup.png';
import Coffee from '../../assets/coffee.png';
import CoffeeFoam from '../../assets/coffee-foam.png';
import Cinammon from '../../assets/cinammon.png';
import Plate from '../../assets/plate2.svg';
import CVFile from '../../assets/CV_ENG.pdf';

gsap.registerPlugin(ScrambleTextPlugin);

const BARS = Array.from({ length: 40 }, (_, i) => [1, 2, 3, 2, 4, 1, 3][i % 7]);

export const Receipt = ({ onClose }) => {
    const backdropRef = useRef(null);
    const containerRef = useRef(null);
    const slipRef = useRef(null);
    const totalRef = useRef(null);
    const [torn, setTorn] = useState(false);

    const stamp = useMemo(() => {
        const now = new Date();
        return {
            date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        };
    }, []);

    const orderNumber = useMemo(
        () => String(Math.floor(100000 + Math.random() * 900000)),
        [],
    );

    useEffect(() => {
        backdropRef.current?.scrollTo(0, 0);
        setTorn(false);

        let raf2 = 0;
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                setTorn(true);
                if (totalRef.current) {
                    gsap.to(totalRef.current, {
                        duration: 1.2,
                        delay: 0.35,
                        scrambleText: { text: RECEIPT.total, chars: 'upperCase', speed: 0.4, revealDelay: 0.15 },
                    });
                }
            });
        });

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        const bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = bodyOverflow;
        };
    }, [onClose]);

    return (
        <div
            ref={backdropRef}
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            aria-label="Receipt"
        >
            <section
                id="receipt"
                className={styles.container}
                ref={containerRef}
                aria-label="Receipt"
            >
            <div className={styles.leftCol}>
                <div>
                    <h1 className={styles.leftTitle}>Your check</h1>
                    <p className={styles.leftSubtitle}>Thank you for your visit! I hope to hear from you soon :)</p>
                </div>

                <div className={styles.infoBoxes}>
                    <div className={styles.infoBox}>
                        <p className={styles.infoLabel}>Looking for</p>
                        <p className={styles.infoValue}>Junior full-time positions and internships</p>
                    </div>
                    <div className={styles.infoBox}>
                        <p className={styles.infoLabel}>Average response time</p>
                        <p className={styles.infoValue}>Within 24 hours</p>
                    </div>
                    <div className={styles.infoBox}>
                        <p className={styles.infoLabel}>Available to start working</p>
                        <p className={styles.infoValue}>As soon as possible</p>
                    </div>
                </div>

                <button type="button" className={styles.goBackBtn} onClick={onClose}>
                    Go back
                </button>
            </div>

            <div className={styles.receiptCol}>
                <div
                    className={`${styles.slip} ${torn ? styles.torn : ''}`}
                    ref={slipRef}
                    role="figure"
                    aria-label="Printed receipt for your visit"
                >
                <header className={styles.head}>
                    <h2 className={styles.shopName}>{RECEIPT.shopName}</h2>
                </header>

                <div className={styles.rule} aria-hidden="true" />

                <p className={styles.meta}>
                    <span>{stamp.date}</span>
                    <span>{stamp.time}</span>
                </p>
                <p className={styles.meta}>
                    <span>ORDER</span>
                    <span>#{orderNumber}</span>
                </p>

                <div className={styles.rule} aria-hidden="true" />

                <div className={styles.contact}>
                    {RECEIPT.contact.map((row) => (
                        row.href ? (
                            <a
                                key={row.label}
                                className={styles.contactRow}
                                href={row.href}
                                target={row.href.startsWith('http') ? '_blank' : undefined}
                                rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                            >
                                <span className={styles.contactLabel}>{row.label}</span>
                                <span className={styles.contactValue}>{row.value}</span>
                            </a>
                        ) : (
                            <div key={row.label} className={styles.contactRow}>
                                <span className={styles.contactLabel}>{row.label}</span>
                                <span className={styles.contactValue}>{row.value}</span>
                            </div>
                        )
                    ))}
                </div>

                <div className={styles.rule} aria-hidden="true" />

                <p className={styles.totalsRow}>
                    <span>SUBTOTAL</span>
                    <span>{RECEIPT.subtotal}</span>
                </p>
                <p className={styles.totalsRow}>
                    <span>SERVICE</span>
                    <span>{RECEIPT.service}</span>
                </p>
                <p className={`${styles.totalsRow} ${styles.grandTotal}`}>
                    <span>TOTAL</span>
                    <a
                        ref={totalRef}
                        className={styles.totalLink}
                        href={CVFile}
                        download="Bisera_Kjurchinska_CV.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Download CV"
                    >
                        {RECEIPT.total}
                    </a>
                </p>

                <div className={styles.rule} aria-hidden="true" />

                <div className={styles.barcode} aria-hidden="true">
                    {BARS.map((w, i) => (
                        <span key={i} style={{ width: `${w}px` }} />
                    ))}
                </div>

                <p className={styles.thanks}>{RECEIPT.thanks}</p>
                </div>
            </div>

            <div className={styles.coffeeStrip} aria-hidden="true">
                <img src={CoffeeCup} className={styles.coffeeCup} alt="" />
                <img src={Coffee} className={styles.coffee} alt="" />
                <img src={CoffeeFoam} className={styles.coffeeFoam} alt="" />
                <img src={Cinammon} className={styles.cinammon} alt="" />
            </div>
            </section>
        </div>
    );
};
