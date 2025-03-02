import { useState } from "react";
import { useActions, useUser } from "../../store/app-store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [tab, setTab] = useState("login");
  const storeAction = useActions();
  const navigate = useNavigate();
  const handleLogin = () => {
    storeAction.setUser({ name: "John Doe", role: "admin" });
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
        <div className="w-1/2 p-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Welcome to Food Distribution System</h2>
        <div className="flex border-b mb-4">
          {/* <button 
            className={`flex-1 py-2 ${tab === "login" ? "border-b-2 border-black" : "text-gray-500"}`} 
            onClick={() => setTab("login")}
          >
            Login
          </button> */}
          {/* <button 
            className={`flex-1 py-2 ${tab === "register" ? "border-b-2 border-black" : "text-gray-500"}`} 
            onClick={() => setTab("register")}
          >
            Register
          </button> */}
        </div>
        {tab === "login" ? (
          <div className="space-y-4">
            <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
            <button className="w-full py-2 bg-black text-white rounded" onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
            <button className="w-full py-2 bg-black text-white rounded">Register</button>
          </div>
        )}
      </div>
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold">Streamline Your Food Distribution</h1>
        <p className="mt-4 text-gray-600">
          Efficiently manage food inventory, handle donors with communities through
          our food distribution management system.
        </p>
      </div>
      
    </div>
  );
};

export default Auth;
