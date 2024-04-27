function  NextButton({dispatch, answer, index,numQuestions}) {

    if(answer === null ) return null; //null == no Answer

    //Show next btn only if index < numQuestions
    if(index < numQuestions - 1)
      return (
        <button className="btn btn-ui"
        onClick={()=> dispatch({ type: "nextQuestion"})}>
          Next
        </button>
    )


    if(index === numQuestions - 1)
      return (
        <button className="btn btn-ui"
        onClick={()=> dispatch({ type: "finish"})}>
          Finish
        </button>
    )
}

export default NextButton