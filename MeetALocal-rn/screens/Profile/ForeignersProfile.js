import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import WavyBackground from "react-native-wavy-background";
import AppButton from '../../components/Buttons/AppButtons';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])
  
    const handleEdit=()=>{
      navigation.navigate('edit-foreigner-profile')
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
        <Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 180, height: 180, borderRadius:90, marginTop:20 }} />
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <AppButton handlePress={handleEdit} text={'Edit profile'} />
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500"}}>Perosnal Information</Text>
          <View style={ProfileStyles.separator}/>
          <View style={{flexDirection:"row",margin:5}}><Icon name="phone" size={20} color={colors.violet} />
          <Text style={{marginLeft:5}}>{user.phone}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Icon name="calendar" size={20} color={colors.violet} />
          <Text style={{marginLeft:5}}>{user.date_of_birth}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Ionicons name="location-sharp" size={20} color={colors.violet} />
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