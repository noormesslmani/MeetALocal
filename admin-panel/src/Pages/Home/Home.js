import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'
import { getAppStat } from '../../Network/Api';
import CountsCard from '../../Components/Cards/CountsCard';
const Home=()=> {
    const [usersCount, setUsersCount]=useState(null)
    const [eventCount, setEventsCount]=useState(null)
    const [postsCount, setPostsCount]=useState(null)
    const [commentsCount, setCommentsCount]=useState(null)
    useEffect(()=>{
        appStat()
    },[])

    const appStat= async()=>{
        const result =await getAppStat()
        if (result.success){
            setUsersCount(result.data.data.users_nb)
            setEventsCount(result.data.data.events_nb)
            setPostsCount(result.data.data.posts_nb)
            setCommentsCount(result.data.data.comments_nb)
        }
    }
  return (
    <div className='home-container'>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <h1 className='welcome'>General Statistics</h1>
                <div className='flex wrap'>
                    <CountsCard count={usersCount} index={0}/>
                    <CountsCard count={eventCount} index={1}/>
                </div>
                <div className='flex wrap'>
                    <CountsCard count={postsCount} index={2}/>
                    <CountsCard count={commentsCount} index={3}/>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home