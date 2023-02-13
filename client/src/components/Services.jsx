import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import "../style/services.css";

const Services = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="grid grid-three">
          <div className="superfast">
            <TbTruckDelivery className="icon" />
            <h3>Super Fast and Free Delivery</h3>
          </div>
          <div className=" superfast-center">
            <div>
              <MdSecurity className="icon" />
              <h3>Non-contact Shipping</h3>
            </div>
            <div>
              <GiReceiveMoney className="icon" />
              <h3>Money-back Guaranteed</h3>
            </div>
          </div>
          <div className="superfast">
            <RiSecurePaymentLine className="icon" />
            <h3>Super Secure Payment System</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
