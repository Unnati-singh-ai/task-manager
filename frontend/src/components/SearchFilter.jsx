const SearchFilter = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  ordering,
  setOrdering,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-2 w-72"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="">Sort By</option>
        <option value="due_date">Due Date (Ascending)</option>
        <option value="-due_date">Due Date (Descending)</option>
        <option value="created_at">Oldest First</option>
        <option value="-created_at">Newest First</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default SearchFilter;