import toast from 'react-hot-toast';
import supabase from './supabase';

async function getQuestionsByQuizId(quizId) {
  let { data: questions, error } = await supabase
    .from('questions')
    .select(
      `
      id,
      quiz_id,
      question,
      options,
      correct_answer,
      quiz:quiz_id (
        id,
        title
      )
    `
    )
    .eq('quiz_id', quizId);

  if (error) toast.error(error.message);

  return questions;
}

export { getQuestionsByQuizId };
