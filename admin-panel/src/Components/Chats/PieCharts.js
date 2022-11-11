import React, {useState, Component, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Chart from 'react-apexcharts'
const PieChart=({options, series, title})=>{
    return(
        <Chart  options={options} series={series} type="pie" width="340" />
    )
}
export default PieChart