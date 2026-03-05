import { Link, useNavigate } from 'react-router';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userSignup } from '../services/authService';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || !passwordConfirmation) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await userSignup({ email, password });
      navigate('/');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>Signup</h1>
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

        {/* Confirm Password */}
        <div className='mb-4'>
          <label htmlFor='password_confirmation' className='block mb-2'>
            Confirm Password <span className='text-red-500'>*</span>
          </label>

          <input
            type='password'
            name='password_confirmation'
            id='password_confirmation'
            className='form-control'
            placeholder='Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className='bg-violet-500 text-white w-full rounded p-2 hover:bg-violet-600 cursor-pointer mb-3'
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-violet-500'>
            Login here
          </Link>
        </p>
      </form>
    </AppLayout>
  );
}

export default Signup;
