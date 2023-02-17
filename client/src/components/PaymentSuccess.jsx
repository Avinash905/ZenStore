import React from "react";
import "../style/paymentsuccess.css";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const reference = useLocation().search.split("=")[1];

  return (
    <>
      <div className="flex-center payment">
        <h2>Order Successfull</h2>
        <span>Reference No: {reference}</span>
      </div>
    </>
  );
};
export default PaymentSuccess;
