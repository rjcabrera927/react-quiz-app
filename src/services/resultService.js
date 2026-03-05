import toast from 'react-hot-toast';
import supabase from './supabase';

async function addResult({ user_id, quiz_id, score, total_questions }) {
  const { data, error } = await supabase
    .from('results')
    .insert([{ user_id, quiz_id, score, total_questions }])
    .select()
    .single();

  if (error) toast.error(error.message);

  return data;
}

async function getResultById(id) {
  const { data, error } = await supabase
    .from('results')
    .select(
      `
      *,
      quizzes (*)
    `
    )
    .eq('id', id)
    .single();

  if (error) toast.error(error.message);

  return data;
}

export { addResult, getResultById };
