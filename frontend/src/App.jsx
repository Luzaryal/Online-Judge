import { useState } from 'react'
import './App.css'
import LoginSignup from './Pages/LoginSignUp/LoginSignup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LoginSignup/>
    </div>
  );
}

export default App