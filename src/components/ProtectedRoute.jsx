import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute() {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoute;
