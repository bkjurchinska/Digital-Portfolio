import React, {useRef} from 'react';
import styles from './Carousel.module.css';
// import Jam1 from '../../assets/jam1.png';
// import Jam2 from '../../assets/jam2.png';
// import Jam3 from '../../assets/jam3.png';
// import Jam4 from '../../assets/jam4.png';
import Toast1 from '../../assets/egg-toast.png';
import Toast2 from '../../assets/avocado-toast.png';
import Toast3 from '../../assets/banana-toast.png';
import Toast4 from '../../assets/blueberry-toast.png';
import Text1 from '../../assets/egg-text.png';
import Text2 from '../../assets/avocado-text.png';
import Text3 from '../../assets/banana-text.png';
import Text4 from '../../assets/blueberry-text.png';

const images = [Toast1, Toast2, Toast3, Toast4];

export const Carousel = ({ index, onToastEnter, onToastLeave, onToastClick }) => {
  const carouselRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <div
          className={styles.carouselImages}
          ref={carouselRef}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.toastTextWrapper}
              style={{ cursor: onToastClick ? 'pointer' : undefined }}
              onMouseEnter={onToastEnter}
              onMouseLeave={onToastLeave}
              onClick={() => onToastClick && onToastClick(i)}
            >
                <img
                key={i}
                src={src}
                alt={`Slide ${i + 1}`}
                className={`${styles.carouselImage} ${styles['carouselImage'+(i+1)]}`}
                />

                <img
                  src={[Text1, Text2, Text3, Text4][i]}
                  alt={`Overlay ${i+1}`}
                  className={`${styles.overlayText} ${styles['overlayText'+(i+1)]}`}
                  />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

