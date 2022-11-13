import React, {useState, useEffect} from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import '../Home/Home.css'
import { render } from "react-dom";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import UsersTable from '../../Components/UsersTable/UserTable';
import {getUsers} from '../../Network/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
const Foreigners=()=> {
    const [isLoading, setIsLoading]= useState(true)
    const [banLoading, setBanLoading]= useState(false)
    const [data, setData]=useState(null)
    const [page, setPage]=useState(1)
    const [currentPage, setCurrentPage]=useState(1)
    useEffect(()=>{
        getLocals()
    },[page, banLoading])
    
    const getLocals= async()=>{
        setIsLoading(true)
        const result =await getUsers('Foreigner', 10*(page-1))
        if (result.success){
            console.log(result.data.data)
            if(result.data.data.length==0){
                setPage(page-1)
            }
            else{
            setData(result.data.data)
            setCurrentPage(page)}
        }
        setIsLoading(false)
    }
    const hanldeNext=()=>{
        setPage(page+1)
    }
    const hanldePrev=()=>{
        if(page>1){
            setPage(page-1)
        }
    }
  return (
    <div className='home-container'>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <h1 className='home-title'>Foreigners</h1>
                <div className='flex space-between stat-links-container'>
                <NavLink to='/Foreigners' className='banned-link'>All</NavLink>
                <NavLink to='/banned-foreigners' className='banned-link'>Banned</NavLink>
                </div>
                {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
                {!isLoading && <UsersTable data={data} setBanLoading={setBanLoading} />}
                <div className='flex align-center justify-center arrow-contianer'>
                    <FontAwesomeIcon icon={faArrowLeft} color='rgba(140,87,186,1)' className='arrow' onClick={hanldePrev}/>
                    <p>{currentPage}</p>
                    <FontAwesomeIcon icon={faArrowRight} color='rgba(140,87,186,1)' className='arrow' onClick={hanldeNext}/>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Foreigners