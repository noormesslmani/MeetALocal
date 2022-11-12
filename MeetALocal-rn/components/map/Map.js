import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../../constants/colors';
import MapStyles from '../ComponentsStyles/MapStyles';
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
                  style={[type !=2  && MapStyles.map, type==2 && MapStyles.map2]}
                  loadingEnabled={true}
                  showsUserLocation={true}
                  provider={PROVIDER_GOOGLE}
                  maxZoomLevel={15}>

                  {type!=2  && data.map((local, index) => (
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
                {type==1 && <MapCard data={data} myList={myList} navigation={navigation}/> }
              </>
  )
}
export default Map



  
