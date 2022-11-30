import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react';
import { useState, useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import styles from './Styles/AuthScreensStyle';
import * as Location from 'expo-location';
import Map from '../../components/map/Map';
const SetUpMap=({navigation})=> {
    const route = useRoute();
  
    const [lat, setLat]=useState(33.888630);
    const [lng, setLng]=useState(35.495480);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
      }, []);

    //get user's location
    async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
        setLat(location.coords.latitude);
        setLng(location.coords.longitude);
    }

    //dragging the pin on the map
    const handleDrag=(e)=>{
      setLat( e.nativeEvent.coordinate.latitude);
      setLng( e.nativeEvent.coordinate.longitude);
    }
    const handleNext=()=>{
        navigation.navigate('categories',{...route.params, lat, lng});
    }

    
  return (

    <View style={styles.mapContainer}>
      <Text style={{fontSize:12, color:"grey"}}>Hold and drag the marker</Text>
      <Map lat={lat} lng={lng} type={2} handleDrag={handleDrag} />
      <TouchableOpacity style={[styles.saveBtn, styles.button]} onPress={handleNext} ><Text style={{color: 'white', fontSize:16, fontWeight:"700"}}>Next</Text></TouchableOpacity>
    </View>
             
  )
}
export default SetUpMap