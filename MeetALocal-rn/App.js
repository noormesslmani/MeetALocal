import 'react-native-gesture-handler';
import * as React from "react";
import RootNavigation from './navigation/MainStack';
import { createContext, useState, useRef, useEffect } from "react";
import {Notify} from './notifications/Notifications'
import Toast from 'react-native-toast-message';
export const UserContext = createContext();
export default function App() {
  const [user,setUser]=useState({})
  const [locals,setLocals]=useState([])
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(()=>{
      Notify(setExpoPushToken, setNotifications, notificationListener, responseListener)
  },[])
  return(
    <UserContext.Provider value={{user, setUser, locals, setLocals}}>
      <RootNavigation/>
    </UserContext.Provider>
  )
}
