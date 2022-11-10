import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'
import { getAppStat } from '../../Network/Api';

const Home=()=> {
    const [counts, setCounts]=useState([])
    useEffect(()=>{
        appStat()
    },[])

    const appStat= async()=>{
        const result =await getAppStat()
        if (result.success){
            setCounts([result.data.data.users_nb,result.data.data.events_nb, result.data.data.posts_nb, result.data.data.comments_nb])
        }
    }
    console.log(counts)
  return (
    <>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
                <h2>Welcome</h2>
                {counts.map((count, index)=><p>{count} {index}</p>)}
            </div>
        </div>
    </>
  )
}
export default Home