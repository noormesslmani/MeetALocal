import React, {useState, useEffect} from 'react';
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'
import { getAppStat } from '../../Network/Api';
import CountsCard from '../../Components/Cards/CountsCard';
import { Bounce } from "react-activity";

const Home=()=> {
    const [usersCount, setUsersCount]=useState(null)
    const [eventCount, setEventsCount]=useState(null)
    const [postsCount, setPostsCount]=useState(null)
    const [commentsCount, setCommentsCount]=useState(null)
    const [isLoading, setIsLoading]= useState(true)
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
            setIsLoading(false)
        }
    }
  return (
    <div className='home-container'>
        <Header type={2}/>
        <div className='subcontainer'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <h1 className='home-title'>General Statistics</h1>
                {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
                {!isLoading && <div className='flex wrap cards-container'>
                    <CountsCard count={usersCount} title={'Users'} />
                    <CountsCard count={eventCount} title={'Events'} />
                </div>}
                {!isLoading && <div className='flex wrap cards-container'>
                    <CountsCard count={postsCount} title={'Posts'} />
                    <CountsCard count={commentsCount} title={'Comments'} />
                </div>}
            </div>
        </div>
    </div>
  )
}
export default Home