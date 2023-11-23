import React, { useState } from "react";
import "../../css/contacUs.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [warnings, setWarnings] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpiar advertencias previas
    setWarnings({
      name: "",
      email: "",
      message: "",
    });

    // Validaciones
    if (name.length < 5 || name.length > 50) {
      setWarnings((prev) => ({ ...prev, name: "Name should be between 5 and 50 characters." }));
    }

    if (!email.match(/\S+@\S+\.\S+/)) {
      setWarnings((prev) => ({ ...prev, email: "Invalid email format. It should be like example@gmail.com" }));
    }

    if (message.length < 10 || message.length > 250) {
      setWarnings((prev) => ({ ...prev, message: "Message should be between 10 and 250 characters." }));
    }

    // Si hay advertencias, no continuar con el envío
    if (Object.values(warnings).some((warning) => warning !== "")) {
      return;
    }

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
      <div className="contact-us">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {warnings.name && <p className="error-message">{warnings.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {warnings.email && <p className="error-message">{warnings.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            {warnings.message && <p className="error-message">{warnings.message}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
