import { Box, Typography } from "@mui/material";

export const OptionalAddons = () => {
  return (
    <Box
      sx={{
        border: 1,
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "Center" }}>
        Optional Add-on's
      </Typography>
    </Box>
  );
};
