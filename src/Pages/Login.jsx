import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/authSlice';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [email,setEmail] = useState("");
  const [password,setPassword]=useState("");

  const {loading,error,isAuthenticated} = useSelector(
    (state)=>state.auth
  );


  const handlesubmit = (e)=>{
    e.preventDefault();

    dispatch(loginUser({email,password}))
    .unwrap()
    .then(()=>{
      navigate("/home");
    })
    .catch((err) => console.log("Login failed:", err))
   

  }
  return (
   <div>
    <form onSubmit={handlesubmit}>
      <input
      type='email'
      placeholder="Enter Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      required
      />
      <br />
      <input 
      type = "password"
      placeholder=' Enter Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required
      />
      <br/>
      <button type = "submit"disabled={loading}>
        {loading ? "logging in..." :" Login"}
      </button>
    </form>

    {error && <p style={{color:"red"}}>{error}</p>}

    {isAuthenticated && (<p style={{color:"green"}}>Logged in Successfully </p>)}
   </div>
   
  )
}

export default Login