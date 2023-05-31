import { Box, CardContent, Card, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        // backgroundColor: "primary.dark",
        backgroundImage: "url(https://runixhomes.com/img/header-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        // opacity: [0.6],
      }}
    >
      <Box
        sx={{
          background: "rgba(57, 63, 103, 0.75)",
          width: "100%",
          height: "50vh",
        }}
      >
        <Box sx={{ paddingTop: "100px", maxWidth: "30%", marginLeft: "20%" }}>
          <Typography variant={"h4"} sx={{ color: "secondary.main" }}>
            Property Maintenance Subscriptions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
