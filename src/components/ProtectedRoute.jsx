import { useEffect } from 'react';
import { getUser } from '../services/authService';
import { useNavigate } from 'react-router';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    getUser().then((user) => {
      console.log(user);
      if (!user) navigate('/login');
    });
  }, [navigate]);
  return children;
}

export default ProtectedRoute;
