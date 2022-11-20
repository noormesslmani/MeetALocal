import React, {useState, useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import '../../Constants/Flex.css'
import './CountsCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
const CountsCard=({count, title})=> {

    return (
        <div className='counts-card flex align-center lightViolet space-around'>
            <div className='flex-col align-center justify-center line-height'>
                <p className='count'>{count}</p>
                <p className='count'>{title}</p>
            </div>
            <FontAwesomeIcon icon={faCalendar} color='white' size='6x' />
        </div>
        )
  
}
export default CountsCard