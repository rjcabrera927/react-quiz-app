import toast from 'react-hot-toast';
import supabase from './supabase';

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

async function userLogin({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) toast.error(error.message);

  return data;
}

export { getUser, userLogin };
