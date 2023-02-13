import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../style/admin.css";
import Users from "./Users";
import CreateItem from "./CreateItem";
import AdminItems from "./AdminItems";

function Admin({ type }) {
  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        {type === "users" ? (
          <Users />
        ) : type === "createitem" ? (
          <CreateItem />
        ) : (
          <AdminItems />
        )}
      </div>
    </>
  );
}

export default Admin;
