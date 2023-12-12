import React, {useState} from "react";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import TableCategory from "../../../../components/admin/category/TableCategory";

const CategoryAdmin = ({ darkMode, setDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavAdmin />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
           <TableCategory/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryAdmin;
