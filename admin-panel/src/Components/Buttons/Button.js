import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import './Button.css'
const Button=({handleSubmit})=> {
  return (
    <button className='btn flex align-center justify-center' onClick={handleSubmit} >Sign in</button>
  )
}
export default Button