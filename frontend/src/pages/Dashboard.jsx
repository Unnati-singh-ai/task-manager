      import { useEffect, useState } from "react";
      import api from "../api/axios";
      import toast from "react-hot-toast";
      import { useNavigate } from "react-router-dom";
      import Navbar from "../components/Navbar";
      import Sidebar from "../components/Sidebar";
      import TaskCard from "../components/TaskCard";
      import TaskForm from "../components/TaskForm";
      import SearchFilter from "../components/SearchFilter";
      import Pagination from "../components/Pagination";
      import StatsCard from "../components/StatsCard";
      import Loader from "../components/Loader";
      import EmptyState from "../components/EmptyState";
      import { FaTasks, FaClock, FaCheckCircle } from "react-icons/fa";

      function Dashboard() {
        const [tasks, setTasks] = useState([]);
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [dueDate, setDueDate] = useState("");
        const [editingTaskId, setEditingTaskId] = useState(null);
        const [priority, setPriority] = useState("Medium");
        const [search, setSearch] = useState("");
        const [statusFilter, setStatusFilter] = useState("");
        const [priorityFilter, setPriorityFilter] = useState("");
        const [ordering, setOrdering] = useState("");
        const [nextPage, setNextPage] = useState(null);
        const [previousPage, setPreviousPage] = useState(null);
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
     //Fetch tasks when filter change
        useEffect(() => {
          fetchTasks();
        }, [search, statusFilter, priorityFilter,ordering]);

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
          (task) => task.status === "Completed"
        ).length;

        const pendingTasks = tasks.filter(
          (task) => task.status === "Pending"
        ).length;
      
        //Edit task
        const handleEdit = (task) => {
          setEditingTaskId(task.id);
          setTitle(task.title);
          setDescription(task.description);
          setDueDate(task.due_date);
          setPriority(task.priority);
        };
      //Delete task
        const deleteTask = async (id) => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
          );

          if (!confirmDelete) return;

        try {
         
          await api.delete(`/api/tasks/${id}/`);
          toast.success("Task deleted successfully");

          fetchTasks();
        } catch (error) {
          console.log(error.response);
          toast.error("Failed to delete task");
        }
      };

      // complete task
      const completeTask = async (id) => {
      try {
       await api.patch(
      `/api/tasks/${id}/`,
      {
        status: "Completed",
      },
      
    );

    toast.success("Task completed!");

    fetchTasks();
  } catch (error) {
    console.log(error.response);
    toast.error("Failed to update task");
  }
};

 // Handle logoout
      const handleLogout = () => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          toast.success("Logged out successfully");

          navigate("/login");
        };

        //Handle submit
       const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    

    if (editingTaskId) {
      await api.patch(
        `/api/tasks/${editingTaskId}/`,
        {
          title,
          description,
          priority,
          due_date: dueDate,
        });
      toast.success("Task updated successfully!");
    } else {
      await api.post(
        "/api/tasks/",
        {
          title,
          description,
          priority,
          due_date: dueDate,
        },
        
      );

      toast.success("Task created successfully!");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setEditingTaskId(null);

    fetchTasks();
  } catch (error) {
    console.log(error.response?.data);
    toast.error("Something went wrong");
  }
}; 

        const fetchTasks = async () => {
          try {
            setLoading(true);
            const response = await api.get(
             `/api/tasks/?search=${search}&status=${statusFilter}&priority=${priorityFilter}&ordering=${ordering}`,
            
           );
           
                   setTasks(response.data.results);
                    setNextPage(response.data.next);
                    setPreviousPage(response.data.previous);
                    setLoading(false);
                  } 
                  catch (error) { 
                  console.log(error.response);
                  console.log(error.response.data);
                  toast.error("Failed to fetch tasks");
                  setLoading(false);
      }
        };
       const fetchPage = async (url) => {
          if (!url) return;

          try {
            const response = await api.get(url, {
            });

            setTasks(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
          } catch (error) {
            console.log(error.response);
            toast.error("Failed to load page");
  }
};

        return (
          <div className="min-h-screen bg-gray-100">
          <Navbar handleLogout={handleLogout} />
          <div className="flex">
            <Sidebar />          
            <main className="flex-1 p-6" > 
           <div className="flex flex-col md:flex-row gap-4">
            <SearchFilter
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                ordering={ordering}
                setOrdering={setOrdering}
              />
              </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatsCard
                  title="Total Tasks"
                  value={totalTasks}
                  bgColor="bg-blue-500"
                  icon={FaTasks}
                />

                <StatsCard
                  title="Pending"
                  value={pendingTasks}
                  bgColor="bg-yellow-500"
                  icon={FaClock}
                />

                <StatsCard
                  title="Completed"
                  value={completedTasks}
                  bgColor="bg-green-500"
                  icon={FaCheckCircle}
                />
              </div>
              
            <TaskForm
                handleSubmit={handleSubmit}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                priority={priority}
                setPriority={setPriority}
                dueDate={dueDate}
                setDueDate={setDueDate}
                editingTaskId={editingTaskId}
              />
          {
           loading ? (
              <Loader/>
            ) : tasks.length === 0 ? (
               <EmptyState />
            ) : (
              tasks.map((task) => (
                <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
                onComplete={completeTask}
              />

                
              ))
            )}


            <Pagination
              previousPage={previousPage}
              nextPage={nextPage}
              fetchPage={fetchPage}
            />
</main> 
</div>



          </div>
           
        );
        


      }

      export default Dashboard