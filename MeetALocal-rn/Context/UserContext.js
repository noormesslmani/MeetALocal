
import * as React from 'react';
import { createContext, useState } from "react";
import App from '../App';
export const UserContext = createContext();
export default function ContextProvider() {
const [id, setId]=useState(null)
const [name, setName]=useState(null)
const [gender, setGender]=useState(null)
const [userType, setUserType]=useState(null)
const [phone, setPhone]=useState(null)
const [nationality, setNationality]=useState(null)
const [residence, setResidence]=useState(null)
const [dob, setDOB]= useState(null)
const [email, setEmail]= useState(null)
const [photo, setPhoto]= useState(null)
const [fees, setFees]= useState(null)
const [languages, setLanguages]=useState(null)
const [categories,setCategories]= useState(null)
const [about, setAbout]= useState(null) 
const [location, setLocation]= useState(null)
const [highlights, setHighlights]= useState(null)
const [token, setToken]= useState(null)

  return (
    <UserContext.Provider value={{
      id,
      setId,
      name,
      setName,
      gender,
      setGender,
      phone,
      setPhone,
      nationality,
      setNationality,
      residence,
      setResidence,
      languages,
      setLanguages,
      about,
      setAbout,
      dob,
      setDOB,
      userType,
      setUserType,
      email,
      setEmail,
      photo,
      setPhoto,
      fees,
      setFees,
      categories,
      setCategories,
      location,
      setLocation,
      highlights,
      setHighlights,
      token,
      setToken
    }}>
        <App/>
    </UserContext.Provider>
  );
}