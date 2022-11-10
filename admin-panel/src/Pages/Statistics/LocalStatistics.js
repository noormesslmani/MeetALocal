import React, {useState, Component, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../Constants/Flex.css'
import '../Home/Home.css'
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import CanvasJSReact from '../../canvasjs.react';
import { getLocalsStat } from '../../Network/Api';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const LocalStatistics=({type})=> {
  const [genderData, setGenderData]= useState({})
  const [ageData, setAgeData]= useState({})
  const [isLoading, setIsLoading]= useState(false)
  useEffect(()=>{
    getStat()
  },[])
  // const options = {
  //   animationEnabled: true,
  //   title: {
  //     text: "Website Traffic Sources"
  //   },
  //   data: [{
  //     type: "pie",
  //     startAngle: 0,
  //     showInLegend: "true",
  //     legendText: "{label}",
  //     toolTipContent: "{label}: <strong>{y}%</strong>",
  //     indexLabel: "{y}%",
  //     indexLabelPlacement: "inside",
  //     dataPoints: [
  //       { y: 18, label: "Direct" },
  //       { y: 49, label: "Organic Search" },
  //       { y: 9, label: "Paid Search" },
  //       { y: 5, label: "Referral" },
  //       { y: 19, label: "Social" }
  //     ]
  //   }]
  // }
  const getStat= async()=>{
    setIsLoading(true)
    const result =await getLocalsStat()
    if (result.success){
        console.log(result.data.data)
    }
    setIsLoading(false)
}
  return(
    <div className='home-container'>
        <Header type={2}/>
        <div className='flex'>
            <NavBar/>
            <div className='dashboard-container flex-col align-center'>
            {/* <CanvasJSChart options = {options}/> */}
            </div>
        </div>
    </div>
  )
}
export default LocalStatistics