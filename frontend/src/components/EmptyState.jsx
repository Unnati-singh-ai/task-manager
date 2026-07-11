const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center mt-8">
      <div className="text-6xl">
        📋
      </div>

      <h2 className="text-2xl font-bold mt-4">
        No Tasks Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Create your first task to get started.
      </p>
    </div>
  );
};

export default EmptyState;