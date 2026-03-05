import { useCallback, useEffect, useRef, useState } from 'react';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { getQuizById } from '../services/quizService';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  addResult,
  getResultByQuizIdAndUserId,
} from '../services/resultService';
import toast from 'react-hot-toast';
import { formatTime } from '../helpers/time';

function Quiz() {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const hasSubmitted = useRef(false);

  const { id } = useParams();
  const { session } = useAuth();
  const user = session?.user;
  const navigate = useNavigate();

  function handleChange(questionId, option) {
    setAnswers((prev) => {
      return { ...prev, [questionId]: option };
    });
  }

  const handleSubmit = useCallback(() => {
    if (hasSubmitted.current) return; // lock
    hasSubmitted.current = true;

    if (!quiz) return;

    setSubmitting(true);

    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) score++;
    });

    const result = {
      user_id: user.id,
      quiz_id: quiz.id,
      score,
      total_questions: quiz.questions.length,
    };

    addResult(result)
      .then((data) => {
        toast.success('Quiz completed! Results saved.');
        navigate(`/results/${data.id}`);
      })
      .finally(() => setSubmitting(false));
  }, [answers, quiz, user.id, navigate]);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const result = await getResultByQuizIdAndUserId(id, user.id);

        if (result.length) {
          toast(
            'You already completed this quiz. Redirecting to your result...'
          );
          navigate(`/results/${result.at(0).id}`);
          return;
        }

        const data = await getQuizById(id);
        setQuiz(data.at(0));
        setSecondsRemaining(180);
      } catch {
        toast.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [id, navigate, user.id]);

  useEffect(() => {
    if (!quiz || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz, handleSubmit, secondsRemaining]);

  return (
    <AppLayout>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <>
          <div className='flex justify-between items-center'>
            <h1 className='uppercase text-center text-lg'>{quiz.title}</h1>
            <div className='text-lg border border-gray-300 p-2 rounded'>
              <strong>{formatTime(secondsRemaining)}</strong>
            </div>
          </div>
          <Hr />
          <ul>
            {quiz.questions.map((question, index) => (
              <li key={question.id} className='mb-5'>
                <div>
                  <h2>{`${index + 1}. ${question.question}`}</h2>
                  {Object.entries(question.options).map(([key, value]) => (
                    <div key={`${question.id}-${key}`}>
                      <input
                        type='radio'
                        name={question.id}
                        id={`${question.id}-${key}`}
                        value={key}
                        onChange={() => handleChange(question.id, key)}
                        disabled={secondsRemaining === 0}
                      />
                      <label
                        htmlFor={`${question.id}-${key}`}
                        className='ms-2'
                      >{`${key}. ${value}`}</label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button
            disabled={submitting}
            className='bg-violet-500 text-white w-full rounded p-2 hover:bg-violet-600 cursor-pointer mb-3 disabled:cursor-not-allowed'
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </>
      )}
    </AppLayout>
  );
}

export default Quiz;
