import "./App.css";
import { useEffect, useState } from "react";

import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";
import uuidGen from "./utils/uuid";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ItemsLeft from "./components/ItemsLeft";
import Filters from "./components/Filters";
import ClearCompleted from "./components/ClearCompleted";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selection, setSelection] = useState("all");

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    setTasks(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    getData();
  }, []);

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
      setTasks([
        {
          name: value,
          id: uuidGen(),
          status: false,
        },
        ...tasks,
      ]);
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

  function handleDeleteDone() {
    setTasks(tasks.filter((task) => !task.status));
  }

  return (
    <div className="App">
      <Headline />
      <TaskInput
        value={value}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      {tasks.length === 0 ? (
        ""
      ) : (
        <>
          <TaskList
            tasks={tasks}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            selection={selection}
          />
          <ItemsLeft tasks={tasks} />
          <Filters setSelection={setSelection} />
          <ClearCompleted tasks={tasks} handleDeleteDone={handleDeleteDone} />
        </>
      )}
    </div>
  );
}

export default App;
