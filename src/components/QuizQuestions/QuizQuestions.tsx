import QuizNav from '../QuizNav/QuizNav';
import styles from './QuizQuestions.module.css';
import { useNavigate } from 'react-router-dom';
import type { PersonQuizAnswers } from '../../utils/types';
import { QuestionButton } from '../QuestionButton/QuestionButton';

type QuizQuestionsProps = {
  numPeople: number;
  personAnswers: PersonQuizAnswers[];
  setPersonAnswers: React.Dispatch<React.SetStateAction<PersonQuizAnswers[]>>;
  currentPerson: number;
  setCurrentPerson: React.Dispatch<React.SetStateAction<number>>;
}

function QuizQuestions(props: QuizQuestionsProps) {
  const navigate = useNavigate();

  const getCurrentAnswers = () => props.personAnswers.find(item => item.person === props.currentPerson)
  const atLastPerson = props.currentPerson === props.numPeople

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()

    props.setPersonAnswers(prev =>
      prev.map(item =>
        item.person === props.currentPerson
          ? { ...item, [e.target.name]: e.target.value }
          : item
      )
    );
  }

  const handleClick = (
    formKey: keyof PersonQuizAnswers
  ) => {
    props.setPersonAnswers(prev =>
      prev.map(item =>
        item.person === props.currentPerson
          ? { ...item, [formKey]: !item[formKey] }
          : item
      )
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!atLastPerson) {
      props.setCurrentPerson(prev => prev + 1);
      return
    }

    navigate('/result');
  }

  return (
    <>
      <QuizNav
        num={props.numPeople}
        currentPerson={props.currentPerson}
        setCurrentPerson={props.setCurrentPerson}
      />
      <form className={styles.QuizQuestions} onSubmit={handleSubmit}>
        <label>
          <h2>
            What's your favorite movie and why?
          </h2>
          <textarea
            className={styles.FavoriteMovie}
            name='favorite'
            onChange={handleChange}
            value={getCurrentAnswers()?.favorite ?? ''}
          />
        </label>

        <h2>
          Are you in the mood for something new or a classic?
        </h2>
        <div className={styles.QuestionTwo}>
          <QuestionButton
            buttonName='New'
            clicked={getCurrentAnswers()?.isNew ?? false}
            handleClick={() => handleClick('isNew')}
          />
          <QuestionButton
            buttonName='Classic'
            clicked={getCurrentAnswers()?.isClassic ?? false}
            handleClick={() => handleClick('isClassic')}
          />
        </div>

        <h2>
          What are you in the mood for?
        </h2>
        <div className={styles.QuestionThree}>
          <QuestionButton
            buttonName='Fun'
            clicked={getCurrentAnswers()?.isFun ?? false}
            handleClick={() => handleClick('isFun')}
          />
          <QuestionButton
            buttonName='Serious'
            clicked={getCurrentAnswers()?.isSerious ?? false}
            handleClick={() => handleClick('isSerious')}
          />
          <QuestionButton
            buttonName='Inspiring'
            clicked={getCurrentAnswers()?.isInspiring ?? false}
            handleClick={() => handleClick('isInspiring')}
          />
          <QuestionButton
            buttonName='Scary'
            clicked={getCurrentAnswers()?.isScary ?? false}
            handleClick={() => handleClick('isScary')}
          />
        </div>

        <label>
          <h2>
            Which famous film person would ou live to be stranded on an island with and why?
          </h2>
          <textarea
            className={styles.FilmPerson}
            name='island'
            onChange={handleChange}
            value={getCurrentAnswers()?.island ?? ''}
          />
        </label>

        <button
          className={styles.submit}
        >
          {atLastPerson ? 'Get Movie' : 'Next Person'}
        </button>
      </form>
    </>
  )
}

export default QuizQuestions