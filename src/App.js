import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./Counter.js";
import { TempConv } from "./TempConv.js";
import { BookFlight } from "./BookFlight.js";
import { Timer } from "./Timer.js";
import { Crud } from "./Crud.js";

function App() {
  return (
    <div className="App">
      <Counter />
      <TempConv />
      <BookFlight />
      <Timer />
      <Crud />
    </div>
  );
}

export default App;
