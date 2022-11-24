import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default async function response(config){
    const token = await AsyncStorage.getItem('@token')
    const payLoad={...config, headers: {Authorization: `Bearer ${token}` }}
    try{
        const res = await axios(payLoad)
        return {success:true, data: res.data}
      }
      catch (error) {
        console.warn(error)
        return {'success': false, error}
      }
}