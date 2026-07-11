const TaskForm = ({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  editingTaskId,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mt-5 mb-8 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-lg p-2"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-lg p-2"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border rounded-lg p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
      >
        {editingTaskId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;