import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import AppButton from '../../components/Buttons/AppButtons';
import ImageView from "react-native-image-viewing";
import WavyBack from '../../components/General/WavyBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  const [imageView, setImageView]=useState(false)
 
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])
  
    const handleEdit=()=>{
      navigation.navigate('edit-foreigner-profile')
    }

    const handleLogout=async()=>{
      await AsyncStorage.clear();
      navigation.navigate("auth")
    }
  return (
    <View style={ProfileStyles.container}>
        <WavyBack/>
        <TouchableOpacity onPress={()=>setImageView(true)}><Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 180, height: 180, borderRadius:90, marginTop:20 }} /></TouchableOpacity>
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
        {ImageView && image &&  
          <ImageView
          images={[{uri:`${address}/${image}`}]}
          imageIndex={0}
          visible={imageView}
          onRequestClose={() => setImageView(false)}/>}
          <Pressable onPress={handleLogout} style={ProfileStyles.logOutContainer}><Text style={ProfileStyles.logOut} >Log Out</Text></Pressable>
    </View>
    
  )
}
export default ForeignerProfile