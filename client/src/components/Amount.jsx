import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Amount = ({ amount, id, setDec, setInc, max }) => {
  const [count, setCount] = useState(amount);
  return (
    <div className="incdec">
      <button
        onClick={() => {
          setDec(id, amount);
          setCount(count - 1);
        }}
      >
        <AiOutlineMinus />
      </button>
      <div>{count}</div>
      <button
        onClick={() => {
          setInc(id, amount, max);
          setCount(count + 1);
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Amount;
