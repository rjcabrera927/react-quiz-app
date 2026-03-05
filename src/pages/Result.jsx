import { useEffect, useState } from 'react';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { deleteResultById, getResultById } from '../services/resultService';
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

function Result() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResultById(id)
      .then((data) => {
        setResult(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const percentage = Math.round((result.score / result.total_questions) * 100);
  let message = '';

  if (percentage === 100) message = '🎉 Perfect score! Amazing job!';
  else if (percentage >= 80) message = '👍 Great work!';
  else if (percentage >= 50) message = '🙂 Not bad! Keep practicing.';
  else message = `😅 Don't worry, try again to improve!`;

  async function handleRetry() {
    try {
      await deleteResultById(result.id);
      toast.success('Previous attempt deleted. Redirecting to quiz...');
      navigate(`/quizzes/${result.quiz_id}`);
    } catch {
      toast.error('Failed to delete previous attempt.');
    }
  }

  return (
    <AppLayout>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <>
          <h1 className='text-3xl uppercase text-center'>
            {result.quizzes.title}
          </h1>
          <Hr />
          <p className='text-center text-2xl font-light mb-3'>
            You scored{' '}
            <strong>{`${result.score}/${result.total_questions}`}</strong>{' '}
            {percentage}%
          </p>
          <p className='text-center text-2xl font-light mb-5'>{message}</p>
          <div className='flex gap-3 justify-center'>
            <Link
              to='/'
              className='bg-violet-500 text-white rounded p-2 hover:bg-violet-600 cursor-pointer mb-3'
            >
              Back Home
            </Link>

            <button
              className='bg-green-500 text-white rounded p-2 hover:bg-green-600 cursor-pointer mb-3'
              onClick={handleRetry}
            >
              Retry Quiz
            </button>
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default Result;
