import React, {useState, useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import '../../Constants/Flex.css'
import './CountsCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
const CountsCard=({index, count})=> {

    switch(index) {
        case 0:
            return (
                <div className='counts-card flex align-center red'>
                    <p>{count}</p>
                    <FontAwesomeIcon icon={faUser} color='white'size='6x' />
                </div>
             )
        case 1:
            return (
                <div className='counts-card flex align-center blue'>
                    <p>{count}</p>
                    <FontAwesomeIcon icon={faCalendar} color='white' size='6x' />
                </div>
             )
        case 2:
            return (
                <div className='counts-card flex align-center green'>
                    <p>{count}</p>
                    <FontAwesomeIcon icon={faCalendar} color='white' size='6x' />
                </div>
             )
        case 3:
            return (
                <div className='counts-card flex align-center yellow'>
                    <p>{count}</p>
                    <FontAwesomeIcon icon={faComment} color='white' size='6x' />
                </div>
             )
        
      }
  
}
export default CountsCard