import React, { useEffect, useState } from "react";
import "../style/users.css";
import fetchData from "../helper/apiCall";
import { useProductContext } from "../context/productContext";
import Loading from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const { isLoading, setLoading } = useProductContext();
  const id = jwtDecode(localStorage.getItem("token")).id;

  const fetch = async () => {
    setLoading(true);
    const data = await fetchData(`/item/getitems`);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [isLoading]);

  const removeBtn = async (itemid) => {
    try {
      if (!window.confirm("Are you sure you want to delete the item?")) {
        return;
      }

      const data = await toast.promise(
        axios.delete(`/item/deleteitem/${id}/${itemid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Item removed successfully",
          error: "Unable to remove item",
          loading: "Removed item...",
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
        <h2>Items</h2>
        <table className="item-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Company</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Reviews</th>
              <th>Featured</th>
              <th>Colors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ele, i) => {
              return (
                <tr key={ele._id}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.company}</td>
                  <td>{ele.category}</td>
                  <td>{ele.price}</td>
                  <td>{ele.stock}</td>
                  <td>{ele.reviews}</td>
                  <td>{ele.featured ? "True" : "False"}</td>
                  <td className="table-colors-cont">
                    {ele.colors.map((col) => {
                      return (
                        <span
                          key={col}
                          name="color"
                          className="cart-color"
                          style={{ backgroundColor: `${col}` }}
                        ></span>
                      );
                    })}
                  </td>
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

export default AdminItems;
