import { Select, Textarea, TextInput, Label, Button, Alert } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function UpdateProblem() {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: '',
    category: '',
    description: '',
    inputformat: '',
    outputformat: '',
    testCases: [], // Array to hold multiple test cases
  });

  const [submitError, setSubmitError] = useState(null);
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problem/getproblem?problemId=${problemId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        setFormData(data.problems[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProblem();
  }, [problemId]);

  // Add a new empty test case to the array
  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '', explanation: '' }],
    });
  };

  // Remove a test case by index
  const removeTestCase = (index) => {
    const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  // Handle changes for each test case
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log formData to see if all fields are correctly filled
    try {
      const res = await fetch(`/api/problem/updateproblem/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message);
        return;
      }
      navigate('/problem-list');
    } catch (error) {
      setSubmitError('Something went wrong!');
    }
  };

  return (
    <div className='p-6 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-bold text-purple-800'>Update Problem Statement</h1>

      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        {/* Problem Details */}
        <div className='flex flex-col gap-4'>
          <Label htmlFor='title'>Title:</Label>
          <Textarea
            id='title'
            rows={2}
            required
            placeholder='Enter Problem Title'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
            className='rounded-lg border-gray-300'
          />

          <Label htmlFor='difficulty'>Difficulty:</Label>
          <Select
            id='difficulty'
            required
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            value={formData.difficulty}
            className='rounded-lg border-gray-300'
          >
            <option value=''>Select Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </Select>

          <Label htmlFor='category'>Category:</Label>
          <Textarea
            id='category'
            rows={1}
            required
            placeholder='Enter Category (e.g., Array, String)'
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category}
            className='rounded-lg border-gray-300'
          />

          <Label htmlFor='description'>Description:</Label>
          <Textarea
            id='description'
            rows={6}
            required
            placeholder='Enter Problem Description'
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            value={formData.description}
            className='rounded-lg border-gray-300'
          />

          <Label htmlFor='inputformat'>Input Format:</Label>
          <Textarea
            id='inputformat'
            rows={4}
            required
            placeholder='Enter Input Format'
            onChange={(e) => setFormData({ ...formData, inputformat: e.target.value })}
            value={formData.inputformat}
            className='rounded-lg border-gray-300'
          />

          <Label htmlFor='outputformat'>Output Format:</Label>
          <Textarea
            id='outputformat'
            rows={4}
            required
            placeholder='Enter Output Format'
            onChange={(e) => setFormData({ ...formData, outputformat: e.target.value })}
            value={formData.outputformat}
            className='rounded-lg border-gray-300'
          />
        </div>

        {/* Test Cases Section */}
        <div className="flex flex-col gap-6">
          <h3 className='text-2xl font-semibold text-teal-700'>Test Cases</h3>
          {formData.testCases.map((testCase, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm mb-4">
              <h4 className="font-semibold text-lg mb-2">Test Case {index + 1}</h4>

              <Label htmlFor={`input-${index}`}>Input:</Label>
              <Textarea
                id={`input-${index}`}
                rows={2}
                required
                placeholder='Input for Test Case'
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                className='rounded-lg border-gray-300'
              />

              <Label htmlFor={`output-${index}`}>Output:</Label>
              <Textarea
                id={`output-${index}`}
                rows={2}
                required
                placeholder='Output for Test Case'
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                className='rounded-lg border-gray-300'
              />

              <Label htmlFor={`explanation-${index}`}>Explanation:</Label>
              <Textarea
                id={`explanation-${index}`}
                rows={3}
                placeholder='Explanation for Test Case (Optional)'
                value={testCase.explanation}
                onChange={(e) => handleTestCaseChange(index, 'explanation', e.target.value)}
                className='rounded-lg border-gray-300'
              />

              <Button color="failure" className="mt-2" onClick={() => removeTestCase(index)}>Remove Test Case</Button>
            </div>
          ))}

          <Button type='button' gradientMonochrome="teal" className='self-start' onClick={addTestCase}>
            Add Test Case
          </Button>
        </div>

        {/* Submit Button */}
        <Button type='submit' gradientMonochrome="purple">Update Problem</Button>
        {submitError && <Alert className='mt-5' color='failure'>{submitError}</Alert>}
      </form>
    </div>
  );
}
