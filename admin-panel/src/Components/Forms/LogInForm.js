import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import './LogInForm.css'
import Button from '../Buttons/Button';
import { signin } from '../../Network/Api';
const LogInForm=()=> {
  const navigate = useNavigate();
  const [email,setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(email && password){
        signIn()
    }
  }
  const signIn= async()=>{
    const data = {
    email,
    password,}
    const result =await signin(data)
    if (result.success){
        localStorage.setItem('user',JSON.stringify(result.data.user))
        navigate('/home')
        }
    }
  return (
    <>
      <form className='form flex-col align-center justify-center'>
        <h1>Welcome Back</h1>
        <div className='flex-col input-container'>
            <label>Email</label>
            <input type="email" placeholder='Enter your email'className='input'  onChange={handleEmail} required/>
        </div>
        <div className='flex-col input-container'>
            <label>Password</label>
            <input type="password"  placeholder='Enter your password' className='input' onChange={handlePassword} required/>
        </div>
        <Button handleSubmit={handleSubmit}/>

      </form>
    </>
  )
}
export default LogInForm