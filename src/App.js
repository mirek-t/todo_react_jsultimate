import "./App.scss";
import { useEffect, useState } from "react";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ItemsLeft from "./components/ItemsLeft";
import Filters from "./components/Filters";
import ClearCompleted from "./components/ClearCompleted";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
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

  return (
    <div className="App">
      <Headline />
      <div className="container">
        <TaskInput placeholder="What needs to be done?" />
        {tasks.length === 0 ? (
          ""
        ) : (
          <>
            <TaskList tasks={tasks} selection={selection} />
            <ItemsLeft tasks={tasks} />
            <Filters setSelection={setSelection} />
            <ClearCompleted tasks={tasks} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
