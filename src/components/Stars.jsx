import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Stars = (props) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    const number = index + 0.5;
    return props.stars >= index + 1 ? (
      <FaStar className="star" key={index} />
    ) : props.stars >= number ? (
      <FaStarHalfAlt className="star" key={index} />
    ) : (
      <AiOutlineStar className="star" key={index} />
    );
  });
  return ratingStar;
};

export default Stars;
