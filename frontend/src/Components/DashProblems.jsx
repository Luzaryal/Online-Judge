import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProblems() {
  const { currentUser } = useSelector((state) => state.user);
  
  const [userProblems, setUserProblems] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [problemIdToDelete,setProblemIdToDelete] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {

      try {
        const res = await fetch(`/api/problem/getproblems?userId=${currentUser._id}`);
        const data = await res.json();
        
        if (res.ok) {
          setUserProblems(data.problems);
          if(data.problems.length < 9) {
            setShowMore(false);
          }
        } 
      } catch (error) {
        console.log(error.message);
      }
    };
    
    // Check if currentUser exists before calling fetchProblems
    if (currentUser.isAdmin) {
      fetchProblems();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userProblems.length;
    try {
      const res = await fetch(`/api/problem/getproblems?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserProblems((prev) => [...prev, ...data.problems]);
        if(data.problems.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteProblem = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/problem/deleteproblem/${problemIdToDelete}/${currentUser._id}`, 
        {
        method: 'DELETE',

        }
      );
      const data = await res.json();
      if(!res.ok) {
        console.log(error.message);
      }
      else {
        setUserProblems((prev) => 
        prev.filter((problem) => problem._id !== problemIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

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
                  <Table.Cell  className={
                      problem.difficulty === 'Easy' ? 'text-green-500' :
                      problem.difficulty === 'Medium' ? 'text-yellow-300' :
                      'text-red-500'
                    }
                    >
                      {problem.difficulty}</Table.Cell>
                  <Table.Cell>{problem.category}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setProblemIdToDelete(problem._id);
                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>
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
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
            )
          }
        </>
      ) : (
        <p>You Have no Problems Yet</p>
      )}
              <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400 '>Are You Sure You Want to Delete This Problem?</h3>
                    <div className="flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeleteProblem}>Yes I'm Sure</Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  );
}
