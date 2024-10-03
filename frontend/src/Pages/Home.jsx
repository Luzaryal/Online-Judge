import React from 'react'

export default function Home() {
  return (
    <div class="homepage">
  <section class="hero flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-800 py-20">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Voyager CodeQuest</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">Challenge yourself and improve your coding skills!</p>
    <a href="/problem-list" class="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition">
      View Challenges
    </a>
  </section>

  <section class="features grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 px-4">
    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Practice Coding</h3>
      <p class="text-gray-600 dark:text-gray-300">Sharpen your skills with a wide range of coding problems designed to challenge you.</p>
    </div>
    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Compete with Friends</h3>
      <p class="text-gray-600 dark:text-gray-300">Join coding contests, challenge others, and climb the leaderboard.</p>
    </div>
    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Track Your Progress</h3>
      <p class="text-gray-600 dark:text-gray-300">Monitor your progress and improve with each coding challenge you solve.</p>
    </div>
  </section>

  <section class="recent-problems text-center py-12 px-4">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Popular Problems</h2>
    <ul class="space-y-4">
      <li><a href="/problem/problem-slug" class="text-teal-500 hover:text-teal-600">Problem 1</a></li>
      <li><a href="/problem/problem-slug" class="text-teal-500 hover:text-teal-600">Problem 2</a></li>
      <li><a href="/problem/problem-slug" class="text-teal-500 hover:text-teal-600">Problem 3</a></li>
    </ul>
  </section>
</div>

  )
}
