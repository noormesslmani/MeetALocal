import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadImage from '../../components/UploadImage';
const EditForeignerProfile=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const [uri, setUri]= useState(null)
    const [base64, setBase64]= useState(null)
    const [ext, setext]= useState(null)
    const [modalVisible, setModalVisible]= useState(false)
    const [editModal, setEditModal]= useState(false)
    useEffect(()=>{
      if(user.profile_picture){
        setUri(`http://192.168.1.7:8000/${user.profile_picture}`)
      }
    },[user.profile_picture])
    console.log(uri)
  return (
    <View style={ProfileStyles.container}>
        <UploadImage setBase64={setBase64} setext={setext} uri={uri} />
    </View>
    
  )
}
export default EditForeignerProfile