import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet} from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
const Map=({lat, lng, data, type, handleDrag})=> {
      
  return (
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
                maxZoomLevel={15}
                >
                
                {type==1 && data.map((local) => (
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
                {type==2 && 
                <Marker coordinate={{latitude: lat,
                longitude:lng}}
                pinColor='blue'
                draggable={true}
                onDragEnd={handleDrag}>
                </Marker>} 
                </MapView>
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

  
