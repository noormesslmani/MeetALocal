
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import { icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { getLocations } from "../../Network/Api";
import '../Home/Home.css'
export default function Map(){
    const [locations, setLocations]=useState(null)
    const position = [33.888630, 35.495480]
    useEffect(()=>{
        getLocalsLocations()
      },[])
    const getLocalsLocations=async()=>{
        const result =await getLocations()
        if(result.success){
            setLocations(result.data.data)
        }
    }
  return (
   

    <div className='home-container'>
    <Header type={2}/>
    <div className='subcontainer'>
        <NavBar/>
        <div className='dashboard-container flex-col align-center'>
        <MapContainer center={position} zoom={3} scrollWheelZoom={false} className='map' >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location)=>
        <Marker position={[location.latitude, location.longitude]}
        icon={
            new icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        />
        )}
        </MapContainer>
        </div>
    </div>
</div>
  );
}