import { Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const handleCallPhone = () => {
  window.open("tel:+12082195001");
};

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        backgroundColor: "primary.main",
        width: "100%",
        position: "fixed",
        left: 0,
        bottom: 0,
      }}
    >
      <Box>
        <IconButton>
          <ChatIcon color="secondary" />
        </IconButton>
        <IconButton onClick={handleCallPhone}>
          <LocalPhoneIcon color="secondary" />
        </IconButton>
        <IconButton onClick={() => window.location.replace("/#contact")}>
          <EmailIcon color="secondary" />
        </IconButton>
      </Box>
      <Typography sx={{ color: "secondary.main" }} variant="caption">
        Runix Home Services LLC Copyright 2023
      </Typography>
    </Box>
  );
};

export default Footer;
