import { useNavigate } from 'react-router-dom';
import styles from './QuizNav.module.css'
import type React from 'react';

type QuizNavProps = {
  num: number;
  currentPerson: number;
  setCurrentPerson: React.Dispatch<React.SetStateAction<number>>;
}

function QuizNav(props: QuizNavProps) {
  const navigate = useNavigate();

  let People = Array.from({length: props.num}, (_, i) => (
    <button 
      key={i+1} 
      className={`
        ${styles.navPerson}
        ${props.currentPerson === i+1 ? styles.currentPerson : ''}
      `}
      onClick={() => handleChangePerson(i+1)}
    >
      P{i+1}
    </button>
  ))

  const handleChangePerson = (num: number) => props.setCurrentPerson(num);

  function handleStartOver() {
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.people}>
        {People}
      </div>
      <button 
        onClick={handleStartOver}
        className={styles.startOverButton}
      >
        Start Over
      </button>
    </nav>
  )
}

export default QuizNav