import {Link} from 'react-router-dom';
import {useState} from 'react';
import styles from './Home.module.css';

function Home() {
  const [message, setMessage] = useState("");
  async function testfetch() {
    const res = await fetch("http://localhost:5000/test");
    const data = await res.json();
    setMessage(data.message);
  }

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
        to='/quiz'
        >
          Get a Movie Rec!
      </Link>

      <button
        className={styles.testButton}
        onClick={testfetch}
      >
        Click to test backend
      </button>

        <h3>
          {message}
        </h3>
    </>
  )
}

export default Home