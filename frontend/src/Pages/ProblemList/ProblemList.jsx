// ProblemList.js
import React, { useEffect, useState } from 'react';
import './ProblemList.css';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch the list of problems from your backend (you might need to adjust the URL)
    fetch('http://localhost:5000/problems')
      .then(response => response.json())
      .then(data => setProblems(data))
      .catch(error => console.error('Error fetching problems:', error));
  }, []);

  return (
    <div className="problem-list-container">
      <h1>Problem List</h1>
      <ul>
        {problems.map(problem => (
          <li key={problem.id} className="problem-item">
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
