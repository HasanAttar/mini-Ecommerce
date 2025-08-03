import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Layout from '../components/Layout';

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);

        // Simulate chart data: category-wise inventory
        const catRes = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const prodRes = await axios.get('http://localhost:5000/api/products');

        const categoryMap = {};
        catRes.data.forEach((cat) => {
          categoryMap[cat._id] = cat.name;
        });

        const categoryInventory = {};
        prodRes.data.forEach((prod) => {
          const catName = categoryMap[prod.category?._id || prod.category] || 'Unknown';

          categoryInventory[catName] = (categoryInventory[catName] || 0) + prod.inventory;
        });


        const chart = Object.entries(categoryInventory).map(([name, value]) => ({
          name,
          inventory: value,
        }));

        setChartData(chart);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Layout>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{stats?.totalProducts}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h4">{stats?.totalCategories}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Inventory</Typography>
              <Typography variant="h4">{stats?.totalInventory}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Typography variant="h5" gutterBottom>
            Inventory by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inventory" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </Layout>
  );

}

export default AdminDashboard;
