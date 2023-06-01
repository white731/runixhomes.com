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
} from "@mui/material";
import { CustomButton } from "../../hooks/CustomButton";

const ContactUsSection = () => {
  return (
    <Box
      sx={{
        background: "secondary.main",
        width: "100%",
        marginBottom: "50px",
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
          variant={"h3"}
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
        <FormControl>
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Name"
            defaultValue="Name"
            color="secondary"
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Phone Number"
            defaultValue="Phone Number"
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="Street Adress"
            defaultValue="Street Address"
          />
          <TextField
            variant="outlined"
            sx={{ margin: "7px" }}
            label="City, State and Zip"
            defaultValue="City, State and Zip"
          />
        </FormControl>

        <CustomButton
          text="Submit"
          customStyle={{ marginTop: "10px" }}
          handleClick={() => {}}
          // variant="contained"
          // sx={{
          //   marginTop: "10px",
          //   backgroundColor: "#C39A97",
          //   "&:hover": {
          //     backgroundColor: "primary.main",
          //   },
          // }}
        ></CustomButton>
      </Container>
    </Box>
  );
};

export default ContactUsSection;
