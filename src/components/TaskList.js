import TaskItem from "./TaskItem";

const TaskList = ({ handleChangeStatus, handleDeleteTask, tasks }) => {
  return (
    <ul>
      {tasks.map(({ id, name, status }) => (
        <TaskItem
          key={id}
          id={id}
          status={status}
          name={name}
          handleChangeStatus={handleChangeStatus}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
