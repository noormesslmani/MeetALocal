import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import styles from './Authstyles';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
const SetUpMap=({navigation})=> {
    const route = useRoute();
    const base64= route.params.base64
    const gender= route.params.gender
    const ext= route.params.ext
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude]=useState(null)
    const [longitude, setLongitude]=useState(null)
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation()
      }, []);

    async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
    }
    const handleLocation=()=>{
        getLocation()
    }
    const handleNext=()=>{
        console.log('hi')
        navigation.navigate('categories',{gender, base64, ext, latitude, longitude})
    }

    async function setUp(){
        const data = {
          type: type,
          gender: gender,
          photo: base64,
          ext: ext,
          
        };
        const token = await AsyncStorage.getItem('@token')
        axios({
          method: "post",
          data,
          headers: { Authorization: `Bearer ${token}`},
          url:"http://192.168.1.7:8000/api/v1.0.0/auth/setup",
        })
        .then(async (response)=> {
          console.log(response.data)
          await AsyncStorage.setItem("@user", JSON.stringify(response.data['user']));
          navigation.navigate('tabs')
          return response.data;
        })
        .catch(function (error) {
          console.warn(error)
        });
      }
  return (

    <View style={styles.mapContainer}>
        <View style={{alignItems:"center"}}><Text style={styles.title}>Set Up Location</Text>
            <Text style={{fontSize:12, color:"grey"}}>Hold and drag the marker</Text>
        </View>
            <TouchableOpacity onPress={handleLocation}><Text style={{color:"#8C57BA", textDecorationLine: "underline"}}>Current Location</Text></TouchableOpacity>
            {latitude && longitude && 
            <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude:  latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}}>
                <Marker coordinate={{latitude: latitude,
                longitude:longitude}}
                pinColor='red'
                draggable={true}
                onDragEnd={(e)=>{
                setLatitude( e.nativeEvent.coordinate.latitude)
                setLongitude( e.nativeEvent.coordinate.longitude)
                }}>
                </Marker>
            </MapView>}
        <TouchableOpacity style={[styles.saveBtn, styles.button]} onPress={handleNext} ><Text style={{color: 'white'}}>Next</Text></TouchableOpacity>
    </View>
             
  )
}
export default SetUpMap