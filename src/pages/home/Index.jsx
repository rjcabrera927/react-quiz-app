function Index() {
  return (
    <div className="shadow bg-white rounded max-w-4xl mx-auto mt-5 p-5 text-black">
      <h1 class="text-3xl uppercase text-center">React Quiz App</h1>
      <hr className="mt-4 mb-4 text-gray-300" />
      <button className="bg-violet-500 text-white w-full rounded-full py-3 px-2 mb-3 hover:bg-violet-600 cursor-pointer">
        Start Quiz
      </button>

      <button className="bg-violet-500 text-white w-full rounded-full py-3 px-2 hover:bg-violet-600 cursor-pointer">
        View Leaderboard
      </button>
    </div>
  );
}

export default Index;
