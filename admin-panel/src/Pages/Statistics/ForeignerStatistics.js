import React, {useState, Component, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import '../Home/Home.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import { getForeignersStat } from '../../Network/Api';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import PieChart from '../../Components/Chats/PieCharts';
import BarChart from '../../Components/Chats/BarCharts';
import { NavLink } from 'react-router-dom';
import { colors } from '../../Constants/ChartColors';
const ForeignerStatistics=({type})=> {
  const [total, setTotal]=useState(null)
  const [genderData, setGenderData]= useState(null)
  const [ageData, setAgeData]= useState(null)
  const [countryData, setCountryData]=useState(null)
  const [countryLabels, setCountryLabels]=useState(null)
  const [languageData, setLanguageData]=useState(null)
  const [languageLabels, setLanguageLabels]=useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [topCategories, setTopCategories]=useState([])
  useEffect(()=>{
    getStat()
  },[])
 
  const props={chart: {id: "simple-bar"},plotOptions: {bar: {distributed: true}}, colors:colors}
  const getStat= async()=>{
    setIsLoading(true)
    const result =await getForeignersStat()
    if (result.success){
        console.log(result.data.data)
        setTotal(result.data.data.locals_nb)
        setGenderData([Math.round(result.data.data['male%']),Math.round(result.data.data['female%'])])
        setAgeData([Math.round(result.data.data.ages[0]),Math.round(result.data.data.ages[1]),Math.round(result.data.data.ages[2])])
        setLanguageLabels([result.data.data.top_languages[0].language, result.data.data.top_languages[1].language, result.data.data.top_languages[2].language])
        setLanguageData([result.data.data.top_languages[0].count, result.data.data.top_languages[1].count, result.data.data.top_languages[2].count])
        setCountryLabels([result.data.data.top_countries[0].country, result.data.data.top_countries[1].country, result.data.data.top_countries[2].country])
        setCountryData([result.data.data.top_countries[0].count, result.data.data.top_countries[1].count, result.data.data.top_countries[2].count])
      }

    setIsLoading(false)
}
  
  return(
    <div className='home-container'>
        <Header type={2}/>
        <div className='subcontainer'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
              <h1 className='home-title'>Statistics</h1>
              <div className='flex space-between stat-links-container'>
                <NavLink to='/locals-statistics' className='stat-link'>Locals</NavLink>
                <NavLink to='/foreigners-statistics' className='stat-link'>Foreigners</NavLink>
              </div>
              <h3>Total Number: {total}</h3>
              {isLoading && <Bounce color='rgba(140,87,186,0.7)'/>}
              <div className='flex wrap space-between charts-container'>
                {!isLoading && <PieChart
                options={{ labels: ["Male", "Female"], title:{text:'Genders'}, colors:colors }} series={genderData}/>}
                {!isLoading && <PieChart
                options={{ labels: ["Below 30", "30-60","Above 60"], title:{text:'Age groups'}, colors:colors }} series={ageData} />}
              </div>
              <div className='flex wrap space-between charts-container'>
              {!isLoading && <BarChart
                 options={{...props,xaxis: {categories: countryLabels }, title:{text:'Top countries'}}} series={[{data: countryData}]}  />}
                {!isLoading && <BarChart
                 options={{...props,xaxis: {categories: languageLabels }, title:{text:'Top languages'}}} series={[{data: languageData}]}  />}
              </div>
            </div>
        </div>
    </div>
  )
}
export default ForeignerStatistics