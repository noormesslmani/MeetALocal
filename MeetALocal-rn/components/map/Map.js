import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../../constants/colors';
import { WebView } from 'react-native-webview';
const Map=({lat, lng, data, type, handleDrag, navigation})=> { 

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
                maxZoomLevel={15}
                >
                {type==1 && data.map((local, index) => (
          
                <Marker
                key={local.id}
                coordinate={{latitude: local.latitude, longitude: local.longitude}}
                pinColor={colors.violet}>
                <Callout tooltip={true} onPress={()=>navigation.navigate('local-page', {item: local})}>
                  <View style={{width:160, height:50, backgroundColor:'white', borderRadius:20, padding:5, alignItems:"center"}}>
                  <Text style={{fontSize:14, fontWeight:"600", color:colors.violet}}> {local.name}</Text>
                  <Text style={{fontSize:10, fontWeight:"400", color:colors.violet}}> {local.country}</Text>
                  </View>
                </Callout>
                </Marker>
                ))
                }  
                {type==2 && 
                <Marker coordinate={{latitude: lat,
                longitude:lng}}
                pinColor='blue'
                draggable={true}
                onDragEnd={handleDrag}>
                </Marker>} 
                </MapView>
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

  
