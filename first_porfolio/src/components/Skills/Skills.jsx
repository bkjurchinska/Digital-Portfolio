import styles from './Skills.module.css';
import { Language } from './Language/Language';
import { Paintings } from '../Paintings/Paintings';

export const Skills = ({ onOpenDesign, onOpenGallery, onOpenReceipt }) => {
    return <section className={styles.container}>
        <br></br>
        <Language onOpenDesign={onOpenDesign} />
        <Paintings onOpenGallery={onOpenGallery} onOpenReceipt={onOpenReceipt} />

    </section>
}