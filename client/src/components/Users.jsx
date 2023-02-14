import React, { useEffect, useState } from "react";
import "../style/users.css";
import fetchData from "../helper/apiCall";
import jwtDecode from "jwt-decode";
import { useProductContext } from "../context/productContext";
import Loading from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, setLoading } = useProductContext();
  const { id } = jwtDecode(localStorage.getItem("token"));

  const fetch = async () => {
    setLoading(true);
    const data = await fetchData(`/user/getallusers/${id}`);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [isLoading]);

  const removeBtn = async (userid) => {
    try {
      if (!window.confirm("Are you sure you want to delete the item?")) {
        return;
      }

      const data = await toast.promise(
        axios.delete(`/user/deleteuser/${id}/${userid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "User removed successfully",
          error: "Unable to remove user",
          loading: "Removed user...",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="table">
        <h2>Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((ele, i) => {
              return (
                <tr key={ele._id}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                  <td>{ele.address}</td>
                  <td className="select">
                    <button
                      className="btn clear-btn"
                      onClick={() => removeBtn(ele._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Users;
