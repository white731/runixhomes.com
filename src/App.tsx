import React, { useEffect, useState } from "react";
import "./App.css";
import GoogleButton from "react-google-button";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AfterSignUp } from "./components/AfterSignUp";
import { AfterLearnMore } from "./components/AfterLearnMore";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#393F67",
    },
    secondary: {
      main: "#F7F6F1",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1280,
      xl: 1500,
    },
  },
});

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/" element={<Login app={app} />} />
              <Route path="signup/:propertyid" element={<Signup />} />
              <Route path="signup/complete" element={<AfterSignUp />} />
              <Route path="learnmore/complete" element={<AfterLearnMore />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
