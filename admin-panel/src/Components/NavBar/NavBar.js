import React, {useState, useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import '../../Constants/Flex.css'
import './NavBar.css'
const NavBar=()=> {
  
  return (
    <div className='NavBar flex-col align-center'>
        <Link className='link'>Dashboard</Link>
        <Link className='link'>Locals</Link>
        <Link className='link'>Foreigners</Link>
        <Link className='link'>Statistics</Link>
        <Link className='link'>LogOut</Link>
    </div>
  )
}
export default NavBar