import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" align="center" gutterBottom>
          Register
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
          <TextField
            label="Role"
            name="role"
            select
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography align="center" variant="body2" mt={2}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
