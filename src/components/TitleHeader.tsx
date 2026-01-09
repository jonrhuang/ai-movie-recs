import webpImage from '/robopopcorn.webp';
import fallbackImage from '/robopopcornAlt.png';
import styles from './TitleHeader.module.css';

function TitleHeader() {
  return (
    <header>
      <picture className={styles.mainIcon}>
        <source srcSet={webpImage} type='image/webp' />
        <img src={fallbackImage} alt="Robot with a bucket of popcorn on it's head" />
      </picture>

      <h1 className={styles.title}>
        A.I. Movie Recs
      </h1> 
    </header>
  )
}

export default TitleHeader