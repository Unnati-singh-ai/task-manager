import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/api/token/", {
      username,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    toast.success("Login successful!");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);

    toast.error("Invalid username or password");
  }
};


  return (
    <div className="min-h-screen flex items-center 
    justify-center bg-gradient-to-br from-indigo-200 via-white to-blue-200">
     <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl 
        shadow-2xl hover:scale-[1.01] transition-all duration-300 p-8 space-y-5"
      >
          <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome Back 👋
              </h1>

              <p className="text-gray-500 mt-2">
                Sign in to continue managing your tasks
              </p>
          </div>
     <div className="relative">
        <User
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2
           text-gray-400"
        />
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
             focus:outline-none focus:ring-2 focus:ring-indigo-500 
             focus:border-transparent transition"
          />
        </div>
      <div className="relative">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
      </div>
       <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl
           font-semibold hover:bg-indigo-700 transition duration-300
            cursor-pointer"
        >
          Login
        </button>
       <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
        >
              Register
            </Link>
          </p>
      </form>
      
    </div>
  
  );
  
}
 

export default Login;