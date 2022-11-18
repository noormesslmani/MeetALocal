import axios from 'axios';
const baseURL= "http://192.168.1.7:8000/api/v1.0.0/"
const headers= { Authorization: `Bearer ${localStorage.getItem('token')}`}
export async function signin(data){

    const config = {
      method: "post",
      data,
      url:`${baseURL}auth/login`,
    }
    console.log(data)
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
    console.log(headers)
    const config = {
      method: "get",
      headers,
      url:`${baseURL}admins/app-stat`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function getUsers(params){
    const config = {
      method: "get",
      params,
      headers,
      url:`${baseURL}admins/users`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function toggleBans(data){
    const config = {
      method: "post",
      headers,
      data,
      url:`${baseURL}admins/toggle-ban`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function getLocalsStat(){
    const config = {
      method: "get",
      headers,
      url:`${baseURL}admins/locals-stat`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function getForeignersStat(){
    const config = {
      method: "get",
      headers,
      url:`${baseURL}admins/foreigners-stat`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function getBannedUsers(){
    const config = {
      method: "get",
      headers,
      url:`${baseURL}admins/bans`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }
  export async function getLocations(){
    const config = {
      method: "get",
      headers,
      url:`${baseURL}admins/locations`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.log(error)
      return {'success': false, error}
    }
  }