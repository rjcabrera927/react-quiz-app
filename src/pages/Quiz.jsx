import { useEffect, useState } from 'react';
import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';
import { getQuizById } from '../services/quizService';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  addResult,
  getResultByQuizIdAndUserId,
} from '../services/resultService';
import toast from 'react-hot-toast';

function Quiz() {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();
  const { session } = useAuth();
  const user = session?.user;
  const navigate = useNavigate();

  useEffect(() => {
    getResultByQuizIdAndUserId(id, user.id).then((result) => {
      console.log(result);
      if (result.length) {
        toast('You already completed this quiz. Redirecting to your result...');
        navigate(`/results/${result.at(0).id}`);
        return;
      }
    });

    getQuizById(id)
      .then((data) => {
        setQuiz(data.at(0));
      })
      .finally(() => setLoading(false));
  }, [id, navigate, user.id]);

  function handleChange(questionId, option) {
    setAnswers((prev) => {
      return { ...prev, [questionId]: option };
    });
  }

  function handleSubmit() {
    let score = 0;
    setSubmitting(true);
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        score++;
      }
    });

    const result = {
      user_id: user.id,
      quiz_id: quiz.id,
      score: score,
      total_questions: quiz.questions.length,
    };

    addResult(result)
      .then((data) => {
        toast.success('Quiz completed! Your results have been saved.');
        navigate(`/results/${data.id}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <AppLayout>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <>
          <h1 className='text-3xl uppercase text-center'>{quiz.title}</h1>
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
