function Progress({index, numQuestions, points, maxPossiblePoints, answer }) {
//if there is no answer, it will be false, number will convert it to zero
//if there is answer it will be true and converted to 1
    return (
        <header className="progress">
        

            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question 
            <strong>{index + 1}</strong> / {numQuestions}
             </p>
         <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

export default Progress