import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { address } from '../constants/address';
const baseURL= `${address}/api/v1.0.0/`

export async function saveToken(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "put",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/token`,
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
  export async function getToken(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      params:{id},
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/token`,
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