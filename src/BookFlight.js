import { useState } from "react";

export function BookFlight() {
  const [flightType, setFlightType] = useState("one-way");
  const [flightDate, setFlightDate] = useState(parseDate(new Date()));
  const [returnFlightDate, setReturnFlightDate] = useState(
    parseDate(new Date()),
  );
  return (
    <div>
      <select
        onChange={(e) => {
          setFlightType(e.target.value);
        }}
      >
        <option value="one-way">one way flight</option>
        <option value="two-way">two way flight</option>
      </select>
      <br />
      <DateInput value={flightDate} update={setFlightDate} /> <br />
      <DateInput
        type="text"
        value={returnFlightDate}
        update={setReturnFlightDate}
        disabled={flightType == "one-way" ? true : false}
      />
      <br />
      <button
        disabled={(function () {
          if (flightType == "one-way")
            if (!isValidDate(flightDate)) return true;
            else return false;
          if (flightType == "two-way")
            if (
              !isValidDate(flightDate) ||
              !isValidDate(returnFlightDate) ||
              !isValidFlight(flightDate, returnFlightDate)
            )
              return true;
          return false;
        })()}
      >
        book
      </button>
    </div>
  );
}

function pad(num) {
  return num > 9 ? num : "0" + num;
}

function parseDate(d) {
  const date = new Date(d);
  if (date === "Invalid Date") return d;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDay();
  return [pad(day), pad(month), year].join(".");
}

function isValidDate(str) {
  const [d, m, y] = str.split(".");
  if (
    d.length != 2 ||
    m.length != 2 ||
    y.length != 4 ||
    new Date([m, d, y].join("/")) == "Invalid Date"
  )
    return false;
  return true;
}

function isValidFlight(flight, retFlight) {
  const [d1, m1, y1] = flight.split(".");
  const t1 = new Date([m1, d1, y1].join(".")).getTime();
  const [d2, m2, y2] = retFlight.split(".");
  const t2 = new Date([m2, d2, y2].join(".")).getTime();
  return t2 - t1 < 0 ? false : true;
}

function DateInput(props) {
  const [err, setErr] = useState(false);
  const { value, update } = props;
  return (
    <>
      <input
        {...props}
        type="text"
        value={value}
        onChange={(e) => {
          if (!isValidDate(e.target.value)) setErr(true);
          else setErr(false);
          update(e.target.value);
        }}
        style={{ backgroundColor: err ? "red" : "white" }}
      />
    </>
  );
}
