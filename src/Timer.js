import { useState, useEffect } from "react";

export function Timer() {
  const [time, setTime] = useState(0);
  const [realTime, setRealTime] = useState(0);
  const [max, setMax] = useState(30000);
  const [id, setId] = useState();
  useEffect(() => {
    const i = interval();
    return () => clearInterval(i);
  }, []);

  function interval() {
    setTime(0);
    setRealTime(0);
    clearInterval(id);
    const i = setInterval(function () {
      setRealTime((time) => time + 100);
    }, 100);
    setId(i);
    return i;
  }

  useEffect(() => {
    if (time >= max) {
      setTime((time) => Number(max));
    } else setTime((time) => realTime);
  }, [realTime, time, max]);

  useEffect(() => {
    if (realTime === 30000) {
      clearInterval(id);
    }
  }, [realTime]);
  return (
    <div>
      <progress
        id="elapse"
        max={max == 0 ? 1 : max}
        value={max == 0 ? 1 : time}
      />
      <pre>{time / 1000}s</pre>
      <input
        type="range"
        min="0"
        max="30000"
        step="100"
        name="max"
        onChange={(e) => setMax(e.target.value)}
        value={max}
      />
      <button onClick={interval}>reset timer</button>
    </div>
  );
}
