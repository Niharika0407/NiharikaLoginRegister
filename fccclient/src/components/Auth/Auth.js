import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import axios from "axios";

const Auth = ({ childComponent }) => {
  const [googleOrManual, setGoogleOrManual] = useState(true);

  let navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, sub } = decoded;
    const result = { name: name, picture: picture, sub: sub };
    console.log(decoded);

    try {
      dispatch({ type: "AUTH", data: result });
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    console.log("This is g response", response.credential);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleManualClick = () => {
    setGoogleOrManual(true);
  };

  childComponent(googleOrManual);

  return (
    <div>
      <div>{isSignUp ? "Sign Up" : "Sign In"}</div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        action={isSignUp ? "/signup" : "/signin"}
      >
        {isSignUp && (
          <>
            <label for="firstName">First Name:</label>
            <input
              placeholder="Enter First Name"
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
            ></input>
            <label for="lastName">Last Name:</label>
            <input
              placeholder="Enter Last Name"
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
            ></input>
          </>
        )}
        <br />
        <label for="email">Email:</label>
        <input
          placeholder="Enter email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></input>
        <br />
        <label for="password">Password:</label>
        <input
          placeholder="Enter Passowrd"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        ></input>
        <br />
        {isSignUp && (
          <>
            <label for="confirmPassword">Confirm Password:</label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            ></input>
          </>
        )}
        <br></br>
        <br />
        <button type="submit" onClick={handleManualClick}>
          {isSignUp ? "SignUp" : "SignIn"}
        </button>
        <br />
        <br />

        <GoogleLogin
          onSuccess={(response) => {
            setGoogleOrManual(false);
            createOrGetUser(response);
          }}
          onError={() => console.log("Error")}
        />

        <br />
        <button onClick={switchMode}>
          {isSignUp
            ? "Already have an account? SignIn"
            : "Dont have an account?SignUp"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
