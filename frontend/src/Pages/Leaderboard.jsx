import { useEffect, useState } from "react"

export default function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard/getleaderboard');
      const data = await res.json();
      console.log(data);
      if (res.ok && data) {
        const leaderboard = Object.entries(data).sort((a, b) => b[1] - a[1]).map(entry => ({ username: entry[0], score: entry[1] }));
        setLeaderboard(leaderboard);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    console.log(leaderboard);
  }, []);

  return (
    <div className="w-4/5 max-w-3xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6 tracking-wide uppercase">
        Leaderboard
      </h2>
      <div className="flex flex-col">
        {leaderboard.map(({ username, score }, index) => (
          <div
            key={username}
            className={`flex justify-between py-3 px-5 bg-white dark:bg-gray-700 transition-colors ease-in-out duration-300 text-lg
              ${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-600' : 'bg-white dark:bg-gray-700'}
              ${index === 0 ? 'rounded-t-lg' : ''}
              ${index === leaderboard.length - 1 ? 'rounded-b-lg' : ''}`}
          >
            <span className="font-semibold text-teal-700 dark:text-teal-300">{username}</span>
            <span className="font-semibold text-red-700 dark:text-red-300">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
