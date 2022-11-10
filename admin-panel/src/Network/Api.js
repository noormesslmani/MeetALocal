import axios from 'axios';
const baseURL= "http://192.168.1.7:8000/api/v1.0.0/"
const headers= { Authorization: `Bearer ${localStorage.getItem('token')}`}
export async function signin(data){
    console.log(123)
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

  export async function getAppStat(data){
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