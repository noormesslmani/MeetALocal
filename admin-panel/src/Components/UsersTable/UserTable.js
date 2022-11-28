import React, {useState, useEffect, useContext} from 'react';
import './UserTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { toggleBans } from '../../Network/Api';
import "react-activity/dist/library.css";
import { UsersContext } from '../../Context/UsersContext';
const UsersTable=({banned})=> {
    const {users, setUsers}=useContext(UsersContext)
    const handleBan=(user)=>{
        toggleBan(user)
    }
    const toggleBan= async(user)=>{
        const data={
            user_id:user.id
        }
        const result =await toggleBans(data)
        if (result.success){
            banned?setUsers(users.filter(item=>item!=user)):
            setUsers(users.map(item=>item==user?({...item,ban:!user.ban}):item))
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
                {users.map((user, index)=>
                    {return (<tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.country}</td>
                        <td>{user.created_at.slice(0,11)}</td>
                        <td><FontAwesomeIcon icon={faBan} size='lg' color={user.ban? 'red':'green'} className='ban-icon' onClick={()=>handleBan(user)}/></td>
                    </tr>)}
                )}
            </table>
        </div>
        )
}
export default UsersTable