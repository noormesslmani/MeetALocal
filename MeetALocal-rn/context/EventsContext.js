import * as React from "react";
import { createContext, useState} from "react";
export const EventsContext = createContext();
export default function EventsContextProvider({children}){
    const [events,setEvents]=useState([])
    return <EventsContext.Provider value={{events,setEvents}}>{children}</EventsContext.Provider>;
}