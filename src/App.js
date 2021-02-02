import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./Counter.js";
import { TempConv } from "./TempConv.js";
import { BookFlight } from "./BookFlight.js";
import { Timer } from "./Timer.js";

function App() {
  return (
    <div className="App">
      <Counter />
      <TempConv />
      <BookFlight />
      <Timer />
    </div>
  );
}

export default App;
