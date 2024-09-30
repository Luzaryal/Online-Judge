import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashProblems() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Corrected useState usage
  const [userProblems, setUserProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {

      try {
        const res = await fetch(`/api/problem/getproblems?userId=${currentUser._id}`);
        const data = await res.json();
        
        if (res.ok) {
          setUserProblems(data.problems);
        } 
      } catch (error) {
        console.log(error.message);
      }
    };
    
    // Check if currentUser exists before calling fetchProblems
    if (currentUser.isAdmin) {
      fetchProblems();
    }
  }, [currentUser]);

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && userProblems.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Difficulty</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userProblems.map((problem) =>(
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(problem.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/problem/${problem.slug}`}>{problem.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{problem.difficulty}</Table.Cell>
                  <Table.Cell>{problem.category}</Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-problem/${problem._id}`}>
                    <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You Have no Problems Yet</p>
      )}
    </div>
  );
}
