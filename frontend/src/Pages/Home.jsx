import React from 'react'

export default function Home() {
  return (
    <div className="homepage">
  <section className="hero flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-800 py-20">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Voyager CodeQuest</h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Challenge yourself and improve your coding skills!</p>
    <a href="/problem-list" className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition">
      View Challenges
    </a>
  </section>

  <section className="features grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 px-4">
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Practice Coding</h3>
      <p className="text-gray-600 dark:text-gray-300">Sharpen your skills with a wide range of coding problems designed to challenge you.</p>
    </div>
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Compete with Friends</h3>
      <p className="text-gray-600 dark:text-gray-300">Join coding contests, challenge others, and climb the leaderboard.</p>
    </div>
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Track Your Progress</h3>
      <p className="text-gray-600 dark:text-gray-300">Monitor your progress and improve with each coding challenge you solve.</p>
    </div>
  </section>

  <section className="recent-problems text-center py-12 px-4">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Popular Problems</h2>
    <ul className="space-y-4">
      <li><a href="/problem/problem-slug" className="text-teal-500 hover:text-teal-600">Problem 1</a></li>
      <li><a href="/problem/problem-slug" className="text-teal-500 hover:text-teal-600">Problem 2</a></li>
      <li><a href="/problem/problem-slug" className="text-teal-500 hover:text-teal-600">Problem 3</a></li>
    </ul>
  </section>
</div>

  )
}
