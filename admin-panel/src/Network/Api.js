import axios from 'axios';
const baseURL= "http://127.0.0.1:8000/api/v1.0.0/"
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