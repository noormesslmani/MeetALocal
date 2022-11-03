import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalStyles from '../ComponentsStyles/FilterModalStyles';
import ImageModalStyles from '../ComponentsStyles/ImageModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const ImageModal=({modalVisible, setModalVisible, base64, setBase64, ext, setext, image, setImage})=> {
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
                <Image source={image?{ uri:`data:image/${image.split('.').pop()};base64,${base64}`}: require('../../assets/blank-profile.webp')} style={{ width: 250, height: 250 }} />
                <View style={ImageModalStyles.uploadBtnContainer}>
                  <TouchableOpacity onPress={addImage} style={ImageModalStyles.uploadBtn} >
                      <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                      <AntDesign name="camera" size={20} color="black" />
                  </TouchableOpacity>
                </View>
            </View> 
          </View>
        </View>
    </Modal>
  )
}
export default ImageModal