import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Amount = ({ amount, incFunc, decFunc }) => {
  return (
    <div className="incdec">
      <button
        onClick={() => {
          decFunc();
        }}
      >
        <AiOutlineMinus />
      </button>
      <div>{amount}</div>
      <button
        onClick={() => {
          incFunc();
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Amount;
