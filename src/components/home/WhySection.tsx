import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const WhySection = () => {
  return (
    <Box
      sx={{
        background: "secondary.main",
        width: "100%",
        paddingBottom: "100px",
        // height: "75vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginTop: "40px", textAlign: "center" }}
        >
          Why do I need regular home maintenance?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <Card sx={{ marginRight: "30px" }}>
            <CardMedia
              component="img"
              height="194"
              image="https://runixhomes.com/img/header-bg.jpg"
              alt="Paella dish"
            />
          </Card>
          <Box>
            <Typography sx={{ margin: "3px" }}>
              • Homes are full of tanks, piles, wires and motors that need
              serviced.
            </Typography>
            <Typography sx={{ margin: "3px" }}>
              • Money spent maintaining your home is an investment in your
              biggest asset.
            </Typography>
            <Typography sx={{ margin: "3px" }}>
              • Protect your home from fires, flooding, appliance failure &
              energy waste.
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "40px", textAlign: "center" }}
        >
          Why not do it yourself?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <Card sx={{ marginLeft: "30px" }}>
            <CardMedia
              component="img"
              height="194"
              image="https://res.cloudinary.com/dndx9szw0/image/upload/v1685644584/Runix%20Logos/Screenshot_2023-06-01_at_12.36.15_PM_uuvhoz.png"
              alt="Paella dish"
            />
          </Card>
          <Box sx={{ marginTop: "20px" }}>
            <Typography>
              • We save you between 20 and 40 hours a year working on your home.
            </Typography>
            <Typography>
              • We have thousands of dollars of specialized equipment designed
              to correctly and quickly maintain homes.
            </Typography>
            <Typography>• You should be golfing instead.</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhySection;
