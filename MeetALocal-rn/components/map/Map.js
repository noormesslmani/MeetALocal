import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../../constants/colors';
import Animated from "react-native-reanimated";
import MapCard from '../Cards/MapCard';
const Map=({lat, lng, data, type, handleDrag, navigation})=> { 
  const myList = useRef()
  
  return (
              <>
                <MapView
                  region= {{
                      latitude: lat,
                      longitude: lng,
                      latitudeDelta: 5,
                      longitudeDelta: 5,
                  }}
                  style={[type ==1 && styles.map, type==2 && styles.map2]}
                  loadingEnabled={true}
                  showsUserLocation={true}
                  provider={PROVIDER_GOOGLE}
                  maxZoomLevel={15}>

                  {type==1 && data.map((local, index) => (
                  <Marker
                  coordinate={{latitude: local.latitude, longitude: local.longitude}}
                  pinColor={colors.violet}
                  onPress={()=> myList.current.scrollToIndex({index: index, animated: true })}
                  >
                  </Marker>))} 

                  {type==2 && 
                  <Marker coordinate={{latitude: lat,
                  longitude:lng}}
                  pinColor='blue'
                  draggable={true}
                  onDragEnd={handleDrag}>
                  </Marker>} 
                </MapView>
                {type==1 && <MapCard data={data} myList={myList}/> }
              </>
  )
}
export default Map

const styles = StyleSheet.create({
    map:{
        alignSelf:"flex-end",
        width:"100%",
        height:"100%",
      },
    map2:{
    width:"100%",
    height:"85%",
    },
    card_scroll_view: {
      position:'absolute',
      bottom:10,
      left:10,
      right:0,
      paddingVertical:8
      },
      card_view: {
      elevation:90,
      backgroundColor:'#fff',
      borderRadius:10,
      marginHorizontal: 10,
      height: 200,
      width: 250,
      overflow: 'hidden'
      },
      card_image: {
          flex:4,
      },
      title: {
          fontSize: 20, 
          fontWeight:'bold',
      },
      country: {
          fontSize:12,
          color: colors.violet
      },
      card_inner_view: {
          borderRadius:15
      },
});

  
