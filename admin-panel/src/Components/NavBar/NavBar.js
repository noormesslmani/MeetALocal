import React, {useState, useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../../Constants/Flex.css'
import './NavBar.css'
const NavBar=()=> {
  
  return (
    <nav className='NavBar flex-col align-center'>
        <NavLink className='link' to="/home">Dashboard</NavLink>
        <NavLink className='link'>Locals</NavLink>
        <NavLink className='link'>Foreigners</NavLink>
        <NavLink className='link'>Statistics</NavLink>
        <NavLink className='link'>LogOut</NavLink>
    </nav>
  )
}
export default NavBar