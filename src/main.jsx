import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';

import { RouterProvider } from 'react-router/dom';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Signup from './pages/Signup.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import Categories from './pages/Categories.jsx';
import Quizzes from './pages/Quizzes.jsx';
import Quiz from './pages/Quiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { path: '/', Component: Home },
      { path: '/categories', Component: Categories },
      { path: '/categories/:id/quizzes', Component: Quizzes },
      { path: '/quizzes/:id', Component: Quiz },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },

  {
    path: '/signup',
    Component: Signup,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' />
    </AuthProvider>
  </StrictMode>
);
