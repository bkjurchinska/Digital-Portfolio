import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './DesignPage.module.css';
import { DESIGNS } from './designData';
import { SardineText } from '../SardineText/SardineText';

// How many empty tiles to show while a gallery has no images yet.
const PLACEHOLDER_COUNT = 6;        // full-page gallery
const SECTION_PLACEHOLDERS = 3;     // per sub-section gallery

// Full-screen "Design" page. `index` picks which of the three shows;
// `onIndexChange` swaps to another (header tabs, the pager, or the left/right
// arrow keys); `onClose` dismisses it (button or Escape).
export const DesignPage = ({ index, onIndexChange, onClose }) => {
    const count = DESIGNS.length;
    const design = DESIGNS[index];
    const prev = DESIGNS[(index - 1 + count) % count];
    const next = DESIGNS[(index + 1) % count];
    // Every image on the page, flattened -- drives the lightbox stepping whether
    // the page is one gallery or a set of sub-sections.
    const images = useMemo(
        () => (design.sections
            ? design.sections.flatMap((s) => s.gallery || [])
            : (design.gallery || [])),
        [design],
    );

    const [lightboxSrc, setLightboxSrc] = useState(null);
    const backdropRef = useRef(null);

    // Open every page at the top, including when switching between them.
    useEffect(() => {
        backdropRef.current?.scrollTo(0, 0);
    }, [index]);

    // Step through the gallery lightbox; wraps around.
    const stepLightbox = (dir) => {
        const i = images.indexOf(lightboxSrc);
        if (i === -1) return;
        setLightboxSrc(images[(i + dir + images.length) % images.length]);
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (lightboxSrc) setLightboxSrc(null);
                else onClose();
            }
            else if (e.key === 'ArrowRight') {
                if (images.indexOf(lightboxSrc) !== -1) stepLightbox(1);
                else onIndexChange((i) => (i + 1) % count);
            }
            else if (e.key === 'ArrowLeft') {
                if (images.indexOf(lightboxSrc) !== -1) stepLightbox(-1);
                else onIndexChange((i) => (i - 1 + count) % count);
            }
        };
        window.addEventListener('keydown', onKey);
        const bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';     // freeze the page behind
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = bodyOverflow;
        };
    }, [onClose, onIndexChange, count, lightboxSrc, index, images]);

    return (
        <div
            ref={backdropRef}
            className={styles.backdrop}
            style={{ '--accent': design.accent }}
            role="dialog"
            aria-modal="true"
            aria-label={design.name}
        >
            <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

            <nav className={styles.header} aria-label="Design pages">
                {DESIGNS.map((d, i) => (
                    <button
                        key={i}
                        className={`${styles.headerItem} ${i === index ? styles.headerActive : ''}`}
                        onClick={() => onIndexChange(i)}
                        aria-current={i === index ? 'page' : undefined}
                    >
                        <span className={styles.headerNum}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={styles.headerName}>{d.navLabel}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.inner}>
                <header className={styles.intro}>
                    <p className={styles.eyebrow}>
                        Design {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                    </p>
                    <h1 className={styles.title} aria-label={design.name}>
                        <SardineText which={index} className={styles.titleSvg} />
                    </h1>
                    {design.tagline && <p className={styles.tagline}>{design.tagline}</p>}
                    {design.description && <p className={styles.body}>{design.description}</p>}
                </header>

                {design.sections ? (
                    <div className={styles.sections}>
                        {design.sections.map((sec, si) => {
                            const secImages = sec.gallery || [];
                            const feature = sec.galleryLayout === 'feature';
                            // Sections without card/species data (e.g. Tote Bags) get a
                            // plain title + description + gallery layout instead of the
                            // Characters-style "character card" aside.
                            const hasCard = Boolean(sec.card || sec.species);
                            // `variant`: 'featured' (a plain section's hero shot, shown large
                            // and uncropped) or 'side' (the mockups stacked beside it,
                            // cropped top/bottom via object-fit to fill their slot).
                            const renderTile = (src, i, variant) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`${styles.tile} ${variant === 'featured' ? styles.tileFeatured : ''} ${variant === 'side' ? styles.tileSide : ''}`}
                                    onClick={() => setLightboxSrc(src)}
                                    aria-label={`View ${sec.title} image ${i + 1}`}
                                >
                                    <img src={src} alt="" className={styles.tileImage} />
                                </button>
                            );
                            if (!hasCard) {
                                return (
                                    <section key={si} className={styles.section}>
                                        <h2 className={styles.sectionTitle}>{sec.title}</h2>
                                        <div className={styles.sectionSimple}>
                                            {sec.task || sec.approach ? (
                                                <>
                                                    {sec.task && (
                                                        <p className={styles.sectionDescription}>
                                                            <span className={styles.sectionDescriptionLabel}>Task: </span>
                                                            {sec.task}
                                                        </p>
                                                    )}
                                                    {sec.approach && (
                                                        <p className={styles.sectionDescription}>
                                                            <span className={styles.sectionDescriptionLabel}>My approach: </span>
                                                            {sec.approach}
                                                        </p>
                                                    )}
                                                </>
                                            ) : (
                                                sec.description && (
                                                    <p className={styles.sectionDescription}>{sec.description}</p>
                                                )
                                            )}
                                            {sec.program && (
                                                <p className={styles.sectionDescription}>
                                                    <span className={styles.sectionDescriptionLabel}>Program used: </span>
                                                    {sec.program}
                                                </p>
                                            )}
                                            {sec.footnote && (
                                                <p className={styles.sectionFootnote}>{sec.footnote}</p>
                                            )}
                                            <div className={styles.sectionGallery}>
                                                {secImages.length > 0 ? (
                                                    <>
                                                        {renderTile(secImages[0], 0, 'featured')}
                                                        {secImages.length > 1 && (
                                                            <div className={styles.sectionSideCol}>
                                                                {secImages.slice(1).map((src, i) => renderTile(src, i + 1, 'side'))}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={`${styles.tile} ${styles.tileFeatured} ${styles.tilePlaceholder}`}
                                                            aria-hidden="true"
                                                        >
                                                            <span>Image</span>
                                                        </div>
                                                        <div className={styles.sectionSideCol}>
                                                            {Array.from({ length: SECTION_PLACEHOLDERS - 1 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`${styles.tile} ${styles.tileSide} ${styles.tilePlaceholder}`}
                                                                    aria-hidden="true"
                                                                >
                                                                    <span>Image</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                );
                            }
                            return (
                                <section key={si} className={styles.section}>
                                    <h2 className={styles.sectionTitle}>{sec.title}</h2>
                                    <div className={`${styles.sectionRow} ${feature ? styles.sectionRowFeature : ''}`}>
                                        {(() => {
                                            const cardRows = sec.card || [];
                                            const bulletRows = cardRows.filter((r) => Array.isArray(r.value));
                                            const textRows = cardRows.filter((r) => !Array.isArray(r.value));
                                            return (
                                        <aside
                                            className={`${styles.card} ${sec.cardColor ? styles.cardTinted : ''}`}
                                            style={sec.cardColor ? { '--cardColor': sec.cardColor } : undefined}
                                        >
                                            <p className={styles.cardTitle}>Character card</p>

                                            {sec.species && (
                                                <div className={styles.cardSpecies}>
                                                    <span className={styles.cardSpeciesValue}>{sec.species}</span>
                                                    {sec.speciesIcon && (
                                                        <img src={sec.speciesIcon} alt="" className={styles.cardSpeciesIcon} />
                                                    )}
                                                </div>
                                            )}

                                            {/* Top half: the star bullet points. */}
                                            <div className={styles.cardTop}>
                                                {bulletRows.map((row, ri) => (
                                                    <ul key={ri} className={styles.cardPoints}>
                                                        {row.value.map((pt, pi) => (
                                                            <li key={pi}>{pt}</li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>

                                            {/* Bottom half: accent-filled rectangle with the
                                                description + strengths paragraph. */}
                                            <div className={styles.cardBottom}>
                                                {sec.description && (
                                                    <p className={styles.cardIntro}>{sec.description}</p>
                                                )}
                                                {textRows.map((row, ri) => (
                                                    <p key={ri} className={styles.cardStrength}>
                                                        <span className={styles.cardStrengthLabel}>{row.label}</span>
                                                        {row.value}
                                                    </p>
                                                ))}
                                            </div>
                                        </aside>
                                            );
                                        })()}

                                        <div className={`${styles.sectionGallery} ${feature ? styles.sectionGalleryFeature : ''}`}>
                                            {feature && secImages.length > 0 ? (
                                                <>
                                                    {/* left: Shield (idx 1) then Action pose (idx 2) */}
                                                    <div className={styles.featCol}>
                                                        {[1, 2].map((idx) =>
                                                            secImages[idx] ? renderTile(secImages[idx], idx) : null
                                                        )}
                                                    </div>
                                                    {/* right: big full-body (idx 0) then headshots (idx 3) */}
                                                    <div className={styles.featCol}>
                                                        {[0, 3].map((idx) =>
                                                            secImages[idx] ? renderTile(secImages[idx], idx) : null
                                                        )}
                                                    </div>
                                                </>
                                            ) : secImages.length > 0 ? (
                                                secImages.map((src, i) => renderTile(src, i))
                                            ) : (
                                                Array.from({ length: SECTION_PLACEHOLDERS }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`${styles.tile} ${styles.tilePlaceholder}`}
                                                        aria-hidden="true"
                                                    >
                                                        <span>Image</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.gallery}>
                        {images.length > 0
                            ? images.map((src, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={styles.tile}
                                    onClick={() => setLightboxSrc(src)}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <img src={src} alt="" className={styles.tileImage} />
                                </button>
                            ))
                            : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.tile} ${styles.tilePlaceholder}`}
                                    aria-hidden="true"
                                >
                                    <span>Image</span>
                                </div>
                            ))}
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
                    {images.length > 1 && images.indexOf(lightboxSrc) !== -1 && (
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
                    <img className={styles.lightboxImage} src={lightboxSrc} alt="" />
                </div>
            )}
        </div>
    );
};
