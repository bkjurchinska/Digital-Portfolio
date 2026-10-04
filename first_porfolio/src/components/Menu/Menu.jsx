import { useState } from 'react';
import styles from './Menu.module.css';

const MOODS = ['Programming', 'Web & UX Design', 'Graphic Design', 'Artwork', 'Games & Characters'];
const ALL_MOODS = MOODS;

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
            },
            {
                title: 'Posters',
                id: 'languages',
                marker: '$$',
                moods: ['Graphic Design'],
            },
            {
                title: 'Tote Bags',
                id: 'languages',
                marker: '$',
                moods: ['Graphic Design'],
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
                openReceipt: true,
                marker: 'bill',
                moods: ALL_MOODS,
                blurb: 'Get all my contact details',
            },
        ],
    },
];

const SCROLL_SETTLE_DELAY = 400;
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
                </div>
            </div>
        </section>
    );
};
