import styles from "./Sushi.module.css";
import SushiFrame from "../../assets/sushi_frame.svg";

export const Sushi = () => {
    return (
        <section id="sushi" className={styles.container}>
            <div className={styles.track}>
                {/* Two identical copies side by side: the animation shifts the
                    track by exactly one copy's width, so it loops seamlessly. */}
                <img src={SushiFrame} className={styles.strip} alt="" aria-hidden="true" />
                <img src={SushiFrame} className={styles.strip} alt="" aria-hidden="true" />
            </div>
        </section>
    );
};
