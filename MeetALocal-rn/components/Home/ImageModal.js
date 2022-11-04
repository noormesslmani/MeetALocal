import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
import ImageModalStyles from '../ComponentsStyles/ImageModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../App'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const ImageModal=({modalVisible, setModalVisible, image, setImage})=> {
  const [imageChange, setImageChange]=useState(false)
  const [source, setSource]= useState('http://192.168.1.7:8000/'+image)
  const [base64, setBase64]=useState(null)
  const [ext, setext]= useState(null)
  const { user, setUser} = useContext(UserContext);
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
        setSource(_image.uri)
      }
    }
    const handleSave=()=>{
      console.log('hi')
      changePhoto()
    }
    const handleCancel=()=>{
        setImage(user.profile_picture)
        setImageChange(false)
        setModalVisible(false)
    }
    console.log(source)
    async function changePhoto(){
      const data = {
        base64: base64,
        ext: ext,
      };
      const token = await AsyncStorage.getItem('@token')
      axios({
        method: "put",
        data,
        headers: { Authorization: `Bearer ${token}`},
        url:"http://192.168.1.7:8000/api/v1.0.0/users/profile-photo",
      })
      .then(async (response)=> {
        await AsyncStorage.setItem("@user", JSON.stringify(response.data['user']));
        setUser(response.data.user)
        setImageChange(false)
        setModalVisible(false)
        return response.data;
      })
      .catch(function (error) {
        console.warn(error)
      });
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={ImageModalStyles.centeredView}>
          <View style={ImageModalStyles.modalView}>
            <View style={ImageModalStyles.imgContainer}>
                <Image source={image? { uri: source}: require('../../assets/blank-profile.webp')} style={{ width: 350, height: 350 }} />
                <View style={ImageModalStyles.uploadBtnContainer}>
                  <TouchableOpacity onPress={addImage} style={ImageModalStyles.uploadBtn} >
                      <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                      <AntDesign name="camera" size={20} color="black" />
                  </TouchableOpacity>
                </View>
            </View> 
            <View style={ImageModalStyles.btnContainer}>
            {imageChange && <TouchableOpacity style={ImageModalStyles.imageBtn} onPress={handleSave}><Text>Save</Text></TouchableOpacity>}
            <TouchableOpacity style={ImageModalStyles.imageBtn} onPress={handleCancel} ><Text>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal>
  )
}
export default ImageModal