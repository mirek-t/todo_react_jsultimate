import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const TaskInput = () => {
  const [value, setValue] = useState("");

  const handleKeyUp = async (event) => {
    if (event.key === "Enter") {
      await addDoc(collection(db, "todos"), {
        name: value,
        status: false,
      });

      setValue("");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  );
};

export default TaskInput;
