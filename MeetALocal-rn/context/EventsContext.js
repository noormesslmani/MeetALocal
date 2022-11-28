import * as React from "react";
import { createContext, useState} from "react";
export const EventsContext = createContext();
export default function EventsContextProvider({children}){
    const [events,setEvents]=useState([])
    const [posts,setPosts]=useState([])
    const [comments,setComments]=useState([])
    return <EventsContext.Provider value={{events,setEvents, posts,setPosts, comments,setComments}}>{children}</EventsContext.Provider>;
}