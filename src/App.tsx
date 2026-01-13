import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleHeader from './components/TitleHeader/TitleHeader';
import Home from './components/Home/Home';
import QuizStart from './components/QuizStart/QuizStart';
import QuizQuestions from './components/QuizQuestions/QuizQuestions';
import type { PrequizAnswers, PersonQuizAnswers } from './utils/types';
import './App.css'

function App() {
  const [startAnswers, setStartAnswers] = useState<PrequizAnswers>({
    numPeople: 5,
    hours: 0,
    minutes: 0
  });
  const [currentPerson, setCurrentPerson] = useState(1)

  const [personAnswers, setPersonAnswers] = useState<PersonQuizAnswers[]>([])

  return (
    <>
      <TitleHeader />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/quiz'
            element={
              <QuizStart
                startAnswers={startAnswers}
                setStartAnswers={setStartAnswers}
                setCurrentPerson={setCurrentPerson}
                setPersonAnswers={setPersonAnswers}
              />
            }
          />
          <Route
            path='/questions'
            element={
              <QuizQuestions
                numPeople={startAnswers.numPeople}
                personAnswers={personAnswers}
                setPersonAnswers={setPersonAnswers}
                currentPerson={currentPerson}
                setCurrentPerson={setCurrentPerson}
              />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
