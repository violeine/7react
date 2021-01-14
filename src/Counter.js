import {useState} from "react";

export  function Counter(){
  const [counter, setCounter] = useState(0);
  return (
    <div>
    <label for="counter">
      <span>{counter}</span>
      <button onClick={
        ()=>setCounter(counter+1)
      }>Count</button>
    </label>
    </div>)
}
