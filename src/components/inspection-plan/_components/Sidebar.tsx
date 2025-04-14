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
  { 
    id: 6, 
    name: "Settings", 
    link: "/inspection-plan/settings",
    icon: <MdOutlineSettings className="h-5 w-5" />
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <div className="w-80 h-screen flex items-center  flex-col space-y-16 p-2 bg-gray-100 border-r border-gray-200">
      <div className="p-2">
        <Image src={logo} className="w-24 h-14" alt="logo" />
      </div>
      
      <div className="flex flex-col space-y-4 w-full">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className={`flex items-center gap-3 ${
              pathname === item.link 
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
  );
};

export default Sidebar;