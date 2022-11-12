import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";

import { useRoute } from '@react-navigation/native';
import styles from './Authstyles';
import BackArrow from '../../components/Header/BackArrow';
import * as Location from 'expo-location';
import Map from '../../components/map/Map';
const SetUpMap=({navigation})=> {
    const route = useRoute();
    const base64= route.params.base64
    const gender= route.params.gender
    const ext= route.params.ext
    const about= route.params.about
    const [location, setLocation] = useState(null);
    const [lat, setLat]=useState(33.888630)
    const [lng, setLng]=useState(35.495480)
    const [errorMsg, setErrorMsg] = useState(null);
    console.log(about)
    useEffect(() => {
        getLocation()
      }, []);

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation}/>,
      });
    }, [navigation]);

    async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLat(location.coords.latitude)
        setLng(location.coords.longitude)
    }
    const handleDrag=(e)=>{
      setLat( e.nativeEvent.coordinate.latitude)
      setLng( e.nativeEvent.coordinate.longitude)
    }
    const handleNext=()=>{
        navigation.navigate('categories',{gender, base64, ext, lat, lng})
    }

    
  return (

    <View style={styles.mapContainer}>
      <Text style={{fontSize:12, color:"grey"}}>Hold and drag the marker</Text>
      <Map lat={lat} lng={lng} type={2} handleDrag={handleDrag} />
      <TouchableOpacity style={[styles.saveBtn, styles.button]} onPress={handleNext} ><Text style={{color: 'white'}}>Next</Text></TouchableOpacity>
    </View>
             
  )
}
export default SetUpMap