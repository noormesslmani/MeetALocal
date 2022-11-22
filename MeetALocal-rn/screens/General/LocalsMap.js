import { View, StyleSheet} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import LocalsMapStyles from './Styles/LocalMapsStyles';
import { useRoute } from '@react-navigation/native';
import Map from '../../components/map/Map';
import MapSearch from '../../components/map/MapSearch';
import BackArrow from '../../components/Header/BackArrow';
const LocalsMap=({navigation})=> {
    const route = useRoute();
    const [lat, setLat]=useState(33.888630)
    const [lng, setLng]=useState(35.495480)
    const data= route.params.data
    const type= route.params.type //3 types of maps

    //change region upon map search
    const handlePress=(data,details)=>{
        setLat(details.geometry.location.lat)
        setLng(details.geometry.location.lng)
    }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrow navigation={navigation} type={1}/>,
    });
  }, [navigation]);

  //for a single item set region according to given data, else keep initial values
  useEffect(()=>{
      if(data.length==1){
      setLat(data[0].latitude)
      setLng(data[0].longitude)
    }},[])

  return (
            <View style={LocalsMapStyles.mapContainer}>
                <Map data={data} lat={lat} lng={lng} type={type} navigation={navigation}/>
                <View style={styles.container}>
                {type!=3 && <MapSearch handlePress={handlePress} navigation={navigation}/>}
                </View>
            </View>
  )
}
export default LocalsMap
const styles = StyleSheet.create({
    container: {
      width:"90%",
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position:"absolute"
    },
  });