import { Select, Textarea, TextInput, Label, Button, Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function CreateProblem() {
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();
  
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setSubmitError('Something Went Wrong!');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a New Problem Statement</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 justify-between'>
          <div>
            <Label htmlFor='title'>Title:</Label>
            <Textarea type='text' 
            placeholder='Title' 
            required id='title' 
            className='flex-1' 
            rows={3}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            />
          </div>
          <div>
            <Label htmlFor='difficulty'>Difficulty:</Label>
            <Select id='difficulty'  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
              <option value='uncategorized'>Select Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </Select>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            <Label htmlFor='description'>Description:</Label>
            <Textarea 
              type='text' 
              placeholder='Description' 
              required 
              id='description' 
              className='flex-1' 
              rows={8} 
              onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor='inputformat'>Input Format:</Label>
            <Textarea 
              type='text' 
              placeholder='Input Format' 
              required 
              id='inputformat' 
              className='flex-1' 
              rows={6}
              onChange={(e) =>
              setFormData({ ...formData, inputformat: e.target.value })
              } 
            />
          </div>
          <div>
            <Label htmlFor='outputformat'>Output Format:</Label>
            <Textarea 
              type='text' 
              placeholder='Output Format' 
              required 
              id='outputformat' 
              className='flex-1' 
              rows={6}
              onChange={(e) =>
              setFormData({ ...formData, outputformat: e.target.value })
              } 
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
        <h3 className='text-2xl font-semibold'>Test Cases</h3>
        <div>
            <Label htmlFor='input'>Input:</Label>
            <Textarea 
              type='text' 
              placeholder='Input' 
              required 
              id='input' 
              className='flex-1' 
              rows={3} 
              onChange={(e) =>
              setFormData({ ...formData, input: e.target.value })
              }
            />
          </div>
        <div>
            <Label htmlFor='inputvalue'>Input Value:</Label>
            <Textarea 
              type='text' 
              placeholder='Input Value' 
              required 
              id='inputvalue' 
              className='flex-1' 
              rows={3} 
              onChange={(e) =>
              setFormData({ ...formData, inputvalue: e.target.value })
              }
            />
          </div>
        <div>
            <Label htmlFor='output'>Output:</Label>
            <Textarea 
              type='text' 
              placeholder='Output' 
              required 
              id='output' 
              className='flex-1' 
              rows={3} 
              onChange={(e) =>
              setFormData({ ...formData, output: e.target.value })
              }
            />
          </div>
        <div>
            <Label htmlFor='explanation'>Explanation:</Label>
            <Textarea 
              type='text' 
              placeholder='Explanation' 
              required 
              id='explanation' 
              className='flex-1' 
              rows={4} 
              onChange={(e) =>
              setFormData({ ...formData, explanation: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between">
          <Button type='button' gradientMonochrome="teal">Add Test Case</Button>
          <Button type='button' gradientMonochrome="teal">Remove Test Case</Button>
          </div>
        </div>
        <Button type='submit' gradientMonochrome="purple">Add Problem</Button>
        {
          submitError && <Alert className='mt-5' color='failure'>{submitError}</Alert>
        }
      </form>
    </div>
  )
}
