import Hr from '../../components/Hr';
import AppLayout from '../../layouts/AppLayout';

function Login() {
  return (
    <AppLayout>
      <h1 class='text-3xl uppercase text-center'>Login</h1>
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

        <button className='bg-violet-500 text-white w-full rounded p-2 hover:bg-violet-600 cursor-pointer mb-3'>
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
