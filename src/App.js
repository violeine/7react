import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./Counter.js";
import { TempConv } from "./TempConv.js";
import { BookFlight } from "./BookFlight.js";
import { Timer } from "./Timer.js";
import { Crud } from "./Crud.js";
import { CircleDraw } from "./CircleDraw.js";

function App() {
  return (
    <div className="App">
      <Counter />
      <TempConv />
      <BookFlight />
      <Timer />
      <Crud />
      <CircleDraw />
    </div>
  );
}

export default App;
