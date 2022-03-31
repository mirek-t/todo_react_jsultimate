import "./App.css";
import { useEffect, useState } from "react";

import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ItemsLeft from "./components/ItemsLeft";
import Filters from "./components/Filters";
import ClearCompleted from "./components/ClearCompleted";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

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

  const handleKeyUp = async (event) => {
    if (event.key === "Enter") {
      const newTodo = {
        name: value,
        status: false,
      };

      const docRef = await addDoc(collection(db, "todos"), newTodo);

      setTasks([
        Object.assign(newTodo, {
          id: docRef.id,
        }),
        ...tasks,
      ]);
      setValue("");
    }
  };

  async function handleChangeStatus(id) {
    const newTasks = tasks.filter((task) => task.id === id)[0];
    newTasks.status = !newTasks.status;

    await updateDoc(doc(db, "todos", id), { status: newTasks.status });

    setTasks([...tasks]);
  }

  async function handleDeleteTask(id) {
    await deleteDoc(doc(db, "todos", id));
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleDeleteDone() {
    const batch = writeBatch(db);

    tasks.forEach((task) => {
      if (task.status) {
        const ref = doc(db, "todos", task.id);
        batch.delete(ref);
      }
    });

    await batch.commit();

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
