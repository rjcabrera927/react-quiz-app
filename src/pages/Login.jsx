import { useNavigate } from 'react-router';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { userLogin } from '../services/authService';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    const { session } = await userLogin({ email, password });

    if (!session) return;

    navigate('/');
  }

  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>Login</h1>
      <Hr />
      <form action='' method='post' onSubmit={handleSubmit}>
        {/* Email */}
        <div className='mb-3'>
          <label htmlFor='email' className='block mb-2'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2'>
            Password <span className='text-red-500'>*</span>
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='bg-violet-500 text-white w-full rounded p-2 hover:bg-violet-600 cursor-pointer mb-3'
        >
          Login
        </button>

        <p className='text-center'>
          No account yet?{' '}
          <a href='' className='text-violet-500'>
            Signup here
          </a>
        </p>
      </form>
    </AppLayout>
  );
}

export default Login;
