import { View, Text} from 'react-native';
import React from 'react';
import { useState } from "react";
import Map from '../../../components/map/Map';
import { useRoute } from '@react-navigation/native';
import ProfileStyles from '../ProfileStyles/ProfileStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from '../../../components/Buttons/AppButtons';
const EditLocation=({navigation})=> {
    const route = useRoute();
    const [lat, setLat]=useState(route.params.lat);
    const [lng, setLng]=useState(route.params.lng);
    const [newLat, setNewLat]= useState(route.params.lat);
    const [newlng, setNewlng]= useState(route.params.lng);
    //This page is only for locals


    //update location 
    const handleDrag=(e)=>{
      setNewLat( e.nativeEvent.coordinate.latitude);
      setNewlng( e.nativeEvent.coordinate.longitude);
    }
    //save new location in AsyncStorage
    const handleSave=async()=>{
        await AsyncStorage.setItem('lat', newLat.toString());
        await AsyncStorage.setItem('lng', newlng.toString());
    }
   
  return (

    <View style={ProfileStyles.mapContainer}>
      <Text style={{fontSize:12, color:"grey"}}>Hold and drag the marker</Text>
      <Map lat={lat} lng={lng} type={2} handleDrag={handleDrag} />
      <View style={ProfileStyles.saveBtn} >
      <AppButton text='save' handlePress={handleSave} />
      </View>
    </View>
             
  )
}
export default EditLocation
