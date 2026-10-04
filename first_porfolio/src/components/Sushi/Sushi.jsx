import styles from "./Sushi.module.css";
import SushiFrame from "../../assets/sushi_frame.svg";

export const Sushi = () => {
    return (
        <section id="sushi" className={styles.container}>
            <div className={styles.track}>
                <img src={SushiFrame} className={styles.strip} alt="" aria-hidden="true" />
                <img src={SushiFrame} className={styles.strip} alt="" aria-hidden="true" />
            </div>
        </section>
    );
};
