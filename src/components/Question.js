import React from 'react'



export default function Question(props) {
    // function for choices style
    function choiceClasses (isheld,correctAns,value,showAns){
    let classes = 'choice'
    
    if (isheld) {
        classes += ' hold'
    }

    if (showAns) {
        classes +=' show'
    }

    if (correctAns===value && showAns) {
        classes += ' correct'
    } 
    return classes



    }

    
// render 
    return (
        <div className='question'>
            <div className='question--q'>{props.question.value}</div>
            <div className='question--choises'>{(props.choices).map(choice => <div className={choiceClasses (choice.isheld,props.correctAnswer,choice.value,props.showAnswer)} 
                                                                        onClick={()=>props.handlingClick(props.question.id,choice.id,props.questionIndex,choice.value)}
                                                                        id = {choice.id}
                                                                        key = {choice.id}
                                                                        
                                                                        
                                                                        > 
                                                                            {choice.value} 
                                                                         </div>)
                                                                         } 
            </div>
        </div>
  )

}
