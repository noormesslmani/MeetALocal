import { address } from '../constants/address';
import response from './Response';
const baseURL= `${address}/api/v1.0.0/`

export async function saveToken(data){
    const config = {
      method: "put",
      data,
      url:`${baseURL}users/token`,
    }
    return response(config)
  }
  export async function getToken(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}users/token`,
    }
    return response(config)
  }
  export async function getNotifications(){
    const config = {
      method: "get",
      url:`${baseURL}locals/notifications`,
    }
    return response(config)
  }
  export async function deleteNotifications(){
    const config = {
      method: "delete",
      url:`${baseURL}locals/notifications`,
    }
    return response(config)
  }