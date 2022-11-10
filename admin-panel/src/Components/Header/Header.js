import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo';
import '../../Constants/Flex.css'
import profile from '../../Assets/blank-profile.webp'
import './Header.css'
const Header=({type})=> {
  const  user=JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  if(type==1){
    return (
      <header className='flex justify-center align-center header'>
          <Logo/>
      </header>
    )
  }
  if(type==2){
    return (
      <header className='flex align-center header space-between'>
          <Logo/>
          <div className='flex align-center justify-center'>
            <p>{user.name}</p>
            <img src={ user.profile_picture? `http://127.0.0.1:8000/${user.profile_picture}`:{profile}} className='profile-img'></img>
          </div>
      </header>
    )
  }
}
export default Header