import {Link} from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <>
      <div className={styles.description}>
        <p>
          Is it movie night but you find it hard to decide on a movie for the whole crew?
        </p>
        <p>
          Let PopcornBot recommend you a movie for everyone to enjoy!
        </p>
      </div>

      <Link 
        className={styles.startQuiz}
        to='/quiz'>
          Get a Movie Rec!
      </Link>
    </>
  )
}

export default Home