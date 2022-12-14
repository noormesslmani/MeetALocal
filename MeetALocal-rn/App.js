import 'react-native-gesture-handler';
import * as React from "react";
import RootNavigation from './navigation/MainStack';
import { useState, useRef, useEffect } from "react";
import {Notify} from './Notifications/Notifications'
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContextProvider from './context/UserContext';
import EventsContextProvider from './context/EventsContext';
import BookingsContextProvider from './context/BookingsContext';
export default function App() {
 
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
    <UserContextProvider>
      <EventsContextProvider>
        <BookingsContextProvider>
            <RootNavigation/>
        </BookingsContextProvider>
      </EventsContextProvider>
    </UserContextProvider>
    
  )
}
