import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import '../Home/Home.css'
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import UsersTable from '../../Components/UsersTable/UserTable';
import {getUsers, getSearches} from '../../Network/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import Search from '../../Components/Search/Search';
import { UsersContext } from '../../Context/UsersContext';
const Foreigners=()=> {
    const [isLoading, setIsLoading]= useState(true)
    const [banLoading, setBanLoading]= useState(false)


    const [page, setPage]=useState(1)
    const [currentPage, setCurrentPage]=useState(1)
    const [searchInput, setSearchInput]=useState('')
    const [pressed, setPressed]=useState(false)

    const {users, setUsers}=useContext(UsersContext);

    useEffect(()=>{
        !pressed && getForeigners()
    },[page, banLoading, pressed])

    useEffect(()=>{
        pressed && getSearchedForeigners() 
    },[pressed, page])

    const getSearchedForeigners=async()=>{
        setIsLoading(true)
        const params={
            name:searchInput,
            type:'Foreigner',
            offset:10*(page-1)
        }
        const result =await getSearches(params)
        if (result.success){
            if(result.data.data.length==0){
                setPage(page-1)
            }
            else{
            setUsers(result.data.data)
            setCurrentPage(page)}
        }
        setIsLoading(false)
    }
    
    const getForeigners= async()=>{
        setIsLoading(true)
        const params={
            type:'Foreigner',
            offset:10*(page-1)
        }
        const result =await getUsers(params)
        if (result.success){
            if(result.data.data.length==0){
                setPage(page-1)
            }
            else{
            setUsers(result.data.data)
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

    const handleKeypress = e => {
        if (e.key === 'Enter') {
          setPage(1)
          setCurrentPage(1)
          setUsers([])
          setPressed(true)
        }
    }

  return (
    <div className='home-container'>
        <Header type={2}/>
        <div className='subcontainer'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <div className='search-container flex space-between align-center'>
                    <h1 className='home-title'>Foreigners</h1>
                    <Search searchInput={searchInput} setSearchInput={setSearchInput} handleKeypress={handleKeypress} />
                </div>
                <div className='flex space-between stat-links-container'>
                <NavLink to='/Foreigners' className='banned-link' onClick={()=>setPressed(false)}>All</NavLink>
                <NavLink to='/banned-foreigners' className='banned-link' onClick={()=>setPressed(false)}>Banned</NavLink>
                </div>
                {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
                {!isLoading && <UsersTable data={users} setBanLoading={setBanLoading} />}
                {!isLoading && <div className='flex align-center justify-center arrow-contianer'>
                    <FontAwesomeIcon icon={faArrowLeft} color='rgba(140,87,186,1)' className='arrow' onClick={hanldePrev}/>
                    <p>{currentPage}</p>
                    <FontAwesomeIcon icon={faArrowRight} color='rgba(140,87,186,1)' className='arrow' onClick={hanldeNext}/>
                </div>}
            </div>
        </div>
    </div>
  )
}
export default Foreigners