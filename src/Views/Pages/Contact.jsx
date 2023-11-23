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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const formData = {
      to: 'playhard.jala.managment@gmail.com',
      subject: 'Contact Us: Request for ' + email,
      html: `<p>Contenido del correo: ${message}</p>`,
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
        setSubmissionMessage('Tu solicitud ha sido enviada. Pronto recibirás una respuesta en el correo que proporcionaste.');
      } else {
        setSubmissionMessage('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
      }

      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmissionMessage('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }

    // Limpiar el formulario después del envío exitoso o fallido
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

          <button type="submit">Submit</button>

          {submissionMessage && <p className="submission-message green">{submissionMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
