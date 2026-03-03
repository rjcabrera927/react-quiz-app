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
  console.log(data);
  if (error) console.log(error);

  return data;
}

export { getUser, userLogin };
