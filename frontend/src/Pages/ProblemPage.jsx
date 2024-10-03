import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Compiler from '../Components/Compiler/Compiler';

export default function ProblemPage() {
    const { problemSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/problem/getproblems?slug=${problemSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setProblem(data.problems[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchProblem();
    }, [problemSlug]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' />
        </div>
    );

    return (
        <main className='p-0 max-w-full mx-auto min-h-screen flex lg:flex-row flex-col'>
            {/* Problem Statement Section */}
            <section className='flex-1 border-r border-gray-300'>
                <h1 className='text-3xl font-semibold mb-3 p-3'>{problem && problem.title}</h1>
                
                <div className='bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-4 text-gray-800 dark:text-white'>
                    <h2 className='text-xl font-semibold mb-2'>Description</h2>
                    <p className='text-base'>{problem && problem.description}</p>
                </div>
                
                <div className='bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-4 text-gray-800 dark:text-white'>
                    <h2 className='text-xl font-semibold mb-2'>Input Format</h2>
                    <p className='text-base'>{problem && problem.inputformat}</p>
                </div>
                
                <div className='bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-4 text-gray-800 dark:text-white'>
                    <h2 className='text-xl font-semibold mb-2'>Output Format</h2>
                    <p className='text-base'>{problem && problem.outputformat}</p>
                </div>

                <div className='bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-4 text-gray-800 dark:text-white'>
                    <h2 className='text-xl font-semibold mb-2'>Example</h2>
                    <p className='text-base'>Input: {problem && problem.testCases[0].input}</p>
                    <p className='text-base'>Output: {problem && problem.testCases[0].output}</p>
                    <p className='text-base'>Explanation: {problem && problem.testCases[0].explanation}</p>
                </div>
            </section>

            {/* Vertical Divider */}
            {/* <div
                className="bg-blue-800 cursor-col-resize"
                style={{ width: "5px", height: "100vh" }}
                onMouseDown={(e) => {
                    const onMouseMove = (e) => {
                        const newWidth = Math.min(100, Math.max(30, (e.clientX / window.innerWidth) * 100));
                        document.documentElement.style.setProperty('--compiler-width', `${100 - newWidth}%`);
                        document.documentElement.style.setProperty('--problem-width', `${newWidth}%`);
                    };
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", () => {
                        document.removeEventListener("mousemove", onMouseMove);
                    });
                }}
            ></div> */}

            {/* Compiler Section */}
            <section className="flex-1" style={{ width: "50%" }}>
                <div className='bg-gray-100 p-5 shadow-md rounded-lg h-full'>
                    <Compiler />
                </div>
            </section>
        </main>
    );
}
