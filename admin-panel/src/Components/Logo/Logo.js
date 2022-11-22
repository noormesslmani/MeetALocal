import React from 'react';
import logo from '../../Assets/logo.png'
import  './Logo.css'
const Logo=({type})=>{
    
    if(type==1)
    {return(
        <img src={logo} className='logo1'></img>
    )}
    if(type==2){
        return <img src={logo} className='logo2'></img>
    }
}
export default Logo