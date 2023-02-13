import React, { useState } from "react";
import "../style/imagesdisplay.css";

export const ImagesDisplay = ({ images }) => {
  const [img, setImg] = useState(images ? images[0] : "");

  const changeImage = (ele) => {
    setImg(ele);
  };
  return (
    <div className="single-prod-left grid">
      <div className="left-img">
        {images?.map((ele, index) => {
          return (
            <img
              key={index}
              src={ele}
              alt={`${index + 1}st`}
              onClick={() => {
                changeImage(ele);
              }}
            />
          );
        })}
      </div>
      <div className="right-img">
        <img
          src={img}
          alt={"product"}
        />
      </div>
    </div>
  );
};
