import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute() {
  const { session } = useAuth();
  console.log(session);
  return session ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoute;
