import React from "react";
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const FormSubmit = () => {
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); // Clear all fields
  };

  return (
    <div className="Contact">
      <div className="Heading">
        <h1>Get in Touch With RushBite!</h1>
        <h3>We're here to help you. Drop us a message or reach out anytime.</h3>
      </div>
      <div className="contact-card">
        <p>Name</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>Email Address</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <p>Phone Number (optional)</p>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <p>Subject</p>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <p>Message</p>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button className="Send" onClick={FormSubmit}>
        Send Message
      </button>
      <div className="contact-details">
        <div className="phone-email">
          <div className="phone-details">
            <h4>Phone Support</h4>
            <p>+1(800)123-Food</p>
          </div>
          <div className="email">
            <h4>Email</h4>
            <p>Support@rushbite.com</p>
          </div>
        </div>
        <div className="office-address">
          <h4>Office Address</h4>
          <p>
            RushBite, Near Wipro Circle
            <br />
            Hinjewadi Phase 1, Pune
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
