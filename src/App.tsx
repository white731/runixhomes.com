import React, { useEffect, useState } from "react";
import "./App.css";
import GoogleButton from "react-google-button";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBFmXpDJkOFigewKHjL1ByAqe9UpYxji_0",
  authDomain: "authentication-example-3107a.firebaseapp.com",
  projectId: "authentication-example-3107a",
  storageBucket: "authentication-example-3107a.appspot.com",
  messagingSenderId: "591515814813",
  appId: "1:591515814813:web:e537722234d372af10fd74",
  measurementId: "G-VCPP48ZM6T",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/" element={<Login app={app} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
