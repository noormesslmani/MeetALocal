import axios from 'axios';
import response from './Response';
const baseURL= "http://192.168.1.7:8000/api/v1.0.0/"
export async function signin(data){

    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}auth/login`,
    }
    try{
      const res = await axios(config)
      localStorage.setItem("token", res.data['access_token']);
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }

  export async function getAppStat(){
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/app-stat`,
    }
    return response(config)
  }

  export async function getUsers(params){
    const config = {
      method: "get",
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/users`,
    }
    return response(config)
  }

  export async function toggleBans(data){
    const config = {
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      data,
      url:`${baseURL}admins/toggle-ban`,
    }
    return response(config)
  }

  export async function getLocalsStat(){
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/locals-stat`,
    }
    return response(config)
  }

  export async function getForeignersStat(){
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/foreigners-stat`,
    }
    return response(config)
  }

  export async function getBannedUsers(){
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/bans`,
    }
    return response(config)
  }

  export async function getLocations(){
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/locations`,
    }
    return response(config)
  }

  export async function getSearches(params){
   
    const config = {
      method: "get",
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      url:`${baseURL}admins/search-users`,
    }
    return response(config)
  }