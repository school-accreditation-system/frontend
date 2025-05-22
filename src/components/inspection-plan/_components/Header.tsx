"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Menu } from "lucide-react";
import { useEffect } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState("")
  const [loggedInUserRole, setLoggedInUserRole] = useState("inspector");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserName(data.name)

    const userData = localStorage.getItem("loggedInUser");
    const parsedUserData = JSON.parse(userData);
    setLoggedInUserRole(parsedUserData.role || "division");
  }, [])

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex justify-between items-center h-full px-6">
        {/* Left side - Mobile menu button + Welcome */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

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
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-md">
                      <p className="text-sm font-medium">New application received</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-md">
                      <p className="text-sm font-medium">Team meeting scheduled</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-md">
                      <p className="text-sm font-medium">Inspection completed</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
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
                <div className="p-2">
                  {loggedInUserRole && (
                    <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
                      Logged in as: {loggedInUserRole.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="p-2">
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