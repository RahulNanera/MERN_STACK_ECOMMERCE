import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/loginSignup.css";

function LoginSignup() {
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
        navigate("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
        navigate("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const namehandlers = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const emailhandlers = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const passwordhandlers = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <div className="loginSignup">
      <div className="loginContainer">
        <h1 id="loginh1">{state}</h1>
        {state === "Sign Up" ? (
          <input
            value={formData.name}
            onChange={namehandlers}
            type="text"
            id="name"
            placeholder="Your Name"
          />
        ) : null}
        <input
          value={formData.email}
          onChange={emailhandlers}
          type="text"
          id="email"
          placeholder="Email Address"
        />
        <input
          value={formData.password}
          onChange={passwordhandlers}
          type="password"
          id="password"
          placeholder="Password"
        />
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          id="btn4"
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p id="existp">
            Already have an account ?
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p id="existp">
            Create an account ?
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}
        <input type="checkbox" id="checkbox" />
        <p id="termp">
          By continuing, I agree to the terms of use & privacy policy
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
