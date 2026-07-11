
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-blue-400">
          Dashboard
        </li>

        <li className="cursor-pointer hover:text-blue-400">
          Tasks
        </li>

        <li className="cursor-pointer hover:text-blue-400">
          Completed
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
