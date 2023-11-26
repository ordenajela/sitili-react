import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
  ];

const GraficaPastelAdmin = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={6} >
            <PieChart
            series={[
              {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={200}
          />
        </Grid>
        <Grid item xs={6} >
        <PieChart
            series={[
              {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={200}
          />
        </Grid>
      </Grid>
    </Box>
    
  )
}

export default GraficaPastelAdmin