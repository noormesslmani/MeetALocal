import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImageModal from '../../components/Home/ImageModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditModal from '../../components/Foreigners/EditProfileModal';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  const [modalVisible, setModalVisible]= useState(false)
  const [editModal, setEditModal]= useState(false)
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])
    const handleImage=()=>{
      setModalVisible(true)
    }

  return (
    <View style={ProfileStyles.container}>
        <TouchableOpacity style={ProfileStyles.imgContainer} onPress={handleImage}>
          <Image source={image?{ uri:`http://192.168.1.7:8000/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 200, height: 200 }} />
        </TouchableOpacity>
        <ImageModal modalVisible={modalVisible} setModalVisible={setModalVisible} image={image} setImage={setImage} />
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <View style={{marginTop:20}}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}><Text style={{fontWeight:"500"}}>Perosnal Information</Text><TouchableOpacity onPress={()=>setEditModal(true)}><Icon name="pencil" size={20} color='grey' /></TouchableOpacity></View>
          <View style={ProfileStyles.separator}/>
          <View style={{flexDirection:"row",margin:5}}><Icon name="phone" size={20} color='grey' />
          <Text style={{marginLeft:5}}>{user.phone}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Icon name="calendar" size={20} color='grey' />
          <Text style={{marginLeft:5}}>{user.date_of_birth}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Ionicons name="location-sharp" size={20} color='grey' />
          <Text style={{marginLeft:5}}>{user.residence}</Text></View>
        </View>
        <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>About</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>
        <EditModal modalVisible={editModal} setModalVisible={setEditModal}/>
    </View>
    
  )
}
export default ForeignerProfile