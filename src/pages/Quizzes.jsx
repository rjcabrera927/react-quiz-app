import { useEffect, useState } from 'react';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { getQuizzesByCategoryId } from '../services/quizService';
import { Link, useParams } from 'react-router';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getQuizzesByCategoryId(id)
      .then((data) => {
        setQuizzes(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>Select Quiz</h1>
      <Hr />
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link
                to={`/quizzes/${quiz.id}`}
                className='block text-center bg-violet-500 text-white w-full rounded-full py-3 px-2 mb-3 hover:bg-violet-600 cursor-pointer'
              >
                {quiz.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
}

export default Quizzes;
