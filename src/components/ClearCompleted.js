const ClearCompleted = ({ tasks, handleDeleteDone }) => {
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
