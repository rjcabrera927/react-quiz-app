import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import Index from './pages/home/Index.jsx';
import { RouterProvider } from 'react-router/dom';
import Login from './pages/auth/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Signup from './pages/auth/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      // Protected Routes
      { path: '/', element: <Index /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
