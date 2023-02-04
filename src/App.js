import React from "react"
import Quiz from "./components/Quiz"


export default function App() {
    
    const [quizStarted, setQuizStarted] = React.useState(false)
    
    function startQuiz () {
        setQuizStarted( prev => !prev )
    }
    
    
    
    return (
        <Quiz 
            hasStarted = {quizStarted}
            startQuiz = {startQuiz}/>
    )
}