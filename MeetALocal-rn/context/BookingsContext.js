import * as React from "react";
import { createContext, useState} from "react";
export const BookingsContext = createContext();
export default function BookingsContextProvider({children}){
    const [bookings,setBookings]=useState([])
    return <BookingsContext.Provider value={{bookings,setBookings}}>{children}</BookingsContext.Provider>;
}