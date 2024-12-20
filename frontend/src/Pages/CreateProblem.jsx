import { Select, Textarea, TextInput, Label, Button, Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function CreateProblem() {
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
  const navigate = useNavigate();

  // Add a new empty test case to the array
  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [
        ...formData.testCases,
        { input: '', output: '', explanation: '' } // New empty test case
      ],
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
      const res = await fetch('/api/problem/create', {
        method: 'POST',
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
      if (res.ok) {
        setSubmitError(null);
        navigate('/problem-list');
      }
    } catch (error) {
      setSubmitError('Something went wrong!');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a New Problem Statement</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Problem details (title, difficulty, etc.) */}
        <div className='flex flex-col gap-4'>
          <Label htmlFor='title'>Title:</Label>
          <Textarea id='title' rows={3} required placeholder='Title'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <Label htmlFor='difficulty'>Difficulty:</Label>
          <Select id='difficulty' required
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
            <option value=''>Select Difficulty</option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </Select>

          <Label htmlFor='category'>Category:</Label>
          <Textarea id='category' rows={1} required placeholder='Category'
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Label htmlFor='score'>Score:</Label>
          <Textarea id='score' rows={1} required placeholder='Score'
            onChange={(e) => setFormData({ ...formData, score: +e.target.value })}
          />
          <Label htmlFor='description'>Description:</Label>
          <Textarea id='description' rows={8} required placeholder='Description'
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Label htmlFor='inputformat'>Input Format:</Label>
          <Textarea id='inputformat' rows={6} required placeholder='Input Format'
            onChange={(e) => setFormData({ ...formData, inputformat: e.target.value })}
          />

          <Label htmlFor='outputformat'>Output Format:</Label>
          <Textarea id='outputformat' rows={6} required placeholder='Output Format'
            onChange={(e) => setFormData({ ...formData, outputformat: e.target.value })}
          />
        </div>

        {/* Test cases section */}
        <div className="flex flex-col gap-4">
          <h3 className='text-2xl font-semibold'>Test Cases</h3>
          {formData.testCases.map((testCase, index) => (
            <div key={index} className="border p-4 mb-4">
              <h4 className="font-semibold">Test Case {index + 1}</h4>
              <Label htmlFor={`input-${index}`}>Input:</Label>
              <Textarea id={`input-${index}`} rows={3} placeholder='Input' required
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
              />
              
              <Label htmlFor={`output-${index}`}>Output:</Label>
              <Textarea id={`output-${index}`} rows={3} placeholder='Output' required
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
              />

              <Label htmlFor={`explanation-${index}`}>Explanation:</Label>
              <Textarea id={`explanation-${index}`} rows={4} placeholder='Explanation'
                value={testCase.explanation}
                onChange={(e) => handleTestCaseChange(index, 'explanation', e.target.value)}
              />

              <Button color="failure" onClick={() => removeTestCase(index)}>Remove Test Case</Button>
            </div>
          ))}

          <Button type='button' gradientMonochrome="teal" onClick={addTestCase}>Add Test Case</Button>
        </div>

        <Button type='submit' gradientMonochrome="purple">Add Problem</Button>
        {submitError && <Alert className='mt-5' color='failure'>{submitError}</Alert>}
      </form>
    </div>
  );
}
