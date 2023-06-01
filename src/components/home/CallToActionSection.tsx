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
        height: "75vh",
        backgroundImage: "url(https://runixhomes.com/img/header-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
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
          handleClick={() => window.location.replace("/#contact")}
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
