import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";

const ClearCompleted = ({ tasks }) => {
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
    <>
      {tasks.filter((e) => e.status).length > 0 ? (
        <button onClick={handleDeleteDone}>Clear Completed</button>
      ) : (
        ""
      )}
    </>
  );
};

export default ClearCompleted;
