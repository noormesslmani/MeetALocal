import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo';
import '../../Constants/Flex.css'
const Header=()=> {
  const navigate = useNavigate();
  return (
    <header className='flex justify-center align-center header'>
        <Logo type={'logo1'} class/>
    </header>
  )
}
export default Header