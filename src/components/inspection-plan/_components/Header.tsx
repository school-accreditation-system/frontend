"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName,setUserName]= useState("")
     const [loggedInUserRole, setLoggedInUserRole] = useState("inspector"); // Default role
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserName(data.name)

    const userData = localStorage.getItem("loggedInUser");
      const parsedUserData = JSON.parse(userData);
      setLoggedInUserRole(parsedUserData.role || "division"); // Default to division if no role

  },[])
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };
  
  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex justify-between items-center h-full px-6">
        {/* Left side -   Welcome */}
        <div className="flex items-center gap-6">
          
          <div className="flex gap-2 items-center">
            <h4 className="text-gray-600">Welcome,</h4>
            <p className="font-bold text-primary">{userName}</p>
          </div>
        </div>
        
        {/* Right side - User & Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <FaBell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">New inspection report</p>
                    <p className="text-xs text-gray-500 mt-1">Team Alpha completed the inspection at Saint Patrick High School</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">New team assigned</p>
                    <p className="text-xs text-gray-500 mt-1">Team Beta has been assigned to Rwanda Technical College</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Schedule update</p>
                    <p className="text-xs text-gray-500 mt-1">The inspection at College Saint Andre has been rescheduled</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-primary hover:underline py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100"
              aria-label="User menu"
            >
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                <FaUserCircle className="h-7 w-7" />
              </div>
              <span className="font-medium hidden md:block">{userName}</span>
              <IoIosArrowDown className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>
          
            
            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-semibold">{userName}</p>
                  <p className="text-sm text-gray-500">{userName}@gmail.com</p>
                </div>
                <div>
                {loggedInUserRole && (
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
            Logged in as: {loggedInUserRole.toUpperCase()}
          </span>
        )}
                </div>
                <div className="p-2">
                  {/* <button className="w-full text-left p-2 rounded-md hover:bg-gray-100 text-sm flex items-center gap-2">
                    <FaUserCircle className="text-gray-500" />
                    <span>My Profile</span>
                  </button> */}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left p-2 rounded-md hover:bg-red-500 text-sm flex items-center gap-2 text-red-500 hover:text-white hover:cursor-pointer"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;