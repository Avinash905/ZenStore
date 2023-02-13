import React, { useState } from "react";
import "../style/contact.css";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <section className="contact-section">
      <h2 className="contact-heading">Contact Page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.4812943646!2d77.06889958275826!3d28.527280343785993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1672433776701!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: "0" }}
        loading="lazy"
        className="map"
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
      ></iframe>
      <div className="form">
        <form
          action="https://formspree.io/f/xkneldwn"
          method="POST"
        >
          <input
            type="text"
            placeholder="Username"
            value={formDetails.name}
            name="username"
            onChange={inputChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formDetails.email}
            onChange={inputChange}
            required
          />
          <textarea
            placeholder="Message"
            name="message"
            rows="8"
            required
            value={formDetails.message}
            onChange={inputChange}
          ></textarea>
          <button
            type="submit"
            className="btn"
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
