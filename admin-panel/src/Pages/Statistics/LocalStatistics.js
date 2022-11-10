import React, {useState, Component, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import '../Home/Home.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import CanvasJSReact from '../../canvasjs.react';
import { getLocalsStat } from '../../Network/Api';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import PieChart from '../../Components/Chats/PieCharts';
const LocalStatistics=({type})=> {
  const [total, setTotal]=useState(null)
  const [genderData, setGenderData]= useState(null)
  const [ageData, setAgeData]= useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [topCategories, setTopCategories]=useState([])
  useEffect(()=>{
    getStat()
  },[])
 
  console.log(genderData)
  const getStat= async()=>{
    setIsLoading(true)
    const result =await getLocalsStat()
    if (result.success){
        console.log(result.data.data)
        setTotal(result.data.data.locals_nb)
        setGenderData([Math.round(result.data.data['male%']),Math.round(result.data.data['female%'])])
        setAgeData([Math.round(result.data.data.ages[0]),Math.round(result.data.data.ages[1]),Math.round(result.data.data.ages[2])])
      }
    setIsLoading(false)
}

  return(
    <div className='home-container'>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
            {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
            <div className='flex'>
            {!isLoading && <PieChart
              options={{ labels: ["Male", "Female"] }} series={genderData} title={'Genders'}/>}
              {!isLoading && <PieChart
              options={{ labels: ["Below 30", "30-60","Above 60"] }} series={ageData} title={'Age Groups'} />}
            </div>
            </div>
        </div>
    </div>
  )
}
export default LocalStatistics