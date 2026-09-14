import styles from './MobileWarning.module.css';

export const MobileWarning = ({ onContinue }) => {
    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Screen size notice">
            <div className={styles.card}>
                <h1 className={styles.title}>Best viewed on a bigger screen</h1>
                <p className={styles.body}>
                    This portfolio is better viewed on a computer or laptop screen. Would you like to continue anyway?
                </p>
                <button type="button" className={styles.continueButton} onClick={onContinue}>
                    Continue anyway
                </button>
            </div>
        </div>
    );
};
