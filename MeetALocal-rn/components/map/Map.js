import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { colors } from '../../constants/colors';
import MapCard from '../Cards/MapCard';
const Map=({lat, lng, data, type, handleDrag, navigation})=> { 
  const myList = useRef()
  const renderItem = ({ item, index }) => (
    <MapCard item={item}/>
  );
  
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

                {/* type 1 Markers */}
                  {type==1 && data.map((local, index) => (
                  <Marker
                  coordinate={{latitude: local.latitude, longitude: local.longitude}}
                  pinColor={colors.violet}
                  onPress={()=> myList.current.scrollToIndex({index: index, animated: true })}
                  >
                  </Marker>))}  

                {/* type 2 Markers */}
                  {type==2 && 
                  <Marker coordinate={{latitude: lat,
                  longitude:lng}}
                  pinColor='blue'
                  draggable={true}
                  onDragEnd={handleDrag}>
                  </Marker>} 
                </MapView>

                {/* list of cards for type 1 map */}
                {type==1 && 
                  <FlatList
                  horizontal
                  keyExtractor={item => item.id.toString()}
                  scrollEventThrottle={1}
                  showsHorizontalScrollIndicator={false}
                  style={styles.card_scroll_view}
                  data={data}
                  ref={myList}
                  initialScrollIndex={0}
                  renderItem={renderItem}>
                </FlatList>}
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
    
});

  
