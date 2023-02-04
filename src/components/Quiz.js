import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"
import "../style.css"

export default function Quiz(props) {
    
    
    const [questions, setQuestions] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [finish, setFinish] = React.useState(false)
    const [startNewGame, setStartNewGame] = React.useState(false)
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    
    //We add three things a unique identifier, if is selected (might not have an use), and if is correct
    
    
    // We have to track check answers, lol so it reloads when ever we click it but only if everything has been answer, fuck.
    
    
    React.useEffect( () => {
        setStartNewGame(false)
        fetch("https://opentdb.com/api.php?amount=8&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setQuestions( prev => {
                return prev.map( question => {
                    return { ...question, id: nanoid(), selected: false, checked: false}
                })
            })
            }) 
        
    }, [startNewGame])

    function selectAnswer (id, value) {
        
        
        setQuestions( prev => {
            return prev.map ( question => {
                
                if (id === question.id) {

                    return {...question, selectedAnswer: value, selected: true }
                }
                else {
                    return {...question}
                }
            })
        })
        
        
    }
    
    function checkAnswers() {
        
        
        
        const allSelected = questions.every(question => question.selected)
        
        if (allSelected) {
            setQuestions( prev => {
                return prev.map ( question => {
                    
                    if (question.selected) {

                        return {...question, checked: true }
                    }
                    else {
                        return {...question}
                    }
                })
            })
            
            for(let i = 0;  i < questions.length; i++) {
                if(questions[i].selectedAnswer == questions[i].correct_answer) {
                    console.log("HI", correctAnswers)
                    setCorrectAnswers(prev => prev += 1)
                    console.log(correctAnswers)
                }
            }
            
            setFinish(true)
            
        }else {
            console.log("You haven't selected everything")
        }  
    }
    
    
    function playNewGame () {
        setFinish(false)
        setStartNewGame(true)
        setCorrectAnswers(0)
    }
    
    
    const questionElements = questions.map( question => {
        
        return (<Question
            key={question.id}
            {...question}
            selectAnswer={selectAnswer}
                />)
    } )
    
    console.log(correctAnswers)
    
    if ( !props.hasStarted ) {
        return (
     
        <div 
            className="whole-container">
                <h2>Quizzical</h2>
                <p>Challenge yourself with 5 common knowledge questions</p>
                <button onClick={props.startQuiz} className="blue-btn" >Start Quiz</button>

        </div> 
        
    )
    }else {
        return (
            <div className="different-container">
            
                {questionElements}
                
                <div className="score">
                    {finish && <p>You scored {correctAnswers}/{questions.length} correct answers </p>}
                    <button className="blue-btn" onClick={ finish ? playNewGame : checkAnswers} >
                    {finish ? "Play again" : "Check Answers"}
                    </button>
                </div>
            </div>
        )
    }
    
    
}