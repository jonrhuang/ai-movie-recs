import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import QuizStep1 from './components/QuizStep1';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/step1' element={<QuizStep1/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
