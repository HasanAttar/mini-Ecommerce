import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/categories'),
        ]);

        setProducts(prodRes.data);
        setAllProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === '') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category?._id === categoryId || product.category === categoryId
      );
      setProducts(filtered);
    }
  };

  return (
    <Container sx={{ mt: 5, pb: 6 }}>
      <Typography variant="h3" align="center" fontWeight="bold" color="primary.main" mb={3}>
        Explore Our Products
      </Typography>

      <Box mb={4} display="flex" justifyContent="center">
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Filter by Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || 'https://picsum.photos/300/200?grayscale'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://picsum.photos/300/200?grayscale';
                    }}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {product.description?.slice(0, 70)}...
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProductList;
