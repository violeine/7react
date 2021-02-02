import { useState, useEffect } from "react";

export function Crud() {
  const [list, setList] = useState([
    "Emil, Hans",
    "Mustermann, Max",
    "Tisch, Roman",
  ]);
  const [input, setInput] = useState({ name: "", surname: "" });
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState();
  const [filteredList, setFilteredList] = useState(list);

  function handleChange(e) {
    console.log(e.target.name);
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function del() {
    console.log(selected);
    const filter = list.filter((el, id) => `${el} ${id}` !== selected);
    setList(filter);
  }

  function update() {
    const name = [input.surname, input.name].join(", ");
    const idx = list.findIndex((el, id) => selected === `${el} ${id}`);
    console.log(idx);
    if (idx === -1) return;
    const newList = [...list];
    newList[idx] = name;
    setList(newList);
  }
  function create() {
    const name = [input.surname, input.name].join(", ");
    const newList = [...list, name];
    setList(newList);
  }

  useEffect(() => {
    const filtered = list.filter((e) =>
      e.toLowerCase().match(filter.toLowerCase()),
    );
    setFilteredList(filtered);
  }, [list, filter]);
  return (
    <div>
      <label for="filter">
        <span>filter</span>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <br />
      <select
        id="sel"
        name="list"
        size="3"
        onClick={(e) => {
          console.log(e.target.value);
          setSelected(e.target.value);
        }}
      >
        {filteredList.map((el, id) => (
          <option value={`${el} ${id}`}>{el}</option>
        ))}
      </select>
      <label for="name">
        Name:
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
      </label>
      <label for="surname">
        Surname:
        <input
          type="text"
          name="surname"
          value={input.surname}
          onChange={handleChange}
        />
      </label>
      <button onClick={create}>Create</button>
      <button onClick={update}>Update</button>
      <button onClick={del}>Delete</button>
    </div>
  );
}
