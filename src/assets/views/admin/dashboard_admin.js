
import NavbarAdmin from "../../components/admin/navbar_admin";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';


function DashboardAdmin() {
    return (
      <div>
        <NavbarAdmin/>
        <h1>Dashboard de Admin</h1>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
      </div>
    );
  }
  
  export default DashboardAdmin;