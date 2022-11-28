import * as React from "react";
import { createContext, useState} from "react";
export const ReviewsContext = createContext();
export default function ReviewsContextProvider({children}){
    const [reviews,setReviews]=useState([])
    return <ReviewsContext.Provider value={{reviews, setReviews}}>{children}</ReviewsContext.Provider>;
}