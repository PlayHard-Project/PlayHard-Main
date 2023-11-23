import React, { useState } from "react";
import "../../css/contacUs.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic here
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container">
      <div className="sc-container">
        <div className="text-container">
          <label className="title">{title}</label>
          <p>{description}</p>
          <p>
            Need to get in touch with us? Fill out the form with your inquiry or
            find below the e-mail address jefer@gmail.com to contact us.
          </p>
          <Link to={"/home"}>
            <button
              className="sc-btn"
              style={{ background: buttonColor }}
            >
              Back to HomePage
            </button>
          </Link>{" "}
        </div>
        <img src={imageSrc} alt={altText} />
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
      </style>
    </div>
  );
};

export default Contact;
