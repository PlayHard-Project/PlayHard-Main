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
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para controlar si se está enviando el formulario

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evitar múltiples envíos mientras se está procesando
    if (isSubmitting) {
      return;
    }

    // Validaciones síncronas
    const nameWarning = (name.length < 5 || name.length > 50) ? "Name should be between 5 and 50 characters." : "";
    const emailWarning = !email.match(/\S+@\S+\.\S+/) ? "Invalid email format. It should be like example@gmail.com" : "";
    const messageWarning = (message.length < 10 || message.length > 250) ? "Message should be between 10 and 250 characters." : "";

    // Establecer advertencias
    setWarnings({
      name: nameWarning,
      email: emailWarning,
      message: messageWarning,
    });

    // Verificar si hay alguna advertencia
    if (nameWarning || emailWarning || messageWarning) {
      return;
    }

    // Iniciar el proceso de envío
    setIsSubmitting(true);

    const formData = {
      to: 'playhard.jala.managment@gmail.com',
      subject: 'Contact Us: Request for ' + email,
      html: `<p>Name:  ${name} <br/> Email:  ${email} <br/> Contenido del correo: ${message}</p>`,
    };

    try {
      const response = await fetch('http://localhost:9000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage('Your request has been sent. You will soon receive a reply to the email you provided.');
      } else {
        setSubmissionMessage('Error submitting the form. Please try again.');
      }
      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmissionMessage('Error submitting the form. Please try again.');
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }
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
            {warnings.email && (
              <p className="error-message">{warnings.email}</p>
            )}
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
            {warnings.message && (
              <p className="error-message">{warnings.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Submit'}
          </button>

          {submissionMessage && <p className="submission-message green">{submissionMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
