import React from "react";
import { NavLink } from "react-router-dom";
import DashboardNav from "../assets/dashboard_layout_icon.png";
import ProfileNav from "../assets/profile_layout_icon.png";

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full h-15 bg-[#132a3d] rounded-t-xl">
      <div className="flex gap-20 justify-center items-center">
        <NavLink
          to="/dashboard"
          className="flex items-center justify-center w-10 h-10 rounded-full"
        >
          <img src={DashboardNav} alt="Link to dashboard" />
        </NavLink>
        <NavLink
          to="/profile"
          className="flex items-center justify-center w-10 h-10 rounded-full"
        >
          <img src={ProfileNav} alt="Link to Profile" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
