import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

function AdminProductManager() {
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    category: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);
  const formRef = useRef(null); // 🔥 scroll reference

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products', headers);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories', headers);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProducts();
      fetchCategories();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, form, headers);
      } else {
        await axios.post(`http://localhost:5000/api/products`, form, headers);
      }
      setForm({ name: '', description: '', price: '', inventory: '', category: '', image: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      category: product.category?._id || product.category,
      image: product.image,
    });

    setEditId(product._id);

    // 🔥 Scroll to form on edit
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, headers);
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (!user || user.role !== 'admin') {
    return <Typography variant="h6" mt={4} align="center">Access Denied</Typography>;
  }

  return (
    <Layout>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Product Manager
        </Typography>

        <Paper sx={{ p: 3, mb: 6 }} ref={formRef}>
          <Typography variant="h6" gutterBottom>
            {editId ? 'Edit Product' : 'Add Product'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="inventory"
                  label="Inventory"
                  type="number"
                  value={form.inventory}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
                 <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    label="Category"
                    fullWidth
                    sx={{ minWidth: 200 }} // optional: ensure wider min-width
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={form.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  value={form.image}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {form.image && (
                <Grid item xs={12}>
                  <img
                    src={form.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: '8px', marginTop: 10 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/300x200?text=No+Image';
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  {editId ? 'Update Product' : 'Add Product'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 4, display: 'flex', flexDirection: 'column' }}>
                {product.image && (
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    height="180"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" mt={1}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEdit(product)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(product._id)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default AdminProductManager;
