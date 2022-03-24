import { useEffect, useState } from "react";
import "./App.css";

const loadFromLocalStorage = (key) =>
  localStorage.getItem(key) === null
    ? []
    : JSON.parse(localStorage.getItem(key));

const saveToLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

const uuidGen = () =>
  Math.max(...loadFromLocalStorage("tds").map((e) => e.id), 0) + 1;

function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadFromLocalStorage("tds"));
  }, []);

  useEffect(() => {
    saveToLocalStorage("tds", tasks);
  }, [tasks]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      const newTask = [
        ...tasks,
        {
          name: value,
          id: uuidGen(),
          status: false,
        },
      ];
      setTasks(newTask);
      setValue("");
    }
  };

  function handleChangeStatus(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <ul>
        {tasks.map(({ id, name, status }) => (
          <li key={id} className="todo-item">
            <span
              onClick={() => handleChangeStatus(id)}
              className={status ? "status done" : "status active"}
            />
            {name}
            <button onClick={() => handleDeleteTask(id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
