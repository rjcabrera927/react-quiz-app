import supabase from './supabase';

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export { getUser };
