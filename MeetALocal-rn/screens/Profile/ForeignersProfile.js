import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HomeStyles from '../General/Styles/HomeStyles';
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import UploadImage from '../../components/UploadImage';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImageModal from '../../components/Home/ImageModal';
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
        {/* <View style={ProfileStyles.imgContainer}>
            <Image source={image?{ uri:`data:image/${image.split('.').pop()};base64,${base64}`}: require('../../assets/blank-profile.webp')} style={{ width: 250, height: 250 }} />
            <View style={ProfileStyles.uploadBtnContainer}>
              {!imageChange &&<TouchableOpacity onPress={addImage} style={ProfileStyles.uploadBtn} >
                  <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                  <AntDesign name="camera" size={20} color="black" />
              </TouchableOpacity>}
              {imageChange &&<View  style={ProfileStyles.uploadBtn} >
                  <TouchableOpacity><Text>Save changes</Text></TouchableOpacity>
              </View>}
            </View>
        </View> */}
        <TouchableOpacity style={ProfileStyles.imgContainer} onPress={handleImage}>
          <Image source={image?{ uri:`data:image/${image.split('.').pop()};base64,${base64}`}: require('../../assets/blank-profile.webp')} style={{ width: 250, height: 250 }} />
        </TouchableOpacity>
          <ImageModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  )
}
export default ForeignerProfile