import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import LocalsMapStyles from './Styles/LocalMapsStyles';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../App'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome'
import Map from '../../components/map/Map';
const LocalsMap=({navigation})=> {
    const route = useRoute();
    const [location, setLocation] = useState(null);
    const [lat, setLat]=useState(33.888630)
    const [lng, setLng]=useState(35.495480)
    const data= route.params.data
    const handlePress=(data,details)=>{
        setLat(details.geometry.location.lat)
        setLng(details.geometry.location.lng)
      }
    useEffect(()=>{
        if(data.length==1){
        setLat(data[0].latitude)
        setLng(data[0].longitude)
      }},[])
      
  return (
            <View style={LocalsMapStyles.mapContainer}>
                <Map data={data} lat={lat} lng={lng} type={1} />
                <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    query={{
                    key: 'AIzaSyCoxD1F6k0dnxHoKGbCpjYo-O23mkBBvts',
                    language: 'en', // language of the results
                    }}
                    fetchDetails={true}
                    onPress={(data,details ) => handlePress(data,details)}
                    onFail={(error) => console.error(error)}
                    requestUrl={{
                    url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                    }} 
                />
                </View>
            </View>
  )
}
export default LocalsMap
const styles = StyleSheet.create({
    container: {
        width:"100%",
      padding: 10,
      backgroundColor: '#ecf0f1',
      position:"absolute"
    },
  });