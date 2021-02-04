import { useState, useEffect } from "react";

export function CircleDraw() {
  const {
    circles,
    setCircles,
    push,
    undo,
    isUndoable,
    redo,
    isRedoable,
  } = useHistory();

  const [popUp, setPopUp] = useState({ on: false, posX: 0, posY: 0 });
  return (
    <div>
      <button onClick={undo} disabled={isUndoable()}>
        undo
      </button>
      <button onClick={redo} disabled={isRedoable()}>
        redo
      </button>
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#35bdc8",
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => {
          if (popUp.on) {
            push([...circles]);
            setPopUp({ on: false });
          } else if (e.target == e.currentTarget) {
            push([
              ...circles,
              {
                clientX: e.nativeEvent.offsetX,
                clientY: e.nativeEvent.offsetY,
                width: 30,
              },
            ]);
          } else {
            var rect = e.currentTarget.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            setPopUp({
              on: true,
              posX: x,
              posY: y,
              circleId: e.target.dataset.id,
            });
          }
        }}
      >
        {circles.map((el, idx) => (
          <Circle
            key={idx}
            dataId={idx}
            posX={el.clientX}
            posY={el.clientY}
            width={el.width}
            popup={setPopUp}
          />
        ))}
        {popUp.on ? (
          <PopUp {...popUp} circles={circles} setCircles={setCircles} />
        ) : null}
      </div>
    </div>
  );
}

function Circle({ dataId, posX, posY, width, popup }) {
  return (
    <div
      data-id={dataId}
      style={{
        position: "absolute",
        top: posY,
        left: posX,
        width: width,
        height: width,
        borderRadius: "50%",
        border: "1px solid",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
}

function PopUp({ posX, posY, circleId, circles, setCircles }) {
  const [toggle, setToggle] = useState(false);
  function widthChange(e) {
    var newCircle = [...circles];
    newCircle[circleId] = {
      ...newCircle[circleId],
      width: Number(e.target.value),
    };
    setCircles(newCircle);
  }
  useEffect(() => {
    setToggle(false);
  }, [posX, posY, circleId]);
  return (
    <div
      style={{
        top: posY,
        left: posX,
        position: "absolute",
        width: "120px",
        backgroundColor: "darkgray",
        zIndex: "100",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setToggle(true);
      }}
    >
      {toggle ? (
        <input
          type="range"
          min={2}
          max={100}
          value={circles[circleId].width}
          onChange={widthChange}
        />
      ) : (
        "Adjust diameter"
      )}
    </div>
  );
}

function useHistory() {
  const [circles, setCircles] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoArr, setRedoArr] = useState([]);
  return {
    push: function (state) {
      setHistory([...history, state]);
      setCircles(state);
      setRedoArr([]);
    },
    setCircles,
    circles,
    undo: function () {
      const state = history.slice(0, -1);
      const redo = history.slice(0).pop();
      if (state.length == 0) {
        setCircles([]);
      } else {
        setCircles(state.pop());
      }
      setHistory(history.slice(0, -1));
      setRedoArr([...redoArr, redo]);
    },
    redo: function () {
      const state = redoArr.slice(0).pop();
      setHistory([...history, state]);
      setCircles(state);
      setRedoArr(redoArr.slice(0, -1));
    },
    isUndoable: function () {
      return history.length == 0;
    },
    isRedoable: function () {
      return redoArr.length == 0;
    },
  };
}
