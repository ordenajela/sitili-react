import React from "react";
import { SidenavAdmin } from "../../../components/admin/SidenavAdmin";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const About = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <SidenavAdmin />
        <h1>aLO dIEGO</h1>
        
      </Box>
    </>
  );
};

export default About;
