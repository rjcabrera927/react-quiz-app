import { Link } from 'react-router';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { userLogout } from '../services/authService';
import toast from 'react-hot-toast';
import { useState } from 'react';

function Home() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await userLogout();
    } catch {
      toast.error('Failed to logout user.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>React Quiz App</h1>
      <Hr />
      <Link
        to='/categories'
        className='block text-center bg-violet-500 text-white w-full rounded-full py-3 px-2 mb-3 hover:bg-violet-600 cursor-pointer'
      >
        Start Quiz
      </Link>

      <button
        disabled={loading}
        onClick={handleLogout}
        className='text-center bg-red-500 text-white w-full rounded-full py-3 px-2 mb-3 hover:bg-red-600 cursor-pointer'
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </AppLayout>
  );
}

export default Home;
