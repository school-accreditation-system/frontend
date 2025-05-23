"use client";
import React from "react";
import logo from "../../../../public/nesalogo-removebg.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FcInspection } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";
import { X } from "lucide-react";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Dashboard",
    link: "/inspection-plan",
    icon: <MdDashboard className="h-5 w-5" />
  },
  {
    id: 2,
    name: "Applications",
    link: "/inspection-plan/applications",
    icon: <FaClipboardList className="h-5 w-5" />
  },
  {
    id: 3,
    name: "Team-planning",
    link: "/inspection-plan/team-planning",
    icon: <BsPeopleFill className="h-5 w-5" />
  },
  {
    id: 4,
    name: "Teams",
    link: "/inspection-plan/teams",
    icon: <FaUsers className="h-5 w-5" />
  },
  {
    id: 5,
    name: "Inspections",
    link: "/inspection-plan/inspections",
    icon: <FcInspection className="h-5 w-5" />
  },
  // { 
  //   id: 6, 
  //   name: "Settings", 
  //   link: "/inspection-plan/settings",
  //   icon: <MdOutlineSettings className="h-5 w-5" />
  // },
  {
    id: 7,
    name: "Logout",
    link: "/",
    icon: <AiOutlineLogout className="h-5 w-5" />
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-80 max-h-full flex items-center flex-col space-y-16 p-2 
        bg-gray-100 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 md:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-2">
          <Image src={logo} className="w-24 h-14" alt="logo" />
        </div>

        <div className="flex flex-col space-y-4 w-full">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => onClose()} // Close sidebar on mobile when link is clicked
              className={`flex items-center gap-3 ${pathname === item.link
                ? "bg-primary text-white"
                : "text-gray-700"
                } hover:bg-primary hover:text-white p-3 rounded-md transition-colors`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;