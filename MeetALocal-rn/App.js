import * as React from "react";
import RootNavigation from "./screens/Navigation/navigation";
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
