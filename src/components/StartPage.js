import React from 'react';


export default function StartPage (props){
    
    return (
        <main className='start-page'>
            <div className='start-content'>
                <h1 className='start--header'>Quizzical</h1>
                <button className='start--btn' onClick={props.handlingClick}>
                    Start quiz
                </button> 
            </div>
        </main>
    )
} 