import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

function AdminCategoryManager() {
  const { token, user} = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories', headers);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
  if (user?.role === 'admin') {
   
    fetchCategories();
  }
}, [user]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name }, headers);
      setName('');
      fetchCategories();
    } catch (err) {
      console.error('Failed to add category:', err.response?.data || err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, headers);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

 if (!user || user.role !== 'admin') {
  return <Typography variant="h6" mt={4} align="center">Access Denied</Typography>;
}
  return (
    <Layout>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Category Manager
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleAddCategory}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <TextField
                label="New Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" variant="contained" fullWidth>
                Add Category
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">All Categories</Typography>
        <List>
          {categories.map((cat) => (
            <div key={cat._id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteCategory(cat._id)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={cat.name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </Container>
    </Layout>
  );
}

export default AdminCategoryManager;
