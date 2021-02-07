import { useState, useEffect } from "react";

export function Cells() {
  const [cells, setCells] = useState(
    Array.from({ length: 26 }, () => Array.from({ length: 100 }, () => null)),
  );
  return (
    <div>
      <table border={1}>
        <tbody>
          <tr>
            <th style={{ width: "30px" }}></th>
            {[...Array(5)].map((_, i) => (
              <th style={{ width: "92px" }} key={i}>
                {String.fromCharCode(i + 97)}
              </th>
            ))}
          </tr>
          {[...Array(10).keys()].map((el) => (
            <tr key={el}>
              <td>{el}</td>
              {[...Array(5)].map((_, i) => (
                <Cell
                  row={el}
                  col={i}
                  cells={cells}
                  key={`${el} ${i}`}
                  setCells={setCells}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ row, col, cells, setCells }) {
  const [input, setInput] = useState();
  const [clicked, setClicked] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [formula, setFormula] = useState();
  const [deps, setDeps] = useState();
  function handleBlur() {
    setClicked(false);
  }

  useEffect(() => {
    if (raw) {
      const a = parseRaw(raw);
      if (!a.isFormular) {
        const temp = JSON.parse(JSON.stringify(cells));
        temp[col][row] = a.str;
        setCells(temp);
      }
      setFormula(a);
    }
  }, [raw]);

  useEffect(() => {
    if (formula && formula.isFormular) {
      // create new deps,
      const newDeps = formula.str
        .map((el) => {
          const col = el[0].charCodeAt(0) - 65;
          const row = +el.substring(1);
          return [col, row];
        })
        .map(([col, row]) => Number(cells[col][row]));
      // check if deps change
      if (JSON.stringify(deps) === JSON.stringify(newDeps)) {
        // , else do nothing?
        return;
      } else {
        // set new deps
        // updateCells
        const temp = JSON.parse(JSON.stringify(cells));
        temp[col][row] = newDeps.reduce((el, acc) => el + acc, 0);
        setCells(temp);
        setDeps(newDeps);
      }
    } else return;
  }, [cells, formula]);

  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleKey(e) {
    if (e.key == "Enter") {
      setRaw(input);
      handleBlur();
    }
    if (e.key == "Escape") {
      handleBlur();
    }
  }
  return (
    <td
      style={{ padding: "4px", minHeight: "32px" }}
      onClick={(e) => setClicked(true)}
    >
      {clicked ? (
        <input
          style={{ width: "92px" }}
          type="text"
          onBlur={handleBlur}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKey}
          autoFocus={true}
        />
      ) : (
        <span>{cells[col][row]}</span>
        // <span>{raw}</span>
      )}
    </td>
  );
}

function parseRaw(str) {
  // start with [A1, A2, A3] or [A2:B2] [A1]
  if (str[0] == "[" && str[str.length - 1] == "]") {
    const t = str.substring(1, str.length - 1);
    if (t.includes(",")) {
      const token = t.split(", ");
      return { isFormular: true, str: token };
    }
  } else
    return {
      isFormular: false,
      str: str,
    };
}
