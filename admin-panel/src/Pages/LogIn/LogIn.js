import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../Components/Header/Header';
import LogInForm from '../../Components/Forms/LogInForm';
import './LogIn.css'
const LogIn=()=> {
  const navigate = useNavigate();
  return (
    <div className='container flex-col'>
      <Header type={1}/>
      <div className='body'>
        <LogInForm />
      </div>
  
    </div>
  )
}
export default LogIn