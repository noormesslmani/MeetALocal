import 'react-native-gesture-handler';
import * as React from "react";
import RootNavigation from './navigation/MainStack';
import { createContext, useState, useRef, useEffect } from "react";
import {Notify} from './notifications/Notifications'
import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserContext = createContext();
export default function App() {
  const [user,setUser]=useState({})
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(()=>{
      saveExpoToken()   
  },[AsyncStorage.getItem('@token')])
  const saveExpoToken=async()=>{
    const token = await AsyncStorage.getItem('@token')
    if(token){
      console.log(token)
      Notify(setExpoPushToken, setNotifications, notificationListener, responseListener)
    }
  }

  return(
    <UserContext.Provider value={{user, setUser}}>
      <RootNavigation/>
    </UserContext.Provider>
  )
}
