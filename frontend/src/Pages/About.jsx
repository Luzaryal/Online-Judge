import React from 'react'

export default function About() {
  return (
<div className="about-page py-12 px-4 md:px-8 lg:px-16">
  <section className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
    <p className="text-lg text-gray-600 dark:text-gray-300">
      Learn more about the creator of Voyager CodeQuest and the inspiration behind this project.
    </p>
  </section>

  <section className="personal-info mb-16">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Hello, I'm Sohom Ray Mandal</h2>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      I am currently pursuing my degree in Electrical Engineering from IIT Tirupati. While my academic focus lies in electrical
      engineering, I have a deep passion for Data Structures, Algorithms (DSA), and competitive programming. This passion for
      problem-solving inspired me to build Voyager CodeQuest—a platform designed for coders like me who enjoy tackling coding challenges and improving their skills.
    </p>
  </section>

  <section className="project-info">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Why I Built Voyager CodeQuest</h2>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
      Voyager CodeQuest was born from my love for competitive programming and the challenges that come with solving problems.
      During my preparation for coding contests and interviews, I realized the importance of having a platform where coders can
      practice, track their progress, and challenge others. This project reflects my belief that consistent practice and problem-solving
      lead to significant improvement in coding skills.
    </p>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      Although my academic background is in Electrical Engineering, my passion for DSA and competitive programming drove me to
      explore and build this platform. I utilized modern technologies like React.js, Node.js, Express.js and MongoDB to ensure a smooth user experience for all aspiring coders.
    </p>
  </section>
</div>
  )
}
