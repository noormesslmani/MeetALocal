import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native'
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
import ProfileCard from '../../components/Cards/ProfileCard';
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
        <TouchableOpacity onPress={()=>setImageView(true)}><Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={ProfileStyles.profilePicture} /></TouchableOpacity>
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <AppButton handlePress={handleEdit} text={'Edit profile'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom:100, marginTop:20}} >
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500", fontSize:16}}>Perosnal Information</Text>
          <ProfileCard icon={'birthday-cake'} data={user.date_of_birth} />
          <ProfileCard icon={'phone'} data={user.phone} />
          <ProfileCard icon={'envelope'} data={user.email}/>
          <ProfileCard icon={'flag'} data={user.nationality}/>
          <ProfileCard icon={'map-pin'} data={user.residence} />
        </View>
        {user.about && <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500", fontSize:16}}>About me</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>}
        {ImageView && image &&  
          <ImageView
          images={[{uri:`${address}/${image}`}]}
          imageIndex={0}
          visible={imageView}
          onRequestClose={() => setImageView(false)}/>}
          <Pressable onPress={handleLogout} style={ProfileStyles.logOutContainer}><Text style={ProfileStyles.logOut} >Log Out</Text></Pressable>
        </ScrollView>
    </View>
    
  )
}
export default ForeignerProfile