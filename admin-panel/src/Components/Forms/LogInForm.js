import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import './LogInForm.css'
import Button from '../Buttons/Button';
import { signin } from '../../Network/Api';
import { Bounce } from "react-activity";
const LogInForm=()=> {
  const navigate = useNavigate();
  const [email,setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const [isLoading, setIsloading]=useState(false)
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
    setIsloading(true)
    const result =await signin(data)
    if (result.success){
        setIsloading(false)
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
        {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
        <Button handleSubmit={handleSubmit}/>

      </form>
    </>
  )
}
export default LogInForm