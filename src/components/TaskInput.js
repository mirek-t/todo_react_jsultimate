const TaskInput = ({ value, handleChange, handleKeyUp }) => {
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
