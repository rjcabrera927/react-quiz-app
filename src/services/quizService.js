import toast from 'react-hot-toast';
import supabase from './supabase';

async function getQuizzesByCategoryId(categoryId) {
  let { data: quizzes, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('category_id', categoryId);

  if (error) toast.error(error.message);

  return quizzes;
}

export { getQuizzesByCategoryId };
