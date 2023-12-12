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

export default function PieCategorias() {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8090/categories/listAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

    fetchCategories();
  }, []);

  const data = categories.map((category) => ({
    value: 1,
    label: category.name,
  }));

  return (
    <PieChart
      series={[{ data, innerRadius: 80 }]}
      {...size}
      sx={{
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          height: 300, // Puedes ajustar este valor según tus necesidades
        },
      }}
    >
      <PieCenterLabel
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
          mb: 1,
        }}
      >Categorias</PieCenterLabel>
    </PieChart>
  );
}
