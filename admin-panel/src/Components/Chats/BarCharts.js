import React, {useState, Component, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Chart from 'react-apexcharts'
const BarChart=({options, series, title})=>{
    console.log(series)
    return(
        <Chart  options={options} series={series} type="bar" width="340" />
    )
}
export default BarChart