import { ThemeContext } from "@emotion/react";
import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomButton } from "../../hooks/CustomButton";

const CallToActionSection = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage:
          "url(https://res.cloudinary.com/dndx9szw0/image/upload/t_Banner%2016:9/v1686290059/Runix%20Website/pexels-binyamin-mellish-186077-1_zsowor.jpg)",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          background: "rgba(57, 63, 103, 0.75)",
          width: "100%",
          height: "75vh",
        }}
      >
        <Box sx={{ paddingTop: "20%", maxWidth: "50%", marginLeft: "10%" }}>
          <Typography
            variant={"h4"}
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Quarterly Home Maintenance
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "12%" }}>
          <Typography sx={{ color: "secondary.main" }}>
            - Prolong the life of your home
          </Typography>
          <Typography sx={{ color: "secondary.main" }}>
            - Prevent accidents
          </Typography>
          <Typography sx={{ color: "secondary.main" }}>
            - Save time and money
          </Typography>
        </Box>
        <CustomButton
          text="Get a Free Quote!"
          handleClick={() => {
            navigate("/learnmore/complete");
            window.location.replace(
              "sms:+12082195001?&body=I'm%20interested%20in%20getting%20a%20quote%20for%20my%20home."
            );
          }}
          customStyle={{
            marginLeft: "12%",
            marginTop: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

export default CallToActionSection;
