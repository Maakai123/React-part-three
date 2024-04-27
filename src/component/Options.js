



function Options({question, dispatch, answer}){
    //when answern is not equal null
    const hasAnswered = answer !== null

    //index is to get the correct answer
    return (
        <div className="options">
            
            {question.options.map((option, index) => (
                <button className= {`btn btn-option ${index === answer ?
                "answer" : ""} ${
                    hasAnswered ? index === question.correctOption ?
                    "correct" : "wrong" : ""
                }`}
                key={option}
                disabled={hasAnswered}
                onClick={() => dispatch({type: "newAnswer", payload:index})}>
                    {option}
                   
                </button>
            ))}
        </div>
    )
}

export default Options;