import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
  FormControl,
  Input,
  TextField,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { CustomButton } from "../../hooks/CustomButton";

type FormType = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

const ContactUsSection = () => {
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState("");
  const [formData, setFormData] = useState<FormType>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let inputName = e.target.name;

    const data = { ...formData, [inputName]: value };

    setFormData(data);
    console.log(data);
  };

  const handleSubmit = (e: any) => {
    console.log("hi.");
    setSending(true);
    e.preventDefault();
    postNewLead(formData);
  };

  const postNewLead = async (data: FormType) => {
    try {
      let res = await axios.post(
        "https://us-central1-runix-home-services.cloudfunctions.net/postLead",
        data
      );
      setSubmitResult(res.data);
      setSending(false);
      setOpen(true);
      console.log(res.data);
    } catch (error: any) {
      setSubmitResult(error.data);
      setSending(false);
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: "secondary.main",
        width: "100%",
        paddingBottom: "100px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          paddingTop: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={"h4"}
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Contact Us
        </Typography>
        <FormControl>
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Name"
            name="name"
            // defaultValue="Name"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Phone Number"
            name="phone"
            onChange={handleChange}

            // defaultValue="Phone Number"
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Email"
            name="email"
            onChange={handleChange}

            // defaultValue="Email"
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Address"
            name="address"
            onChange={handleChange}

            // defaultValue="Street, City, State and Zip"
          />
        </FormControl>
        <CustomButton
          text="Submit"
          customStyle={{ marginTop: "10px" }}
          handleClick={(e) => handleSubmit(e)}
        ></CustomButton>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={submitResult}
      />
      <Backdrop open={sending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ContactUsSection;
