import axios from 'axios';

export default async function response(config){
    try{
        const res = await axios(config)
        return {success:true, data: res.data}
    }
      catch (error) {
        console.log(error)
        return {'success': false, error}
    }
}