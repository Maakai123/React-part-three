import { useReducer } from "react";


const initialState = { count: 0, step : 1}
//state = 0;   action = 1 in addition and - 1 in sub

function reducer(state, action) {
 // return  state + action 
 /*
 if( action.type === "inc") return state + 1;
 if(action.type === "dec") return state - 1;
 if( action.type === "setCount") return action.payload;
  */

 switch ( action.type) {
  case "dec" :
    return {...state, count: state.count - state.step};

    case "inc" :
      return { ...state, count: state.count + state.step}
      case "setCount" :
        return {...state, count: action.payload};
      case "setStep" :
        return {...state, step: action.payload};
        case "reset" :
        return initialState;
        default:
          throw new Error("UnKnown action")
 }
}


function DateCounter() {

  //const [step, setStep] =  useState(1)
  //const [count, setCount] = useState(0);
//const initialState = { count: 0, step : 1}
  const [state, dispatch ] = useReducer(reducer, initialState )
  
  const {count, step } = state;
  //The reducer function gets access to the current state 0, and  action 1 and -1
//dispatch can update state.

  

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  console.log(date)

  const dec = function () {
    dispatch({ type: "dec"})
  // dispatch(-1)
    // setCount((count) => count - 1);
  //  setCount((count) => count - step);
  };

  const inc = function () {
   dispatch({ type: "inc"})
   // dispatch(1)
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload : Number(e.target.value)})
  //  setCount(Number(e.target.value));
  };

//for the range update 
  const defineStep = function (e) {
    dispatch( {type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({type: "reset"})
   // setCount(0);
   // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
