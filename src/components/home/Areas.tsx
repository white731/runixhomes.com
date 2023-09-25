import { ThemeContext } from "@emotion/react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import areas from "../../images/areas.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Areas = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "Center" }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
            color: "primary.main",
          }}
        >
          Areas We Serve
        </Typography>
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            maxWidth: "50%",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "primary.main",
            }}
          >
            Southern Idaho
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "primary.main",
              marginTop: 1.5,
              marginBottom: 1.5,
            }}
          >
            Rupert, Burley, Paul, Twin Falls, Declo, Albion, Sun Valley, Hailey,
            Bellvue, Elba, Malta & Raft River
          </Typography>
          <Button
            onClick={() => window.open("tel:+12082195001")}
            variant="contained"
          >
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">208 219 5001</Typography>
          </Button>
          <Button
            onClick={() => window.open("mailto:landon@runixhomes.com")}
            variant="contained"
            sx={{ marginTop: "7px", marginBottom: 1.5 }}
          >
            <EmailIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">landon@runixhomes.com</Typography>
          </Button>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "primary.main",
              marginTop: "15px",
            }}
          >
            Salt Lake City
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "primary.main",
              marginTop: 1.5,
              marginBottom: 1.5,
            }}
          >
            West Valley, West Jordan, Sandy, Draper, Bluffdale, Orem, Eagle
            Mountain, Saratoga Springs, Provo, Heber, Park City, & South Salt
            Lake City
          </Typography>
          <Button
            onClick={() => window.open("tel:+13857438966")}
            variant="contained"
          >
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">385 743 8966</Typography>
          </Button>
          <Button
            onClick={() => window.open("mailto:bruce@runixhomes.com")}
            variant="contained"
            sx={{ marginTop: "7px", marginBottom: 1.5 }}
          >
            <EmailIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">bruce@runixhomes.com</Typography>
          </Button>
        </Box>
      </Box>
      <Box>
        <img src={areas} alt="areas-we-serve" style={{ height: "600px" }} />
      </Box>
    </Box>
  );
};

export default Areas;
