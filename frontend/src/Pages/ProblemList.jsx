import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './ProblemPage.css';

export default function DashProblems() {
  const { currentUser } = useSelector((state) => state.user);
  const [userProblems, setUserProblems] = useState([]);
  const [displayedProblemsCount, setDisplayedProblemsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`/api/problem/getproblems`);
        const data = await res.json();

        if (res.ok) {
          setUserProblems(data.problems);
          setDisplayedProblemsCount(data.problems.length < 9 ? data.problems.length : 9);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProblems();
  }, []);

  const handleShowMore = async () => {
    if (displayedProblemsCount + 9 < userProblems.length) {
      setDisplayedProblemsCount(displayedProblemsCount + 9);
    } else {
      setDisplayedProblemsCount(userProblems.length);
    }
  };

  const handleProblemClick = (slug) => {
    if (!currentUser) {
      navigate('/sign-in'); // Redirect to login if the user is not logged in
    } else {
      navigate(`/problem/${slug}`); // Navigate to problem page if logged in
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-500'>
      {userProblems.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Difficulty</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {userProblems.slice(0, displayedProblemsCount).map((problem) => (
              <Table.Body className='divide-y' key={problem.slug}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(problem.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-gray-900 dark:text-white cursor-pointer'
                      onClick={() => handleProblemClick(problem.slug)}
                    >
                      {problem.title}
                    </span>
                  </Table.Cell>
                  {/* Difficulty section with color change */}
                  <Table.Cell
                    className={
                      problem.difficulty === 'Easy' ? 'text-green-500' :
                      problem.difficulty === 'Medium' ? 'text-yellow-300' :
                      'text-red-500'
                    }
                  >
                    {problem.difficulty}
                  </Table.Cell>
                  <Table.Cell>{problem.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {displayedProblemsCount < userProblems?.length && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show More
            </button>
          )}
        </>
      ) : (
        <p>No Problems Available Yet</p>
      )}
    </div>
  );
}
