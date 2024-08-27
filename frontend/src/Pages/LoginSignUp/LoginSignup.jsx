import React from 'react'
import './LoginSignup.css'
import { useState } from 'react';

// import user_icon from '../Assets2/person.png'
// import email_icon from '../Assets2/email.jpg'
// import password_icon from '../Assets2/password.png'

const signUpHandler = async (user) => {
    // console.log(user);
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(user),
    });
    console.log(await response.json())
}

const loginHandler = async (user) => {
  // console.log(user);
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(user),
  });
  console.log(await response.json())
}


const LoginSignup = () => {

  const [action,setAction] = useState("Sign Up");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  return (
    <>
    <h1 className='Heading'>My Online Judge</h1>
    <div className="container">
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
      <div className="inputs">
        {action==="Login"?<div></div>: <div><div className="input login" >
          <i className="fa-solid fa-person"></i>
            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className="input">
        <i className="fa-solid fa-person"></i>
            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div> </div>}

        <div className="input">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Email Id" value={action==='Sign Up'? email: loginEmail} onChange={e => action==='Sign Up'? setEmail(e.target.value):setLoginEmail(e.target.value)} />
        </div>
        <div className="input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Password"value={action ==='Sign Up'? password: loginPassword} onChange={e => action==='Sign Up'? setPassword(e.target.value):setLoginPassword(e.target.value)}/>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here</span></div>}
      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{action==="Sign Up" ? signUpHandler({firstName, lastName, email, password}) : setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{action==="Login"? loginHandler({email:loginEmail, password:loginPassword}):setAction("Login")}}>Login</div>

      </div>
    </div>
    </>
  )
}

export default LoginSignup