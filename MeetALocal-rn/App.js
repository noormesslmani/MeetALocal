import 'react-native-gesture-handler';
import * as React from "react";
import RootNavigation from './navigation/MainStack';
import { createContext, useState, useRef, useEffect } from "react";
import {Notify} from './notifications/Notifications'
export const UserContext = createContext();
export default function App() {
  const [user,setUser]=useState({})
  const [locals,setLocals]=useState([])
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(()=>{
      Notify(setExpoPushToken, setNotification, notificationListener, responseListener)
  },[])
  return(
    <UserContext.Provider value={{user, setUser, locals, setLocals}}>
      <RootNavigation/>
    </UserContext.Provider>
  )
}
