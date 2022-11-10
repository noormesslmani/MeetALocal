import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './UserTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
const UsersTable=({data})=> {

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
                <tr>
                    <td>Anom</td>
                    <td>19</td>
                    <td>Male</td>
                    <td>Lebanon</td>
                    <td>2000</td>
                    <td><FontAwesomeIcon icon={faBan} color='green' /></td>
                </tr>
                <tr>
                    <td>Megha</td>
                    <td>19</td>
                    <td>Female</td>
                    <td>Lebanon</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td>Subham</td>
                    <td>25</td>
                    <td>Male</td>
                    <td>Lebanon</td>
                    <td>2000</td>
                </tr>
            </table>
        </div>
        )
}
export default UsersTable