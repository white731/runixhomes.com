import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { CustomButton } from "../../hooks/CustomButton";

const RunixExperienceSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        paddingBottom: "100px",
        // height: "75vh",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginTop: "40px",
            textAlign: "center",
            color: "secondary.main",
          }}
        >
          The Runix Experience
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: { md: "45%" } }}>
            <CardMedia
              component="img"
              height="200"
              image="https://runixhomes.com/img/header-bg.jpg"
              alt="Paella dish"
            />
          </Card>
          <Box sx={{ width: { md: "45%" }, margin: "3%" }}>
            <Typography sx={{ color: "secondary.main" }}>
              The Runix experience begins with a free home maintenance
              assessment with one of Runix's experienced home technicians. This
              allows for us to understand your priorities for maintenance, as
              well as learning about any separate repair needs that might have
              accumulated around your home. We’ll also look at the Runix
              services that aren’t appropriate for every home (such as servicing
              the gargitbage disposal or sump pump).
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: { md: "45%" } }}>
            <CardMedia
              component="img"
              height="200"
              image="https://runixhomes.com/img/header-bg.jpg"
              alt="Paella dish"
            />
          </Card>
          <Box sx={{ width: { md: "45%" }, margin: "3%" }}>
            <Typography sx={{ color: "secondary.main" }}>
              After the walkthrough, we’ll provide you a proposal outlining the
              quarterly price as well as a schedule of the services included.
              This is an opportunity to customize your plan, adding or
              subtracting services as you like so that you’re only paying for
              what you need to keep your house in great condition.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: { md: "45%" } }}>
            <CardMedia
              component="img"
              height="200"
              image="https://runixhomes.com/img/header-bg.jpg"
              alt="Paella dish"
            />
          </Card>
          <Box sx={{ width: { md: "45%" }, margin: "3%" }}>
            <Typography sx={{ color: "secondary.main" }}>
              We'll text you a week before and the day before each service to
              remind you about your home service. From there all your work is
              done! Just relax and enjoy the knowledge that you’re doing a great
              job taking care of your home!
            </Typography>
          </Box>
          <CustomButton
            text="Learn More"
            handleClick={() => {
              window.location.replace("/#contact");
            }}
            customStyle={{ maxWidth: 300, marginTop: "20px" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RunixExperienceSection;
