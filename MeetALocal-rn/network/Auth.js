import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL= "http://192.168.1.7:8000/api/v1.0.0/"
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
      return {'success': false, error}
    }
  }