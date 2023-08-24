import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  let navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomId = Math.floor(Math.random() * 1000);
    return `input_${timestamp}_${randomId}`;
  };
  const handleChange = (e) => {
    const inputId = generateUniqueId();
    setFormData({ ...formData, [e.target.name]: e.target.value, id: inputId });
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
    const decoded= jwt_decode(response.credential);
    const {name,picture,sub}=decoded;

    const result = { name, picture, sub };
    const token = sub;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log("This is g response",response.credential);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

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
            <label for="name">Name:</label>
            <input
              placeholder="Enter name"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            ></input>
          </>
        )}
        <br/>
        <label for="email">Email:</label>
        <input
          placeholder="Enter email"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        ></input>
        <br/>
        <label for="password">Password:</label>
        <input
          placeholder="Enter Passowrd"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        ></input>
        <br/>
        {isSignUp && (
          <>
            <label for="confirmPassword">Confirm Password:</label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              required
            ></input>
          </>
        )}
        <button type="submit">{isSignUp ? "SignUp" : "SignIn"}</button>
        <br />
        <br />

        <GoogleLogin
          onSuccess={(response) => createOrGetUser(response)}
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
