import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box mt={6} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Card
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    boxShadow: 6,
    borderRadius: 4,
    backgroundColor: '#f0f4ff',
    overflow: 'hidden', // avoids empty spacing
  }}
>
  <CardMedia
    component="img"
    image={product.imageUrl || 'https://picsum.photos/600/400'}
    alt={product.name}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = 'https://picsum.photos/600/400';
    }}
    sx={{
      width: { xs: '100%', md: '50%' },
      height: { xs: 250, md: 'auto' },
      objectFit: 'cover',
    }}
  />

  <CardContent
  sx={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 2,
    p: 3,
  }}
>
  <Typography variant="h4" fontWeight="bold">
    {product.name}
  </Typography>

  <Typography variant="h5" color="success.main" fontWeight="medium">
    ${product.price}
  </Typography>

  {product.description && (
    <Typography variant="body1" color="text.primary">
      {product.description}
    </Typography>
  )}

  <Typography variant="body2" color="text.secondary">
    In stock: <strong>{product.inventory}</strong>
  </Typography>

  <Box mt={2}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        fontWeight: 'bold',
        px: 4,
        py: 1.5,
        background: 'linear-gradient(to right, #4a90e2, #007aff)',
        '&:hover': {
          background: 'linear-gradient(to right, #007aff, #0051a8)',
        },
      }}
    >
      Buy Now
    </Button>
  </Box>
</CardContent>

</Card>

    </Container>
  );
}

export default ProductDetails;
