import { useEffect, useState } from 'react';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { deleteResultById, getResultById } from '../services/resultService';
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadResult = async () => {
      try {
        const data = await getResultById(id);
        setResult(data);
      } catch {
        toast.error('Failed to load result.');
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [id]);

  const percentage = result
    ? Math.round((result.score / result.total_questions) * 100)
    : 0;

  let message = '';
  if (percentage === 100) message = '🎉 Perfect score! Amazing job!';
  else if (percentage >= 80) message = '👍 Great work!';
  else if (percentage >= 50) message = '🙂 Not bad! Keep practicing.';
  else message = `😅 Don't worry, try again to improve!`;

  const handleRetry = async () => {
    if (!result) return;
    try {
      await deleteResultById(result.id);
      toast.success('Previous attempt deleted. Redirecting to quiz...');
      navigate(`/quizzes/${result.quiz_id}`);
    } catch {
      toast.error('Failed to delete previous attempt.');
    }
  };

  return (
    <AppLayout>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : result ? (
        <>
          <h1 className='text-3xl uppercase text-center'>
            {result.quizzes?.title || 'Quiz'}
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
      ) : (
        <p className='text-center text-red-500'>Result not found.</p>
      )}
    </AppLayout>
  );
}

export default Result;
