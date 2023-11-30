import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import {GridLoader} from "react-spinners";
import "../../css/SignUp/signUpStyle.css";

const SignUp = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const apiBackend = 'https://backend-fullapirest.onrender.com/api';
  const navigate = useNavigate();
  const [name, setName] = useState("");
  var [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const signUpImage =
    "https://res.cloudinary.com/playhardimages/image/upload/v1700626890/SignUpSignInImage.png";
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const truncatedValue = value.substring(0, 20);
      if (value.length > 20) {
        toast.error("The name cannot exceed 20 characters.", {
          position: "bottom-right",
        });
      }
      if (value === "" || /^[^\s@#$%",ç^&*()+={}|<>]+$/i.test(truncatedValue)) {
        setName(truncatedValue);
      } else {
        toast.error("The name cannot contain special characters or spaces.", {
          position: "bottom-right",
        });
      }
    } else if (name === "email") {
      if (!/\s/.test(value)) {
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
    const trimmedPassword = newPassword.trim();
    setShowPasswordRequirements(!!trimmedPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    const requirements = {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?:{}|<>]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
    };
    return requirements;
  };

  const handleSignUp = async () => {
    const passwordRequirements = validatePassword();
    if (!name) {
      toast.error("Name cannot be empty.", {
        position: "bottom-right",
      });
      return;
    } else if (name.trim() === "") {
      toast.error("Name cannot be just spaces.", {
        position: "bottom-right",
      });
      return;
    } else if (name.length < 6) {
      toast.error("Name must be at least 6 characters long.", {
        position: "bottom-right",
      });
      return;
    } else if (!email) {
      toast.error("Email cannot be empty.", {
        position: "bottom-right",
      });
      return;
    } else if (!/^[^\s@]+@gmail\.com$/.test(email.toLowerCase())) {
      toast.error(
        "Please enter a valid email address. Only Gmail addresses ending in @gmail.com are accepted.",
        {
          position: "bottom-right",
        }
      );
      return;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "bottom-right",
      });
      return;
    } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
      toast.error("Please enter a valid name.", {
        position: "bottom-right",
      });
      return;
    } else if (!password) {
      toast.error("Password cannot be empty.", {
        position: "bottom-right",
      });
      return;
    } else if (
      !passwordRequirements.minLength ||
      !passwordRequirements.hasNumber ||
      !passwordRequirements.hasSpecialChar ||
      !passwordRequirements.hasUpperCase ||
      !passwordRequirements.hasLowerCase ||
      password.includes(" ")
    ) {
      toast.error("Please enter a valid password", {
        position: "bottom-right",
      });
      return;
    }
    setIsRegistering(true);
    //Created POST request
    try {
      email = email.toLowerCase();
      const response = await fetch(
        apiBackend+"/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            isAdmin: "false",
          }),
        }
      );

      const responseData = await response.json();

      if (responseData.error) {
        toast.error(responseData.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(`Sign Up successful for ${name}!`, {
          position: "bottom-right",
        });
        signInAfterSignUp();
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup. Please try again.", {
        position: "bottom-right",
      });
    }finally {
      setIsRegistering(false);
    }
  };

  // HANDLES LOGIN
  const signInAfterSignUp = async () => {
    try {
      const response = await fetch(apiBackend+'/sign-in', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      const { tokenSession } = data;
      if (tokenSession) {
        localStorage.setItem("token", tokenSession);
      }
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (isRegistering) {
    return (
      <div
        className="flex flex-col items-center justify-center p-3 gap-16 min-h-screen"
      >
        <GridLoader color="#023fc5" />
      </div>
    );
  }

  return (
    <div className="container container-sign">
      <div className="container-information">
        <div className="title-signUp" style={{ marginBottom: "50px" }}>
          Get Started Now
        </div>
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
            placeholder="example@gmail.com"
          />
          <div>
            <label htmlFor="password">Password*</label>
          </div>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="input-add"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <BiSolidHide style={{ marginLeft: "10px", fontSize: "26px" }} />
              ) : (
                <BiShow style={{ marginLeft: "10px", fontSize: "26px" }} />
              )}
            </button>
          </div>
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
                    /[!@#$%^&*(),.?:{}|<>]/.test(password) ? "valid" : ""
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
        <div
          style={{
            width: "70%",
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
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
          <Link to="/sign-in" style={{ color: "blue" }}>
            Login
          </Link>
        </div>
      </div>
      <div className="image-container-signup hidden md:block">
        <img src={signUpImage} alt="SignUp" className="image-signUp" />
      </div>
    </div>
  );
};

export default SignUp;
