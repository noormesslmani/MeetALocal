import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import { address } from '../../constants/address';
import AppButton from '../../components/Buttons/AppButtons';
import WavyBack from '../../components/General/WavyBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileCard from '../../components/Cards/ProfileCard';
import ImageViewer from '../../components/General/ImageView';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null);
  const [imageView, setImageView]=useState(false);
 
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture);
    }
  },[user.profile_picture]);
  
  
  const handleEdit=()=>{
    navigation.navigate('edit-foreigner-profile');
  }


  //clear async storage and reset navigation
  const handleLogout=async()=>{
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "auth" }],
    });
    navigation.navigate("auth");
  }
  return (
    <View style={ProfileStyles.container}>
        <WavyBack/>
        <TouchableOpacity onPress={()=>setImageView(true)}><Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={ProfileStyles.profilePicture} /></TouchableOpacity>
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <AppButton handlePress={handleEdit} text={'Edit profile'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom:100, marginTop:20}} >
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500", fontSize:16}}>Perosnal Info</Text>
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
        {image &&  
        <ImageViewer images={[{uri:`${address}/${image}`}]}
        imageView={imageView}
        setImageView={setImageView}/>}
          <Pressable onPress={handleLogout} style={ProfileStyles.logOutContainer}><Text style={ProfileStyles.logOut} >Log Out</Text></Pressable>
        </ScrollView>
    </View>
    
  )
}
export default ForeignerProfile