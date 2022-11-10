import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './UserTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
const UsersTable=({data})=> {
    console.log(data)
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
                        <td><FontAwesomeIcon icon={faBan} color={user.ban? 'red':'green'} className='ban-icon'/></td>
                    </tr>)}
                )}
            </table>
        </div>
        )
}
export default UsersTable