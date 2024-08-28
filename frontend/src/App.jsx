import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';
import ProblemList from './Pages/ProblemList';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path = "/" element={<Home />} />
      <Route path = "/about" element={<About />} />
      <Route path = "/sign-in" element={<SignIn />} />
      <Route path = "/sign-up" element={<SignUp />} />
      <Route path = "/dashboard" element={<Dashboard />} />
      <Route path ="/problem-list" element={<ProblemList />} />      
    </Routes>

    </BrowserRouter>
  );
}

export default App