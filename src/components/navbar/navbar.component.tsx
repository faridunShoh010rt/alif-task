import React from "react";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

export const Navbar: React.FC = () => {
  return (
    <AppBar sx={{ backgroundColor: "#673ab7" }} position="static">
      <Container maxWidth="xl" component="div">
        <Typography mt={2} mb={2} variant="h5">
          Алиф Таск
        </Typography>
      </Container>
    </AppBar>
  );
};
