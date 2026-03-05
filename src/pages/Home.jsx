import Hr from '../components/Hr';
import AppLayout from '../layouts/AppLayout';

function Home() {
  return (
    <AppLayout>
      <h1 className='text-3xl uppercase text-center'>React Quiz App</h1>
      <Hr />
      <button className='bg-violet-500 text-white w-full rounded-full py-3 px-2 mb-3 hover:bg-violet-600 cursor-pointer'>
        Start Quiz
      </button>

      <button className='bg-violet-500 text-white w-full rounded-full py-3 px-2 hover:bg-violet-600 cursor-pointer'>
        View Leaderboard
      </button>
    </AppLayout>
  );
}

export default Home;
