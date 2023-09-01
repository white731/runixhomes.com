import { ThemeContext } from "@emotion/react";
import {
  Container,
  Typography,
  Box
} from "@mui/material";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import areas from "../../images/areas.png";

const Areas = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "11rem",
        marginTop: "40px",
        marginBottom: "40px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginTop: "40px",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        Areas we Serve
      </Typography>
      <img src={areas} alt="areas-we-serve" style={{ height: "600px" }} />
    </Box>
    </Container>
  )
};

export default Areas;
