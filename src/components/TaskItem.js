const TaskItem = ({
  id,
  status,
  name,
  handleChangeStatus,
  handleDeleteTask,
}) => {
  return (
    <li className="todo-item">
      <span
        onClick={() => handleChangeStatus(id)}
        className={status ? "status done" : "status active"}
      />
      {name}
      <button onClick={() => handleDeleteTask(id)}>x</button>
    </li>
  );
};

export default TaskItem;
