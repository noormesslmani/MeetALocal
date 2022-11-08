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

const LocalsMap=({navigation})=> {
    const route = useRoute();
    const [location, setLocation] = useState(null);
    const [lat, setLat]=useState(33.888630)
    const [lng, setLng]=useState(35.495480)
    const data= route.params.data
    const handlePress=(data,details)=>{
        console.log('hi')
        setLat(details.geometry.location.lat)
        setLng(details.geometry.location.lng)
      }
      console.log(lat)
      console.log(lng)
  return (
            <View style={LocalsMapStyles.mapContainer}>
                <MapView
                region= {{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,

                }}
                style={LocalsMapStyles.map}
                loadingEnabled={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                maxZoomLevel={15}
                >
                {data.map((local) => (
                <Marker
                key={local.id}
                coordinate={{latitude: local.latitude, longitude: local.longitude}}
                pinColor='red'
                >
                <Callout style={{width:80, height:"auto"}}>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>Name:</Text> {local.name}</Text>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>Gender:</Text> {local.gender}</Text>
                    <Text style={{fontSize:7}}> <Text style={{fontWeight:"600"}}>About:</Text> {local.about}</Text>
                </Callout>
                </Marker>
                ))}   
                </MapView>
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
                    }} // this in only required for use on the web. See https://git.io/JflFv more for details.
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