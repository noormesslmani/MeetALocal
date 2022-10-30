import * as React from "react";
import RootNavigation from "./screens/Navigation/navigation";
import { createContext, useState } from "react";
export const UserContext = createContext();
export default function App() {
  const [user,setUser]=useState(null)
  return(
    <UserContext.Provider value={{user, setUser}}>
      <RootNavigation/>
    </UserContext.Provider>
  )
}
