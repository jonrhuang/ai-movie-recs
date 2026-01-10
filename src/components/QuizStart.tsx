
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './QuizStart.module.css';
import type React from 'react';

function QuizStart() {
  const [form, setForm] = useState({
    people: 0,
    hours: 0,
    minutes: 0,
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value:number = 0;
    const input = e.target;
    const min = Number(input.min);
    const max = Number(input.max);
    if (Number(input.value) < min) {
      value = min;
    }
    if (Number(input.value) > max) {
      value = max;
    }
    setForm(prev => ({ ...prev, [input.name]: value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Add error check for empty

    localStorage.setItem(
      "form", JSON.stringify(form)
    )
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
            name='people'
            type='number'
            placeholder='2'
            min={1}
            max={5}
            onChange={handleChange}
          />
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
            onChange={handleChange}
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
          />
          <h3>Minutes</h3>
        </label>

        <input className={styles.submit} type='submit' value='Start Quiz' />
      </form>
    </>
  )
}
export default QuizStart