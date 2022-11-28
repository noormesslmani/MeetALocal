import * as React from "react";
import { createContext, useState} from "react";
export const BookingsContext = createContext();
export default function BookingsContextProvider({children}){
    const [bookings,setBookings]=useState([])
    const [schedules,setSchedules]=useState([])
    return <BookingsContext.Provider value={{bookings,setBookings, schedules,setSchedules}}>{children}</BookingsContext.Provider>;
}