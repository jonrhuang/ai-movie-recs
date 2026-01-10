import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TitleHeader from './components/TitleHeader';
import Home from './components/Home';
import QuizStart from './components/QuizStart';
import './App.css'

function App() {
  return (
    <>
      <TitleHeader />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<QuizStart/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
