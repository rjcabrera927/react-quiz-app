import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';

function Signup() {
  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>Signup</h1>
      <Hr />
      <form action='' method='post'>
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
            placeholder='Confirm Password'
          />
        </div>

        <button className='bg-violet-500 text-white w-full rounded p-2 hover:bg-violet-600 cursor-pointer mb-3'>
          Signup
        </button>

        <p className='text-center'>
          Already have an account?{' '}
          <a href='' className='text-violet-500'>
            Login here
          </a>
        </p>
      </form>
    </AppLayout>
  );
}

export default Signup;
