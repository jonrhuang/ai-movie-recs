import { useNavigate } from 'react-router-dom';
import type { PrequizAnswers, PersonQuizAnswers } from '../../utils/types';
import { initializePersonQuizAnswers } from '../../utils/types';
import styles from './QuizStart.module.css';

type QuizStartProps = {
  startAnswers: PrequizAnswers;
  setStartAnswers: React.Dispatch<React.SetStateAction<PrequizAnswers>>;
  setCurrentPerson: React.Dispatch<React.SetStateAction<number>>;
  setPersonAnswers: React.Dispatch<React.SetStateAction<PersonQuizAnswers[]>>;
}

function QuizStart(props: QuizStartProps) {
  const navigate = useNavigate();


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    const min = Number(e.target.min);
    const max = Number(e.target.max);

    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }

    props.setStartAnswers(prev => ({ ...prev, [e.target.name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.setCurrentPerson(1);

    const personAnswersArray = Array.from({length: props.startAnswers.numPeople}, (_,i) => {
      return initializePersonQuizAnswers(i+1);
    })

    props.setPersonAnswers(personAnswersArray);

    navigate("/questions");
  }

  return (
    <>
      <form
        className={styles.QuizForm}
        onSubmit={handleSubmit}
      >
        <h2>
          How many people?
        </h2>
        <label>
          <input
            className={styles.numPeopleInput}
            name='numPeople'
            type='number'
            placeholder='2'
            min={1}
            max={6}
            onChange={handleChange}
            required
          />
          <h3>(1-5)</h3>
        </label>

        <h2>
          How much time do you have?
        </h2>
        <label>
          <input
            className={styles.timeInputHours}
            name='hours'
            type='number'
            placeholder='1'
            min={0}
            max={3}
            onChange={handleChange}
            required
          />
          <h3>Hours</h3>
        </label>

        <label>
          <input
            className={styles.timeInputMinutes}
            name='minutes'
            type='number'
            placeholder='30'
            step={15}
            min={0}
            max={45}
            onChange={handleChange}
            required
          />
          <h3>Minutes</h3>
        </label>

        <input className={styles.submit} type='submit' value='Start Quiz' />
      </form>
    </>
  )
}
export default QuizStart