import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

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

export default function PieChartWithCenterLabel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8090/categories/listAll');
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const data = categories.map((category) => ({
    value: 1, // Cada categoría tiene un valor de 1
    label: category.name, // Supongo que el nombre de la categoría está en la propiedad "name"
  }));

  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
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
