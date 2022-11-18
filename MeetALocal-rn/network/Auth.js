import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { address } from '../constants/address';
const baseURL= `${address}/api/v1.0.0/`
export async function signin(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}auth/login`,
    }
    try{
      const res = await axios(config)
      await AsyncStorage.setItem("@token", res.data['access_token']);
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      console.log('hi')
      return {'success': false, error}
    }
  }
  export async function registerAccount(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}auth/register`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  