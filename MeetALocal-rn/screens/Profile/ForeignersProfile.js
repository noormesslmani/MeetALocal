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
import Ionicons from 'react-native-vector-icons/Ionicons'
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [base64, setBase64]= useState(null);
  const [ext, setext]= useState(null)
  const [image, setImage]= useState(null)
  const [modalVisible, setModalVisible]= useState(false)
  useEffect(()=>{
    if(user.profile_picture){
      setBase64(user.base64)
      setext(user.profile_picture.split('.').pop())
      setImage(user.profile_picture)
    }
  },[])
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
    if (!_image.cancelled) {
        setImage(_image.uri)
        setBase64(_image.base64)
        setext(image.split('.').pop())
        setImageChange(true)
      }
    }
    const handleImage=()=>{
      setModalVisible(true)
    }
 
  return (
    <View style={ProfileStyles.container}>
        <TouchableOpacity style={ProfileStyles.imgContainer} onPress={handleImage}>
          <Image source={image?{ uri:`data:image/${image.split('.').pop()};base64,${base64}`}: require('../../assets/blank-profile.webp')} style={{ width: 200, height: 200 }} />
        </TouchableOpacity>
        <ImageModal modalVisible={modalVisible} setModalVisible={setModalVisible} base64={base64} setBase64={setBase64} ext={ext} setext={setext} image={image} setImage={setImage} />
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500"}}>Perosnal Information</Text>
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
    </View>
    
  )
}
export default ForeignerProfile