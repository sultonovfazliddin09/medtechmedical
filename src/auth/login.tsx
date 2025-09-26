import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Login muvaffaqiyatli!');
      navigate('/dashboard');
      // Bu yerda redirect qilish mumkin, misol uchun react-router-dom bilan
    } catch {
      alert('Login xatolik bilan yakunlandi. Email yoki parolni tekshiring.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      maxWidth={400}
      margin="auto"
      padding={3}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h4" mb={3}>
        Kirish
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Parol"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Kirish'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
