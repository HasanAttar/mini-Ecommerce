import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user, res.data.token); // ← Fix: pass user first
setTimeout(() => {
  navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/');
}, 100); // Slight delay for context to update

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" variant="body2" mt={2}>
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
