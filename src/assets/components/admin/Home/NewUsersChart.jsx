import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Paper, Typography, useTheme } from '@mui/material';

const RechartsBarChart = ({ data }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} style={{ padding: theme.spacing(2), marginBottom: theme.spacing(3) }}>
      <Typography variant="h6" gutterBottom color="#1976D2" >
        Total de Usuarios nuevos por Mes
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#1976D2" name="Usuarios Nuevos" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default function NewUsersChart() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://3.219.197.64:8090/dataUser/usuTot", {
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
        setUserData(data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <br></br>
      <RechartsBarChart data={userData} />
    </>
  );
}
