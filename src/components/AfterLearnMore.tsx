import { Box, Container, Typography } from "@mui/material";

export const AfterLearnMore = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "secondary.main",
        paddingTop: "60px",
        paddingBottom: "10px",
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
          Thank you for your interest! We'll be in touch soon to answer any
          questions you have.
        </Typography>
        <Typography variant="h6" sx={{ margin: "10px", textAlign: "center" }}>
          In the meantime, feel free to call or text us with any additional
          questions at (208)219-5001
        </Typography>
      </Container>
    </Box>
  );
};
