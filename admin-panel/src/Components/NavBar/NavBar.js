import React, {useState, useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../../Constants/Flex.css'
import './NavBar.css'
const NavBar=()=> {
  
  return (
    <nav className='NavBar flex-col align-center'>
        <NavLink className='link' to="/home">Dashboard</NavLink>
        <NavLink className='link' to="/locals">Locals</NavLink>
        <NavLink className='link' to="/foreigners">Foreigners</NavLink>
        <NavLink className='link' to='/locals-statistics'>Statistics</NavLink>
        <NavLink className='link' to="/">LogOut</NavLink>
    </nav>
  )
}
export default NavBar