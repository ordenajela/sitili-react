import PrimarySearchAppBar from "../../../components/navbar2";
import CarouselCategories from "../../../components/carousel-categories";
import FilterTags from "../../../components/filter-tags";
import Paper from '@mui/material/Paper';
import ResponsiveGridWithPagination from "../../../components/products";
import StickyFooter from "../../../components/footer";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';



function UserProductos({ darkMode, setDarkMode, userData }) {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        flexGrow: 1,
        backgroundColor: darkMode ? '#1A2027' : '#fff',
      }}>

        <div>
          <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode}/>
          {/* <CarouselCategories /> */}
          <ResponsiveGridWithPagination />
          {/* <StickyFooter /> */}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default UserProductos;