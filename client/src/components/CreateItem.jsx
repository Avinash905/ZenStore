import React, { useState } from "react";
import "../style/createitem.css";
import axios from "axios";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function CreateItem() {
  const { id } = jwtDecode(localStorage.getItem("token"));
  const [files, setFiles] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name: "",
    company: "",
    description: "",
    category: "",
    colors: "",
    price: "",
    featured: false,
    stock: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      let {
        name,
        company,
        description,
        category,
        colors,
        price,
        featured,
        stock,
      } = formDetails;
      if (
        !name ||
        !company ||
        !description ||
        !category ||
        !colors ||
        !price ||
        !stock ||
        !files
      ) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post(
          `/item/createitem/${id}`,
          {
            name,
            company,
            description,
            category,
            colors: colors.split(" "),
            price,
            featured,
            stock,
            images: files,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Item created successfully",
          error: "Unable to create item",
          loading: "Creating item...",
        }
      );
      console.log("data", " >> ", data);
      return;
    } catch (error) {}
  };

  const onUpload = (pics) => {
    let arr = [];
    for (let index = 0; index < pics.length; index++) {
      const element = pics[index];
      if (element.type === "image/jpeg" || element.type === "image/png") {
        const data = new FormData();
        data.append("file", element);
        data.append("upload_preset", "zenstore");
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => arr.push(data.url.toString()));
        setFiles(arr);
      } else {
        toast.error("Please select an image in jpeg or png format");
      }
    }
  };

  return (
    <>
      <div className="create-item-container">
        <div className="flex-center new-user-container">
          <h2 className="form-heading">Add new Item</h2>
          <form
            onSubmit={formSubmit}
            className="register-form"
          >
            <div className="form-same-row">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter name"
                value={formDetails.name}
                onChange={inputChange}
              />
              <input
                type="text"
                name="company"
                className="form-input"
                placeholder="Enter company name"
                value={formDetails.company}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="category"
                className="form-input"
                placeholder="Enter category"
                value={formDetails.category}
                onChange={inputChange}
              />
              <input
                type="file"
                onChange={(e) => {
                  onUpload(e.target.files);
                }}
                name="profile-pic"
                id="profile-pic"
                className="form-input"
                multiple
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="stock"
                className="form-input"
                placeholder="Enter stock"
                value={formDetails.stock}
                onChange={inputChange}
              />
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="Enter item price"
                value={formDetails.price}
                onChange={inputChange}
              />
            </div>
            <textarea
              name="description"
              className="desc"
              cols="10"
              rows="5"
              value={formDetails.description}
              placeholder="Enter description"
              onChange={inputChange}
            ></textarea>
            <div className="form-same-row">
              <select
                name="featured"
                id="rating"
                value={formDetails.featured}
                onChange={inputChange}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
              <input
                type="text"
                name="colors"
                className="form-input"
                placeholder="Enter colors (space separated in hex format)"
                value={formDetails.colors}
                onChange={inputChange}
              />
            </div>
            <button
              type="submit"
              className="btn form-btn"
            >
              add item
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateItem;
