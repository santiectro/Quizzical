import React from "react"

export default function Question(props) {
    
    function decode(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
    }
    

    //Copying array and sorting it, is this the best practice?

    const answers = [...props.incorrect_answers]
    answers.push(props.correct_answer)
    answers.sort()
    
    
    //Style them if they are correct, like blue or red.
    
    
    React.useEffect( () => {
        if (props.checked) {
            
            for (let i = 0; i < answers.length ; i++) {
                
                
                if ( document.getElementById(`${answers[i]}`).value == props.correct_answer ) {

                    document.getElementById(`${answers[i]}label`).style.backgroundColor = "#94D7A2"
                } else if (  (document.getElementById(`${answers[i]}`).value != props.correct_answer) && document.getElementById(`${answers[i]}`).checked ) {
                    document.getElementById(`${answers[i]}label`).style.backgroundColor = "#F8BCBC"
                } else {
                    document.getElementById(`${answers[i]}`).disabled = true
                    document.getElementById(`${answers[i]}label`).style.opacity = "0.5"
                }
            }
            
            
        }
    }, [props.checked] )
    
    
    return (
        <div className="question">
            <h4>{decode(props.question)}</h4>
            

            <input type="radio" 
                    name={props.id} 
                    value={answers[0]} 
                    id={answers[0]}
            />
            
            <label htmlFor={answers[0]}  
                    onClick={() => props.selectAnswer(props.id, answers[0], props.correct_answer)}
                    id={`${answers[0]}label`}>
                    {decode(answers[0])}</label>
            
            <input type="radio" 
                    name={props.id} 
                    value={answers[1]} 
                    id={answers[1]}
            />
            
            <label htmlFor={answers[1]}
                    onClick={() => props.selectAnswer(props.id, answers[1], props.correct_answer)}
                    id={`${answers[1]}label`}>
                    {decode(answers[1])}</label>
                    
            
            <input type="radio" 
                    name={props.id} 
                    value={answers[2]} 
                    id={answers[2]}
            />
            
            <label htmlFor={answers[2]}
                    onClick={() => props.selectAnswer(props.id, answers[2], props.correct_answer)}
                    id={`${answers[2]}label`}>
                    {decode(answers[2])}</label>
                    
            <input type="radio" 
                    name={props.id} 
                    value={answers[3]} 
                    id={answers[3]}
            />
            
            <label htmlFor={answers[3]}
                    onClick={() => props.selectAnswer(props.id, answers[3], props.correct_answer)}
                    id={`${answers[3]}label`}>
                    {decode(answers[3])}</label>
            
        </div>
    )
}