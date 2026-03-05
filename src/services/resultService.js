import toast from 'react-hot-toast';
import supabase from './supabase';

async function addResult({ user_id, quiz_id, score }) {
  const { data, error } = await supabase
    .from('results')
    .insert([{ user_id, quiz_id, score }])
    .select();

  if (error) toast.error(error.message);

  return data;
}

export { addResult };
