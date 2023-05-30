import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Box, Button, Typography } from "@mui/material";

type User = {
  name: string | null;
  email: string | null;
} | null;

type Props = {
  app: FirebaseApp;
};

// Initialize Firebase

const Login = (props: Props) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(props.app);

  useEffect(() => {
    if (
      localStorage.getItem("email") != null ||
      localStorage.getItem("email") != "null"
    ) {
      setUser({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      });
    }
  });

  const [user, setUser] = useState<User>();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
        localStorage.setItem(
          "name",
          user.displayName ? user.displayName : "null"
        );
        localStorage.setItem("email", user?.email ? user?.email : "null");
        localStorage.setItem(
          "photoUrl",
          user?.photoURL ? user?.photoURL : "null"
        );
        setUser({ name: user.displayName, email: user.email });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const showUser = () => {
    // let name = localStorage.getItem("name");
    // let email = localStorage.getItem("email");

    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3">{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <GoogleButton onClick={signIn} />
        <Button sx={{ marginTop: "20px" }} onClick={() => logout()}>
          Logout
        </Button>
        {showUser()}
      </Box>
    </>
  );
};

export default Login;
