import React from 'react';
import logo from '../../Assets/logo.png'
import  './Logo.css'
const Logo=({type})=>{
    return(
        <img src={logo} className={type}></img>
    )
}
export default Logo