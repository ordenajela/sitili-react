import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled, useTheme } from '@mui/material/styles';

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieTotalC() {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTotalCategories = async () => {
      try {
        const response = await fetch("http://localhost:8090/categories/catTotSeller", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
      }
    };

    fetchTotalCategories();
  }, []);

  const data = categories.map((category) => ({
    value: category.cantidad,
    label: category.categoria,
  }));

  return (
    <PieChart
      series={[{ data, innerRadius: 80 }]}
      {...size}
      sx={{
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          height: 300,
        },
      }}
    >
      <PieCenterLabel
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
          mb: 1,

        }}
      >Cantidad</PieCenterLabel>
    </PieChart>
  );
}
