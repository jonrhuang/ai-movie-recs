
import React, { useState } from 'react'
import QuizNav from '../QuizNav/QuizNav';
import styles from './QuizQuestions.module.css';
import { useNavigate } from 'react-router-dom';
import type { QuizAnswers } from '../../utils/types';
import { QuestionButton } from '../QuestionButton/QuestionButton';

type QuizQuestionsProps = {
  numPeople: number;
  personAnswers: QuizAnswers[];
  setPersonAnswers: React.Dispatch<React.SetStateAction<QuizAnswers[]>>;
  currentPerson: number;
  setCurrentPerson: React.Dispatch<React.SetStateAction<number>>;
}
function QuizQuestions(props: QuizQuestionsProps) {
  const navigate = useNavigate();
  const currentAnswers = props.personAnswers.find(item => item.person === props.currentPerson)
  const [newBtn, setNewBtn] = useState(currentAnswers?.isNew ?? false)
  const [classicBtn, setClassicBtn] = useState(currentAnswers?.isClassic ?? false)
  const [funBtn, setFunBtn] = useState(currentAnswers?.isFun ?? false)
  const [seriousBtn, setSeriousBtn] = useState(currentAnswers?.isSerious ?? false)
  const [inspiringBtn, setInspiringBtn] = useState(currentAnswers?.isInspiring ?? false)
  const [scaryBtn, setScaryBtn] = useState(currentAnswers?.isScary ?? false)
  const [form, setForm] = useState({
    favorite: currentAnswers?.favorite ?? "",
    isNew: newBtn,
    isClassic: classicBtn,
    isFun: funBtn,
    isSerious: seriousBtn,
    isInspiring: inspiringBtn,
    isScary: scaryBtn,
    island: currentAnswers?.island ?? "",
  })

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.setPersonAnswers(prev =>
      prev.map(answers =>
        answers.person === props.currentPerson ?
          { ...answers, ...form } : answers
      )
    );

    if (props.currentPerson === props.numPeople) {
      navigate('/result');
    }
    else {
      props.setCurrentPerson(prev => prev + 1)
      setForm({
        favorite: currentAnswers?.favorite ?? "",
        isNew: newBtn,
        isClassic: classicBtn,
        isFun: funBtn,
        isSerious: seriousBtn,
        isInspiring: inspiringBtn,
        isScary: scaryBtn,
        island: currentAnswers?.island ?? "",
      });
    }
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
            value={form.favorite}
          />
        </label>

        <h2>
          Are you in the mood for something new or a classic?
        </h2>
        <div className={styles.QuestionTwo}>
          <QuestionButton
            buttonName='New'
            currentValue={newBtn}
            formKey='isNew'
            setState={setNewBtn}
            setFormState={setForm}
          />
          <QuestionButton
            buttonName='Classic'
            currentValue={classicBtn}
            formKey='isClassic'
            setState={setClassicBtn}
            setFormState={setForm}
          />
        </div>

        <h2>
          What are you in the mood for?
        </h2>
        <div className={styles.QuestionThree}>
          <QuestionButton
            buttonName='Fun'
            currentValue={funBtn}
            formKey='isFun'
            setState={setFunBtn}
            setFormState={setForm}
          />
          <QuestionButton
            buttonName='Serious'
            currentValue={seriousBtn}
            formKey='isSerious'
            setState={setSeriousBtn}
            setFormState={setForm}
          />
          <QuestionButton
            buttonName='Inspiring'
            currentValue={inspiringBtn}
            formKey='isInspiring'
            setState={setInspiringBtn}
            setFormState={setForm}
          />
          <QuestionButton
            buttonName='Scary'
            currentValue={scaryBtn}
            formKey='isScary'
            setState={setScaryBtn}
            setFormState={setForm}
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
            value={form.island}
          />
        </label>

        {props.currentPerson !== props.numPeople ?
          <input
            className={styles.submit}
            type='submit'
            value='Next Person'
          /> :
          <input
            className={styles.submit}
            type='submit'
            value='Get Movie'
          />
        }
      </form>
    </>
  )
}

export default QuizQuestions