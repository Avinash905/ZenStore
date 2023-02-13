import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Amount = ({ amount, id, setDec, setInc, max }) => {
  return (
    <div className="incdec">
      <button
        onClick={() => {
          setDec(id, amount);
        }}
      >
        <AiOutlineMinus />
      </button>
      <div>{amount}</div>
      <button
        onClick={() => {
          setInc(id, amount, max);
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Amount;
