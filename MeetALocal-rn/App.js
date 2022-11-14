import 'react-native-gesture-handler';
import * as React from "react";
import RootNavigation from './navigation/MainStack';
import { createContext, useState } from "react";
export const UserContext = createContext();
export default function App() {
  const [user,setUser]=useState({})
  const [locals,setLocals]=useState([])
  return(
    <UserContext.Provider value={{user, setUser, locals, setLocals}}>
      <RootNavigation/>
    </UserContext.Provider>
  )
}
