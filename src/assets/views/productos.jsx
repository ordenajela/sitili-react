import PrimarySearchAppBar from "../components/navbar";
import CarouselCategories from "../components/carousel-categories";
import FilterTags from "../components/filter-tags";
import ResponsiveGridWithPagination from "../components/products";
import StickyFooter from "../components/footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';



const Productos = ({ darkMode, setDarkMode, userData }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        flexGrow: 1,
        backgroundColor: darkMode ? '#1A2027' : '#fff',
      }}>

        <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* <CarouselCategories /> */}
        <ResponsiveGridWithPagination />
        <StickyFooter />
      </Box>
    </ThemeProvider>
  );
}

export default Productos;