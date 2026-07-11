import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
const formattedDate = new Date(task.due_date).toLocaleDateString(
  "en-GB",
  {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mt-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
            task.status === "Completed"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 mt-3">
        {task.description}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>

       <p>
        <strong>📅 Due Date:</strong> {formattedDate}
      </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => onEdit(task)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
         <FaTrash /> 
          Delete
        </button>

        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaCheck />
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;