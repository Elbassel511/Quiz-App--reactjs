import React from 'react'
import './App.css';
import StartPage from "./components/StartPage"
import QuizPage from './components/QuizPage'



export default function App() {
  
  const [startPage,setPage]= React.useState(true)
  
  function changePage (){ setPage(prev => !prev)  }

  return (
    // start game page
    <>
    {startPage && <StartPage handlingClick = {changePage} />}
    {!startPage && <QuizPage newQuiz = {changePage} />}
    </>

  )
}
