import React, { useEffect, useRef, useState } from 'react';
import styles from './ProjectPage.module.css';
import { PROJECTS } from './projectData';
import TicketTexture from '../../assets/ticket-txtr.svg';
import ComponentsBelt from '../../assets/componentsBelt.svg';
import Andie from '../../assets/andie.svg';
import AngryAndie from '../../assets/angryAndie.svg';
import GameplayVideo from '../../assets/Gameplay-rec.mp4';

const GAME_ASSETS = Object.entries(
    import.meta.glob('../../assets/GameAssets/*.svg', {
        eager: true,
        query: '?url',
        import: 'default',
    })
)
    .sort(
        ([a], [b]) =>
            parseInt(a.split('/').pop(), 10) - parseInt(b.split('/').pop(), 10)
    )
    .map(([, url]) => url);

export const ProjectPage = ({ index, onIndexChange, onClose }) => {
    const count = PROJECTS.length;
    const project = PROJECTS[index];
    const prev = PROJECTS[(index - 1 + count) % count];
    const next = PROJECTS[(index + 1) % count];
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const lightboxImages = [
        ...(project.gallery || []).flat(),
        ...(index === 2 ? GAME_ASSETS : []),
    ];
    const backdropRef = useRef(null);

    useEffect(() => {
        backdropRef.current?.scrollTo(0, 0);
    }, [index]);

    const stepLightbox = (dir) => {
        const i = lightboxImages.indexOf(lightboxSrc);
        if (i === -1) return;
        const n = lightboxImages.length;
        setLightboxSrc(lightboxImages[(i + dir + n) % n]);
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (lightboxSrc) setLightboxSrc(null);
                else onClose();
            }
            else if (e.key === 'ArrowRight') {
                if (lightboxImages.indexOf(lightboxSrc) !== -1) stepLightbox(1);
                else onIndexChange((i) => (i + 1) % count);
            }
            else if (e.key === 'ArrowLeft') {
                if (lightboxImages.indexOf(lightboxSrc) !== -1) stepLightbox(-1);
                else onIndexChange((i) => (i - 1 + count) % count);
            }
        };
        window.addEventListener('keydown', onKey);
        const bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';   
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = bodyOverflow;
        };
    }, [onClose, onIndexChange, count, lightboxSrc, index]);

    const gameStrip = (reverse) => (
        <div className={styles.gameStripWrap} aria-label="Game components">
            <div className={`${styles.gameTrack} ${reverse ? styles.gameTrackReverse : ''}`}>
                {[...GAME_ASSETS, ...GAME_ASSETS].map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        className={styles.gameItem}
                        onClick={() => setLightboxSrc(src)}
                        aria-label={`Take a closer look at component ${(i % GAME_ASSETS.length) + 1}`}
                    >
                        <img
                            className={`${styles.gameImage} ${src.includes('11-trinket2') ? styles.gameImageSmall : ''}`}
                            src={src}
                            alt=""
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div
            ref={backdropRef}
            className={styles.backdrop}
            style={{ '--accent': project.accent }}
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
        >
            <button className={styles.close} onClick={onClose} aria-label="Close project">✕</button>

            <nav className={styles.header} aria-label="Projects">
                {PROJECTS.map((p, i) => (
                    <button
                        key={i}
                        className={`${styles.headerItem} ${i === index ? styles.headerActive : ''}`}
                        onClick={() => onIndexChange(i)}
                        aria-current={i === index ? 'page' : undefined}
                    >
                        <span className={styles.headerNum}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={styles.headerName}>{p.navLabel}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.inner}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <p className={styles.eyebrow}>
                            Project {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                        </p>
                        <h1 className={styles.title}>{project.name}</h1>
                        <p className={styles.tagline}>{project.tagline}</p>
                        <p className={styles.tools}>{project.tools}</p>
                    </div>
                    <div className={styles.right}>
                        {project.mainImage ? (
                            <img
                                className={[
                                    styles.mainImage,
                                    index === 1 && styles.mainImageLarge,
                                    index === 2 && styles.mainImageGame,
                                ].filter(Boolean).join(' ')}
                                src={project.mainImage}
                                alt={project.name}
                            />
                        ) : index === 3 ? (
                            <div className={styles.progress} aria-label="Work in progress, about 10% complete">
                                <span className={styles.progressLabel}>Work in progress</span>
                                <div className={styles.progressTrack}>
                                    <div className={styles.progressFill} style={{ width: '10%' }} />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.imagePlaceholder} aria-hidden="true" />
                        )}
                    </div>
                </div>

                
                <div className={styles.intro}>
                    {index !== 3 && (
                        <div className={styles.ticket} style={{ '--ticket-texture': `url(${TicketTexture})` }}>
                            <div className={styles.ticketHoles}>
                                <div className={styles.hole1}></div>
                                <h2>Order ticket</h2>
                                <div className={styles.hole2}></div>
                            </div>
                            <p className={styles.ticketId}>#0526 &middot; Table 04 &middot; Team of 5</p>
                            <div className={styles.ticketDivider} />
                            <div className={styles.ticketBody}>
                                <div className={styles.ticketRow}>
                                    <span className={styles.ticketLabel}>Role</span>
                                    <span className={styles.ticketValue}>{project.role}</span>
                                </div>
                                <div className={styles.ticketRow}>
                                    <span className={styles.ticketLabel}>Year</span>
                                    <span className={styles.ticketValue}>{project.year}</span>
                                </div>
                                <div className={styles.ticketRow}>
                                    <span className={styles.ticketLabel}>Type of project</span>
                                    <span className={styles.ticketValue}>{project.programs}</span>
                                </div>
                                <div className={styles.ticketRow}>
                                    <span className={styles.ticketLabel}>Time</span>
                                    <span className={styles.ticketValue}>{project.time}</span>
                                </div>
                            </div>
                            <div className={styles.ticketDivider} />
                            <p className={styles.ticketServed}>Served</p>
                        </div>
                    )}
                    <div className={index === 2 ? `${styles.why} ${styles.whyNarrow}` : styles.why}>
                        <p className={styles.sectionEyebrow}>Backstory</p>
                        <h2>{index === 3 ? 'Why I want to make it' : 'Why I made it'}</h2>
                        <p>{project.why}</p>
                    </div>
                    {index === 2 && (
                        <img className={styles.introAndie} src={Andie} alt="Andie, the witch" />
                    )}
                </div>

                {index === 2 && gameStrip(true)}

                <div className={styles.main}>
                    <div className={index === 2 ? `${styles.how} ${styles.howGame}` : styles.how}>
                        <p className={styles.sectionEyebrow}>Process</p>
                        <h2>{index === 3 ? 'How I want to make it' : 'How it was made'}</h2>
                        <ol className={styles.steps}>
                            <li>
                                <h3>1. {project.step1}</h3>
                                <p>{project.step1Detail}</p>
                            </li>
                            <li>
                                <h3>2. {project.step2}</h3>
                                <p>{project.step2Detail}</p>
                            </li>
                            {index !== 2 && (
                                <>
                                    <li>
                                        <h3>3. {project.step3}</h3>
                                        <p>{project.step3Detail}</p>
                                    </li>
                                    {index !== 3 && (
                                        <li>
                                            <h3>4. {project.step4}</h3>
                                            <p>{project.step4Detail}</p>
                                        </li>
                                    )}
                                </>
                            )}
                        </ol>
                        {index === 2 && (
                            <video
                                className={styles.howVideo}
                                src={GameplayVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        )}
                    </div>
                    {project.gallery && project.gallery.length > 0 ? (
                        <div className={styles.galleryGrid}>
                            {project.gallery.map((row, i) => (
                                <div key={i} className={styles.galleryRow}>
                                    {row.map((src, j) => (
                                        <img
                                            key={j}
                                            className={[
                                                styles.galleryImage,
                                                row.length === 1 && styles.galleryImageFull,
                                                index === 3 && styles.galleryImageBig,
                                            ].filter(Boolean).join(' ')}
                                            src={src}
                                            alt=""
                                            onClick={() => setLightboxSrc(src)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.gallery} aria-hidden="true">
                            <span>Gallery</span>
                        </div>
                    )}
                </div>

                {index === 1 && (
                    <div className={styles.bookingVideos}>
                        <iframe
                            className={styles.bookingVideo}
                            src="https://www.youtube.com/embed/UjsjpQSKxj0?autoplay=1&mute=1&playsinline=1"
                            title="Booking app demo A"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <iframe
                            className={styles.bookingVideo}
                            src="https://www.youtube.com/embed/gHB_YmCYZOs?autoplay=1&mute=1&playsinline=1"
                            title="Booking app demo B"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
                {index === 0 && (
                    <div className={styles.beltWrap} aria-hidden="true">
                        <div className={styles.belt}>
                            <img className={styles.beltImage} src={ComponentsBelt} alt="" />
                            <img className={styles.beltImage} src={ComponentsBelt} alt="" />
                        </div>
                    </div>
                )}
                {index === 2 && gameStrip(false)}

                {index !== 3 && (
                    <div className={styles.results}>
                        <div className={styles.resultsText}>
                            <p className={styles.sectionEyebrow}>Results</p>
                            <h2>What I learned</h2>
                            <p>{project.results}</p>
                        </div>
                        {project.video && (
                            <video
                                className={styles.resultsVideo}
                                src={project.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        )}
                        {index === 2 && (
                            <img className={styles.resultsAndie} src={AngryAndie} alt="Andie, looking annoyed" />
                        )}
                    </div>
                )}

                <div className={styles.pager}>
                    <button
                        className={styles.pagerBtn}
                        onClick={() => onIndexChange((index - 1 + count) % count)}
                    >
                        <span className={styles.pagerLabel}>← Prev</span>
                        <span className={styles.pagerName}>{prev.name}</span>
                    </button>
                    <button
                        className={`${styles.pagerBtn} ${styles.next}`}
                        onClick={() => onIndexChange((index + 1) % count)}
                    >
                        <span className={styles.pagerLabel}>Next →</span>
                        <span className={styles.pagerName}>{next.name}</span>
                    </button>
                </div>
            </div>

            {lightboxSrc && (
                <div className={styles.lightbox} onClick={() => setLightboxSrc(null)}>
                    {lightboxImages.length > 1 && lightboxImages.indexOf(lightboxSrc) !== -1 && (
                        <>
                            <button
                                className={`${styles.lightboxArrow} ${styles.lightboxPrev}`}
                                onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                                onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        </>
                    )}
                    <img
                        className={`${styles.lightboxImage} ${GAME_ASSETS.includes(lightboxSrc) ? styles.lightboxImagePlain : ''}`}
                        src={lightboxSrc}
                        alt=""
                    />
                </div>
            )}
        </div>
    );
};
