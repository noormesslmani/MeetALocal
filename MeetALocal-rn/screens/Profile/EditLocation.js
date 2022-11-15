import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import BackArrow from '../../components/Header/BackArrow';
import * as Location from 'expo-location';
import Map from '../../components/map/Map';
import { useRoute } from '@react-navigation/native';
import { widths } from '../../constants/dimensions';
import { UserContext } from '../../App'
import { colors } from '../../constants/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
const EditLocation=({navigation})=> {
    const route = useRoute();
    const [lat, setLat]=useState(route.params.lat)
    const [lng, setLng]=useState(route.params.lng)
    const [newLat, setNewLat]= useState(route.params.lat)
    const [newlng, setNewlng]= useState(route.params.lng)
    const { user, setUser} = useContext(UserContext);

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
      });
    }, [navigation]);


    const handleDrag=(e)=>{
      setNewLat( e.nativeEvent.coordinate.latitude)
      setNewlng( e.nativeEvent.coordinate.longitude)
    }
    const handleSave=async()=>{
        await AsyncStorage.setItem('lat', newLat.toString())
        await AsyncStorage.setItem('lng', newlng.toString())
    }
   
  return (

    <View style={styles.mapContainer}>
      <Text style={{fontSize:12, color:"grey"}}>Hold and drag the marker</Text>
      <Map lat={lat} lng={lng} type={2} handleDrag={handleDrag} />
      <TouchableOpacity style={[styles.saveBtn, styles.button]} onPress={handleSave} ><Text style={{color: 'white', fontSize:16, fontWeight:"700"}}>Save</Text></TouchableOpacity>
    </View>
             
  )
}
export default EditLocation

const styles=StyleSheet.create({
    mapContainer:{
        width:widths.width,
        height:"100%",
        alignItems:"center",
        backgroundColor:"white",
        flex:1,
        paddingTop:20,
        justifyContent:"space-between"
      },
      saveBtn:{
        position:"absolute",
        bottom:10,
        width:100,
        height: 45,
        borderRadius: 10,
        backgroundColor: colors.mediumViolet,
        alignItems: "center",
        justifyContent: "center",
      },
})