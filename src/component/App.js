import { useEffect, useReducer } from "react"
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton  from "./NextButton.js";
import Progress from "./progress.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

const  SECS_PER_QUESTION = 30


const initialState = {
  questions: [],
  //'Loading', 'error', 'ready','active', 'finished'
  //When the app starts it starts with status loading, when we recieve data
  //it changes to ready

  status: "Loading",
  //the index  at 0, first questions, at 1 second questions
  index: 0,
  answer: null, //start from null
  points : 0,
  highscore: 0,
  secondsRemaining: null, //caculate time from number of questions
}

function reducer(state,action) {
  switch(action.type) {
    case "dataReceived" :
      return {
        ...state,
        questions : action.payload, //data just recieved
      //update status and question in one call
        status:"ready"
      };
//when we have error
      case "dataFailed":
        return {
          ...state, status: "error"
        }
       //When the press start we also calculate the time and number of time when we start the games
       /*
       The amount of questions * 30s
       */
       case "start" :
        return {...state, status: "active", 
        secondsRemaining: state.questions.length * SECS_PER_QUESTION}

        case "newAnswer":
          const question = state.questions[state.index]
          //take note  here
          const newPoints =  action.payload === question.correctOption ?
          state.points + question.points : state.points
        return {
       ...state, answer: action.payload,
       points:newPoints
      
        };
        case "nextQuestion" :
          return {...state, index: state.index + 1, answer: null};
          //answer: null return answer back to null

          case "finish":
          return {...state, status:"finished", highscore: 
          state.points > state.highscore ? state.points : state.highscore
         };

         case "restart" :
          return {...initialState, question: state.questions, status:"ready"}

          //return {...state, points:0,highscore:0,index:0,answer:null, status:"ready"}
          case "tick": 
          return {
            //like count down, remove 1 every seconds 10-1,9-1,8-1 till 0
            ...state, secondsRemaining: state.secondsRemaining - 1,
            //if secondsRemaining = 0 just finish the time
            status: state.secondsRemaining === 0 ? "finished" : state.status
          }
      default:

        throw new Error("Action unknown")
  }
}


function App() {
  //for it to render on ui use use reducer hook (destructure)
  const [{ questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer,initialState)

  //length or number of item in an array
  const numQuestions = questions.length;


  //maximum possible points 
const maxPossiblePoints = questions.reduce((
    prev, cur) => prev + cur.points, 0) 


  useEffect( function() {
    fetch("http://localhost:9000/questions")
    .then((res)=> res.json())
    .then((data) => dispatch( {type: "dataReceived", payload: data}))
    .catch((err) => dispatch({type: "dataFailed"}))
  }, [])
  return (
    <div>
     <Header/>
 
     <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen numQuestions={numQuestions}
      dispatch={dispatch}/>}

      {status === "active" && 
      <>
      <Progress index={index} numQuestions={numQuestions}
      points={points}
      maxPossiblePoints={maxPossiblePoints}
      answer={answer}/>
      <Question question={questions[index]} 
      dispatch={dispatch} answer={answer}
      
      />
      <Footer>

      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

      <NextButton dispatch={dispatch}
      answer={answer} numQuestions={numQuestions}
      index={index}/>
      </Footer>

    </>
      }

      {status === "finished" && (
        <FinishScreen points={points}
         maxPossiblePoints={maxPossiblePoints}
         highscore={highscore}
         dispatch={dispatch} />
      )}
      
     </Main>
    </div>
    
  );
}

export default App;
