// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute: user =', user);


  if (loading) {
    return null; // or <LoadingSpinner />
  }

if (!user) {
  console.log('Redirecting: no user');
  return <Navigate to="/login" replace />;
}

if (requiredRole && user.role !== requiredRole) {
  console.log('Access denied: required role =', requiredRole, 'but user role =', user.role);
  return <Navigate to="/" replace />;
}


  return children;
}

export default ProtectedRoute;
