import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import "../../css/LogIn/logInStyle.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
    const signUpImage =
    "https://res.cloudinary.com/playhardimages/image/upload/v1700626890/SignUpSignInImage.png";
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
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
    };
    return requirements;
  };

  const handleSignUp = () => {
    const passwordRequirements = validatePassword();

    if (!email) {
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
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "bottom-right",
      });
    } else if (!password) {
      toast.error("Password cannot be empty.", {
        position: "bottom-right",
      });
    } else if (!passwordRequirements.minLength){
      toast.error("The password cannot be less than 6 characters.", {
        position: "bottom-right",
      });
    } else if(password.includes(" ")){
      toast.error("Please enter a valid password.", {
        position: "bottom-right",
      });
    } else {
      toast.success(`Login successful for ${email}!`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="container container-login">
      <div className="container-information">
        <div className="title-login" style={{ marginBottom: "20px" }}> Welcome back!</div>
        <div style={{marginBottom: "50px", fontWeight:"bold"}}>Enter your Credentials to access your account</div>
        <div>
          <div>
            <label htmlFor="email">Email Address*</label>
          </div>
          <input type="email" id="email" name="email" className="input-add" value={email} onChange={handleInputChange} placeholder="example@gmail.com"/>
          <div style={{ width:"70%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="password">Password*</label>
            <Link to="/forgot-password" style={{ color: 'blue' }}>Forgot password</Link>
          </div>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} id="password" name="password" className="input-add" placeholder="Password" value={password} onChange={handlePasswordChange}
            />
            <button type="button" className="toggle-password" onClick={toggleShowPassword}>
              {showPassword ? <BiSolidHide style={{marginLeft:"10px" , fontSize:'26px'}}/> : <BiShow style={{marginLeft:"10px" , fontSize:'26px'}}/>}
            </button>
          </div>
        </div>
        <button className="button-signup" onClick={handleSignUp}>
          Login
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
            <span>LogIn with Google</span>
          </button>
        </div>
        <div style={{ width: "70%", textAlign: "center", marginTop: "10px" }}>
        Don’t have an account?{" "}
          <Link to="/sign-up" style={{ color: "blue" }}>
            Sign Up
          </Link>
        </div>
      </div>
      <div className="image-container-signup hidden md:block">
        <img src={signUpImage} alt="SignUp" className="image-signUp" />
      </div>
    </div>
  );
};

export default Login;