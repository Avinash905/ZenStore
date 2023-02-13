import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/adminsidebar.css";
import {
  MdDashboard,
  MdLogout,
  MdOutlineSettingsSystemDaydream,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsFillBellFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoStatsChart } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { toast } from "react-hot-toast";

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-main-container">
        <h4>main</h4>
        <div className="sidebar-main">
          <NavLink to={"/"}>
            <MdDashboard />
            <span>main site</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>lists</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/users"}>
            <BiUser />
            <span>users</span>
          </NavLink>
          <NavLink to={"/dashboard/items"}>
            <FaShoppingBag />
            <span>Items</span>
          </NavLink>
          <NavLink to={"/dashboard/createitem"}>
            <MdOutlineCreateNewFolder />
            <span>Create Item</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>useful</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/users"}>
            <IoStatsChart />
            <span>stats</span>
          </NavLink>
          <NavLink to={"/dashboard/items"}>
            <BsFillBellFill />
            <span>notifications</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>service</h4>
        <div className="sidebar-main">
          <NavLink to={"/dashboard/users"}>
            <MdOutlineSettingsSystemDaydream />
            <span>system health</span>
          </NavLink>
          <NavLink to={"/dashboard/items"}>
            <CgNotes />
            <span>logs</span>
          </NavLink>
          <NavLink to={"/dashboard/createitem"}>
            <AiFillSetting />
            <span>settings</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-main-container">
        <h4>user</h4>
        <div className="sidebar-main">
          <NavLink to={"/profile"}>
            <HiOutlineUserCircle />
            <span>profile</span>
          </NavLink>
          <p onClick={logout}>
            <MdLogout />
            <span>logout</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
