import React from 'react';
import { createContext, useState} from "react";
export const UsersContext = createContext();
export default function UserContextProvider({children}){
    const [users,setUsers]=useState([])
    return <UsersContext.Provider value={{users, setUsers}}>{children}</UsersContext.Provider>;
}