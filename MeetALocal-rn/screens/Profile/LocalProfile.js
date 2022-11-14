import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import WavyBackground from "react-native-wavy-background";
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
 
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])

    const handleEdit=()=>{
      navigation.navigate('edit-local-profile')
    }
  return (
    <View style={ProfileStyles.container}>
        <View
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
          }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={30}
            frequency={1}
            offset={70}
            color= {colors.lighterViolet}
            top
          />
        </View>
        <Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 200, height: 200, borderRadius:100, marginTop:20 }} />
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <TouchableOpacity onPress={handleEdit}><Icon name="pencil" size={18} color='grey' /></TouchableOpacity>
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500"}}>Perosnal Information</Text>
          <View style={ProfileStyles.separator}/>
          <View style={{flexDirection:"row",margin:5}}><Icon name="phone" size={20} color="rgba(75, 176, 249, 0.75)" />
          <Text style={{marginLeft:5}}>{user.phone}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Icon name="calendar" size={20} color="rgba(75, 176, 249, 0.75)" />
          <Text style={{marginLeft:5}}>{user.date_of_birth}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Ionicons name="location-sharp" size={20} color="rgba(75, 176, 249, 0.75)" />
          <Text style={{marginLeft:5}}>{user.residence}</Text></View>
        </View>
        <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>About</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>
    </View>
    
  )
}
export default ForeignerProfile