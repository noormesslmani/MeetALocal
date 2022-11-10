import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import '../Home/Home.css'
import { render } from "react-dom";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import UsersTable from '../../Components/UsersTable/UserTable';
import {getUsers} from '../../Network/Api'
const Locals=()=> {
    const [isLoading, setIsLoading]= useState(true)
    const [data, setData]=useState(null)
    const [page, setPage]=useState(1)
    useEffect(()=>{
        getLocals()
    },[page])
    
    const getLocals= async()=>{
        setIsLoading(true)
        const result =await getUsers('Local', 10*(page-1))
        if (result.success){
            console.log(result.data.data)
            setData(result.data.data)
        }
        setIsLoading(false)
    }
  return (
    <div className='home-container'>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <h1 className='home-title'>Locals</h1>
                {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
                {!isLoading && <UsersTable data={data}/>}
            </div>
        </div>
    </div>
  )
}
export default Locals