import { useState } from 'react';
import styles from './Menu.module.css';

// Four "crafts" the mood-picker filters by. Every item below carries the
// crafts it belongs to; picking one dims everything that isn't tagged with
// it. About is tagged with all four -- it's relevant no matter what you're
// here for, so it never dims.
const MOODS = ['Programming', 'Web & UX Design', 'Graphic Design', 'Artwork', 'Games & Characters'];
const ALL_MOODS = MOODS;

// The whole menu, course by course, left column then right column -- same
// grouping as the printed reference. Every item (whether it used to be a
// "section" or a "subsection") is rendered identically: a title, a dotted
// leader, a marker, and a one-line blurb. Clicking any of them just scrolls
// to its section on the page -- `id` is that section's element id.
const LEFT_COLUMN = [
    {
        course: 'Starter',
        items: [
            {
                title: 'About',
                id: 'about',
                marker: 'bio',
                moods: ALL_MOODS,
                blurb: "Get to know the chef :)",
            },
        ],
    },
    {
        course: 'Main Courses',
        items: [
            {
                title: 'RacoonFinds',
                id: 'projects',
                // Matches the carousel's slide order in Projects.jsx (egg,
                // avocado, banana, blueberry) so a click lands on the right toast.
                toastIndex: 0,
                marker: '$$$',
                moods: ['Web & UX Design'],
                blurb: 'Team Human-Computer Interaction project',
            },
            {
                title: 'Gestalt Principles',
                id: 'projects',
                toastIndex: 1,
                marker: '$$$$',
                moods: ['Programming', 'Web & UX Design'],
                blurb: 'Thesis work',
            },
            {
                title: "A Witch's Workplace",
                id: 'projects',
                toastIndex: 2,
                marker: '$$$',
                moods: ['Artwork', 'Games & Characters'],
                blurb: '2D Game',
            },
            {
                title: 'Book Tracker',
                id: 'projects',
                toastIndex: 3,
                marker: '$$',
                moods: ['Programming'],
                // blurb: 'Coming soon',
            },
        ],
    },
];

const RIGHT_COLUMN = [
    {
        course: 'Sides',
        items: [
            {
                title: 'Characters',
                id: 'languages',
                marker: '$$$',
                moods: ['Artwork', 'Games & Characters'],
                // blurb: 'Original characters pulled from odd references -- old toy collections turned into people, styles and eras.',
            },
            {
                title: 'Posters',
                id: 'languages',
                marker: '$$',
                moods: ['Graphic Design'],
                // blurb: 'Posters made on the job as an REA, mostly in Canva.',
            },
            {
                title: 'Tote Bags',
                id: 'languages',
                marker: '$',
                moods: ['Graphic Design'],
                // blurb: "A running catch-all for whatever doesn't fit the other plates yet.",
            },
        ],
    },
    {
        course: 'Dessert',
        items: [
            {
                title: 'Gallery',
                id: 'gallery-entry',
                marker: 'full set',
                moods: ['Artwork'],
                blurb: 'Collection of hand painted cards',
            },
        ],
    },
    {
        course: 'The Check',
        items: [
            {
                title: 'Contact me',
                // No `id` -- this opens the Receipt overlay instead of
                // scrolling to a section (see `goTo`).
                openReceipt: true,
                marker: 'bill',
                moods: ALL_MOODS,
                blurb: 'Get all my contact details',
            },
        ],
    },
];

// How long the smooth scroll to the section takes, roughly -- the carousel
// slide is kicked off after this so it reads as "arrive, then the toast
// slides in" instead of both happening at once mid-scroll.
const SCROLL_SETTLE_DELAY = 400;

// Landing on #projects with a plain `block: 'start'` leaves the small
// prev/next nav panel (it sits well below the carousel) just under the
// fold. Nudge the scroll this many extra px past the title so it's visible.
const PROJECTS_EXTRA_SCROLL = 120;

const goTo = (item, onSelectProject, onOpenReceipt) => {
    if (item.openReceipt) {
        onOpenReceipt?.();
        return;
    }
    const target = document.getElementById(item.id);
    if (target) {
        const extra = item.id === 'projects' ? PROJECTS_EXTRA_SCROLL : 0;
        const top = target.getBoundingClientRect().top + window.scrollY + extra;
        window.scrollTo({ top, behavior: 'smooth' });
    }
    if (typeof item.toastIndex === 'number' && onSelectProject) {
        window.setTimeout(() => onSelectProject(item.toastIndex), SCROLL_SETTLE_DELAY);
    }
};

const Course = ({ course, activeMood, onSelectProject, onOpenReceipt }) => (
    <div className={styles.course}>
        <div className={styles.courseHeader}>
            <span className={styles.courseLabel}>{course.course}</span>
            <span className={styles.courseRule} aria-hidden="true" />
        </div>

        {course.items.map((item) => (
            <button
                key={item.title}
                type="button"
                className={`${styles.item} ${activeMood && !item.moods.includes(activeMood) ? styles.itemDim : ''}`}
                onClick={() => goTo(item, onSelectProject, onOpenReceipt)}
            >
                <span className={styles.itemTop}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.leader} aria-hidden="true" />
                    <span className={styles.itemMarker}>{item.marker}</span>
                </span>
                <span className={styles.itemBlurb}>{item.blurb}</span>
            </button>
        ))}
    </div>
);

export const Menu = ({ onSelectProject, onOpenReceipt }) => {
    const [activeMood, setActiveMood] = useState(null);

    const pickMood = (mood) => {
        setActiveMood((current) => (current === mood ? null : mood));
    };

    return (
        <section id="menu" className={styles.container} aria-label="Section navigation">
            <div className={styles.card}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Menu</h1>
                </header>

                <div className={styles.columns}>
                    <div className={styles.column}>
                        {LEFT_COLUMN.map((course) => (
                            <Course key={course.course} course={course} activeMood={activeMood} onSelectProject={onSelectProject} onOpenReceipt={onOpenReceipt} />
                        ))}
                    </div>
                    <span className={styles.colDivider} aria-hidden="true" />
                    <div className={styles.column}>
                        {RIGHT_COLUMN.map((course) => (
                            <Course key={course.course} course={course} activeMood={activeMood} onSelectProject={onSelectProject} onOpenReceipt={onOpenReceipt} />
                        ))}
                    </div>
                </div>

                <div className={styles.mood}>
                    <p className={styles.moodEyebrow}>Self service</p>
                    <h2 className={styles.moodTitle}>What are you in the mood for?</h2>
                    <div className={styles.moodPills}>
                        {MOODS.map((mood) => (
                            <button
                                key={mood}
                                type="button"
                                className={`${styles.moodPill} ${activeMood === mood ? styles.moodPillActive : ''}`}
                                aria-pressed={activeMood === mood}
                                onClick={() => pickMood(mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                    {/* <span className={styles.moodDivider} aria-hidden="true" /> */}
                    {/* <p className={styles.moodRoute}>
                        <strong>Your route</strong>{' '}
                        {activeMood
                            ? `Everything tagged "${activeMood}" is lit up below -- tap it again to clear.`
                            : "Pick a craft and everything else dims out of the way."}
                    </p> */}
                </div>
            </div>
        </section>
    );
};
