import { Select, Textarea, TextInput, Label, Button } from 'flowbite-react';
import React from 'react';

export default function CreateProblem() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a New Problem Statement</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 justify-between'>
          <div>
            <Label htmlFor='title'>Title:</Label>
            <Textarea type='text' placeholder='Title' required id='title' className='flex-1' rows={3}/>
          </div>
          <div>
            <Label htmlFor='difficulty'>Difficulty:</Label>
            <Select id='difficulty'>
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
            />
          </div>
          <div className="flex flex-row justify-between">
          <Button gradientMonochrome="teal">Add Test Case</Button>
          <Button gradientMonochrome="teal">Remove Test Case</Button>
          </div>
        </div>
        <Button type='submit' gradientMonochrome="purple">Add Problem</Button>
      </form>
    </div>
  )
}
