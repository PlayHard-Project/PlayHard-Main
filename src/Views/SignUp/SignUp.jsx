import React, { useState } from "react";
import signUpImage from "./SignUp-SignInImage.png";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "../../css/SignUp/signUpStyle.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
    const truncatedValue = value.substring(0, 20);
    if (value.length > 20) {
      toast.error("El nombre no puede exceder los 20 caracteres.", {
        position: "bottom-right",
      });
    }
    if (
      value === "" ||
      /^[^\s@#$%^&*()+-={}|<>]+$/i.test(truncatedValue)
    ) {
      setName(truncatedValue);
    } else {
      toast.error(
        "El nombre no puede contener caracteres especiales o espacios en el medio o al final.",
        {
          position: "bottom-right",
        }
      );
    }
    } else if (name === "email") {
        if (
            value === "" ||
            /^[^\s@#$%^&*()+-={}|<>]+$/i.test(value)
          ) {
            setEmail(value);
      } else {
        toast.error("Email address cannot contain spaces.", {
          position: "bottom-right",
        });
      }
      if (/^[^\s@]+@gmail\.com$/.test(value)) {
        setEmail(value);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowPasswordRequirements(!!newPassword);
  };

  const validatePassword = () => {
    const requirements = {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
    };
    return requirements;
  };

  const handleSignUp = () => {
    const passwordRequirements = validatePassword();

    if (!name) {
      toast.error("Name cannot be empty.", {
        position: "bottom-right",
      });
    } else if (name.length < 6) {
        toast.error("Name must be at least 6 characters long.", {
          position: "bottom-right",
        });
    } else if (!email) {
      toast.error("Email cannot be empty.", {
        position: "bottom-right",
      });
    } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      toast.error(
        "Please enter a valid email address. Only Gmail addresses ending in @gmail.com are accepted.",
        {
          position: "bottom-right",
        }
      );
    } else if (!password) {
      toast.error("Password cannot be empty.", {
        position: "bottom-right",
      });
    } else if (
      !passwordRequirements.minLength ||
      !passwordRequirements.hasNumber ||
      !passwordRequirements.hasSpecialChar ||
      !passwordRequirements.hasUpperCase ||
      !passwordRequirements.hasLowerCase
    ) {
      toast.error("Please enter a valid password.", {
        position: "bottom-right",
      });
    } else {
      toast.success(`Sign Up successful for ${name}!`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="container container-sign">
      <div className="container-information">
        <div className="title-signUp" style={{marginBottom: "50px"}}>Get Started Now</div>
        <div>
          <div>
            <label htmlFor="name">Name*</label>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            className="input-add"
            placeholder="Name"
            value={name}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="email">Email Address*</label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            className="input-add"
            value={email}
            onChange={handleInputChange}
            onClick={() => setEmail("")}
            placeholder="example@gmail.com"
          />
          <div>
            <label htmlFor="password">Password*</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className="input-add"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {showPasswordRequirements && (
            <div className="password-requirements">
              <ul>
                <li className={password.length >= 6 ? "valid" : ""}>
                  {" "}
                  Minimum 6 characters{" "}
                </li>
                <li className={/\d/.test(password) ? "valid" : ""}>
                  {" "}
                  At least 1 number{" "}
                </li>
                <li
                  className={
                    /[!@#$%^&*(),.?":{}|<>]/.test(password) ? "valid" : ""
                  }
                >
                  At least 1 special character
                </li>
                <li className={/[A-Z]/.test(password) ? "valid" : ""}>
                  At least 1 uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? "valid" : ""}>
                  At least 1 lowercase letter
                </li>
              </ul>
            </div>
          )}
        </div>
        <button className="button-signup" onClick={handleSignUp}>
          Sign Up
        </button>
        <div style={{ width: "70%", textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
          or
        </div>
        <div style={{ width: "70%", textAlign: "center", marginTop: "10px" }}>
          <button
            className="google-signup-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <FcGoogle style={{ marginRight: "8px", fontSize: "24px" }} />
            <span>Sign Up with Google</span>
          </button>
        </div>
        <div style={{ width: "70%", textAlign: "center", marginTop: "10px" }}>
          Have an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Login
          </Link>
        </div>
      </div>
      <div className="image-container-signup hidden lg:block">
        <img src={signUpImage} alt="SignUp" className="image-signUp" />
      </div>
    </div>
  );
};

export default SignUp;