import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface User {
  id: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
  const [newPatientsCount, setNewPatientsCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Demo ma'lumotlar (API o‘rniga)
    setTodayAppointmentsCount(5); // bugungi uchrashuvlar soni
    setNewPatientsCount(12); // yangi bemorlar (7 kun ichida)

    setUsers([
      { id: "1", email: "admin@clinic.com", role: "admin" },
      { id: "2", email: "doctor1@clinic.com", role: "doctor" },
      { id: "3", email: "reception@clinic.com", role: "reception" },
    ]);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Bugungi uchrashuvlar</Typography>
            <Typography variant="h3" color="primary">
              {todayAppointmentsCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Yangi bemorlar (7 kun)</Typography>
            <Typography variant="h3" color="secondary">
              {newPatientsCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Foydalanuvchilar ro'yxati
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
