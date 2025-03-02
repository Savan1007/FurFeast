import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-lg font-bold">RHS</div>
            <div className="flex items-center">
                <div className="space-x-6 mr-6">
                    {[
                        { name: "Dashboard", path: "/" },
                        { name: "Requests", path: "/requests" },
                        { name: "Inventory", path: "/inventory" },
                        { name: "Reports", path: "/reports" }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            onClick={() => handleNavigation(item.path)}
                            className="text-gray-600 hover:text-black font-medium px-2 py-1"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
