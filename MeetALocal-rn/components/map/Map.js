import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { colors } from '../../constants/colors';
import MapCard from '../Cards/MapCard';
import MapStyle from './Styles/MapStyle';
const Map=({lat, lng, data, type, handleDrag, navigation})=> { 
  const myList = useRef()
  
  return (
          <>
            <MapView
              region= {{
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.7,
                  longitudeDelta: 0.7,
              }}
              style={[type==1  && MapStyle.map, type==2 && MapStyle.map2, type==3  && MapStyle.map]}
              loadingEnabled={true}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              maxZoomLevel={15}>

              {type==1  && data.map((local, index) => (
              <Marker
              key={index}
              coordinate={{latitude: local.latitude, longitude: local.longitude}}
              pinColor={colors.violet}
              onPress={()=> myList.current.scrollToIndex({index: index, animated: true, viewPosition:0.5 })}
              >
              </Marker>))} 

              {type==3  &&
              <Marker
              coordinate={{latitude: lat, longitude: lng}}
              pinColor={colors.violet}
              />
              } 

              {type==2 && 
              <Marker coordinate={{latitude: lat,
              longitude:lng}}
              pinColor={colors.violet}
              draggable={true}
              onDragEnd={handleDrag}>
              </Marker>} 
            </MapView>
            {type==1 && <MapCard data={data} myList={myList} navigation={navigation}/> }
          </>
  )
}
export default Map



  
