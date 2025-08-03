import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductManager from './pages/AdminProductManager';
import AdminCategoryManager from './pages/AdminCategoryManager';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './pages/ProductDetails';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetails />} />


<Route path="*" element={<Navigate to="/" />} />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin/products" element={
        <ProtectedRoute requiredRole="admin">
          <AdminProductManager />
         </ProtectedRoute>
      } />

      <Route path="/admin/categories" element={
        <ProtectedRoute requiredRole="admin">
          <AdminCategoryManager />
        </ProtectedRoute>
      } />


    </Routes>
  );
}

export default App;
