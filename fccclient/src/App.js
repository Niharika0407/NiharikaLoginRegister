import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

function App() {
  const googleClientId = process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN;

  const [gOrM,setGOrM] = useState(true);

  const childComponent=(googleOrManual)=>{
    setGOrM(googleOrManual);
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <div className="App">
          <Navbar gOrM={gOrM}/>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/auth" element={<Auth childComponent={childComponent}/>}></Route>
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
