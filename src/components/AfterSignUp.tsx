import { Box, Container, Typography } from "@mui/material";

export const AfterSignUp = () => {
  return (
    <Container sx={{ backgroundColor: "secondary.main" }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "secondary.main",
          paddingTop: "60px",
          paddingBottom: "500px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
            Thank you for submitting your order! We'll be in touch soon to
            confirm your service request.
          </Typography>
          <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
            Feel free to call or text us with any questions at (208)219-5001
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};
