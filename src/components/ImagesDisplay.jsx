import React, { useState } from "react";
import "../style/imagesdisplay.css";

export const ImagesDisplay = ({ image = [{ url: "" }] }) => {
  const [img, setImg] = useState(image[0]);
  const changeImage = (ele) => {
    setImg(ele);
  };
  return (
    <div className="single-prod-left grid">
      <div className="left-img">
        {image.map((ele, index) => {
          return (
            <img
              key={index}
              src={ele.url}
              alt={ele.filename}
              onClick={() => {
                changeImage(ele);
              }}
            />
          );
        })}
      </div>
      <div className="right-img">
        <img src={img.url} alt={img.filename} />;
      </div>
    </div>
  );
};
