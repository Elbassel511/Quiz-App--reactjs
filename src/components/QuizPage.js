import { nanoid } from 'nanoid'
import React from 'react'
import Question from './Question'
import { Grid } from 'react-loading-icons'

// function for shuffling choices array
function shuffleArray(array) {
    let shaffledArr = [...array]
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.ceil(Math.random() * (array.length-1));
        [shaffledArr[i], shaffledArr[j]] = [shaffledArr[j], shaffledArr[i]];
    }
    return shaffledArr
}

export default function QuizPage(props) {
    const [data,newData] = React.useState([]) /* for fetched data */
    const [bigArray,updateBigArray]= React.useState([]); /* array generated from data */
    const [userAnswers, setUserAnswers] = React.useState({}) /* collecting user choices */
    const [showAnswer,setShowAnswer] = React.useState(false) 
    const [userGrade,setUserGrade] = React.useState(0)
    
    // parser function to solve special chracters 
    
    function parserText (text){
        const parser = new DOMParser();
        return parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent
    } 

// fetching data from API
    React.useEffect (()=>{
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then((res)=> res.json())
        .then(ans=> newData(ans.results))
    }
   ,[])

   React.useEffect (()=>{
    if (data.length ===0) return
    updateBigArray(()=>{
            const bigArr = data.map((piece)=> (
           {question :{value : parserText (piece.question), id: nanoid()} ,
            choices : shuffleArray( [...piece.incorrect_answers,piece.correct_answer]
                        .map(choice=>parserText(choice))
                        .map(value=>({value : value , isheld :false , id : nanoid() }))) ,
            correctAnswer : piece.correct_answer ,
            }) )
            return bigArr
        })  
    
    },[data])
    
   

    // callback function for choices
    function hold(questionId , choiecId, questionIndex , choiceValue){
    // setting hold status for choices
    updateBigArray ( oldArr =>{
        let newArr = oldArr.map ((queObj) => {
            if(questionId !== queObj.question.id) return queObj;
            
            return( {
                ...queObj ,
                choices : queObj.choices.map(choice => {
                    if (choice.id !== choiecId) return ({...choice , isheld : false})
                    return {...choice, isheld : true}}
                )})
        })
        
        return (newArr)
    })    
             
    // setting user choices
    setUserAnswers (prev=> ({...prev,[questionIndex]:choiceValue}) )

    }


    // creating questions component
   
    let dataHTML = bigArray.map((data,index)=> (
                    <Question   question = {data.question}
                                questionIndex ={index} 
                                choices= {data.choices}
                                handlingClick = {hold}
                                key = {nanoid()}
                                correctAnswer={data.correctAnswer}
                                showAnswer={showAnswer}
                                />))

        // sumbit solution
    function sumbitSolution(){
        // start new Quiz if the current one is already sumbitted
        if (showAnswer) {
            props.newQuiz()
        }
        // check user's answer
        let correctSolutionArr =bigArray.map((obj)=>( obj.correctAnswer));
        let userCorrectAns = 0 ;

        for (let i = 0 ; i < 5 ; i++){
            if (correctSolutionArr[i] === userAnswers[i]) { 
                userCorrectAns  = userCorrectAns + 1 }
        }

        setUserGrade(userCorrectAns)
        // show answer
        setShowAnswer(true)
    }
    // render 
    return (
        <main className='quiz-page'>
            {bigArray.length ===0 && <Grid fill='#293264' />}
            {bigArray.length>0 &&
            <div>
                {dataHTML}
            <div className='container--sumbit'>
                {showAnswer && <span> {`You scored ${userGrade}/5 correct answers`} </span>}
                <button className='start--btn quiz-btn' onClick={sumbitSolution}>
                    {showAnswer? 'Play again':'Check answers'}
                </button> 
            </div>
            </div>
            }
        </main>
  )
}


