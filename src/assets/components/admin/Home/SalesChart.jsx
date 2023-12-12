import React, { useEffect, useState } from 'react';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { Paper, Typography, useTheme } from '@mui/material';

const monthNames = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const RechartsBarChart = ({ data }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} style={{ padding: theme.spacing(2), marginBottom: theme.spacing(3) }}>
      <Typography variant="h6" gutterBottom color="#6636A8">
        Total de Ventas por Mes $
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_Mes" fill="#6636A8" name="Total del Mes $" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default function SalesChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("http://localhost:8090/order/sales", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error en la solicitud: ${res.status}`);
        }

        const data = await res.json();
        const monthlySales = {};

        data.forEach((item) => {
          monthlySales[item.month] = item.total_Mes;
        });

        for (let i = 1; i <= 12; i++) {
          const monthKey = i.toString();
          if (!(monthKey in monthlySales)) {
            monthlySales[monthKey] = 0;
          }
        }

        const transformedData = Object.keys(monthlySales).map((month) => ({
          month: monthNames[parseInt(month) - 1],
          total_Mes: monthlySales[month],
        }));

        setSalesData(transformedData);
      } catch (error) {
      }
    };

    fetchSales();
  }, []);

  return (
    <>
      <RechartsBarChart data={salesData} />
    </>
  );
}
