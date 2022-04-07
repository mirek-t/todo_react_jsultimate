import "./App.scss";
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
  onSnapshot,
} from "firebase/firestore";

function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selection, setSelection] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = async (event) => {
    if (event.key === "Enter") {
      await addDoc(collection(db, "todos"), {
        name: value,
        status: false,
      });

      setValue("");
    }
  };

  async function handleDeleteDone() {
    const batch = writeBatch(db);

    tasks.forEach((task) => {
      if (task.status) {
        const ref = doc(db, "todos", task.id);
        batch.delete(ref);
      }
    });

    await batch.commit();
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
          <TaskList tasks={tasks} selection={selection} />
          <ItemsLeft tasks={tasks} />
          <Filters setSelection={setSelection} />
          <ClearCompleted tasks={tasks} handleDeleteDone={handleDeleteDone} />
        </>
      )}
    </div>
  );
}

export default App;
