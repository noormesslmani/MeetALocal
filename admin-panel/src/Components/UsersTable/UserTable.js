import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './UserTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { toggleBans } from '../../Network/Api';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
const UsersTable=({data, setBanLoading})=> {
    const handleBan=(id)=>{
        toggleBan(id)
    }
    const toggleBan= async(id)=>{
        setBanLoading(true)
        const data={
            user_id:id
        }
        const result =await toggleBans(data)
        if (result.success){
            setBanLoading(false)
        }
    }
  return(
        <div className="table-container">
            <table>
                <tr>
                    <th className='name-row'>Name</th>
                    <th className='email-row'>Email</th>
                    <th className='gender-row'>Gender</th>
                    <th className='country-row'>Country</th>
                    <th className='date-row'>Joined At</th>
                    <th className='ban-row'>Ban</th>
                </tr>
                {data.map((user, index)=>
                    {return (<tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.country}</td>
                        <td>{user.created_at.slice(0,11)}</td>
                        <td><FontAwesomeIcon icon={faBan} color={user.ban? 'red':'green'} className='ban-icon' onClick={()=>handleBan(user.id)}/></td>
                    </tr>)}
                )}
            </table>
        </div>
        )
}
export default UsersTable