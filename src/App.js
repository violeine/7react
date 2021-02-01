import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./Counter.js";
import { TempConv } from "./TempConv.js";
import { BookFlight } from "./BookFlight.js";

function App() {
  return (
    <div className="App">
      <Counter />
      <TempConv />
      <BookFlight />
    </div>
  );
}

export default App;
