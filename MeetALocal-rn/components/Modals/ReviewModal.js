import { View, Text, TouchableOpacity, Image, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import AppButton from '../Buttons/AppButtons';
import { addReview } from '../../network/App';
import { colors } from '../../constants/colors';
import { sendNotification, Notify } from '../../Notifications/Notifications';
import ReviewModalStyle from './Styles/ReviewModalStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ReviewModal=({setModalVisible, modalVisible, id,setReviewAdded })=> {
    const [review, setReview]=useState(null)
    const [rating,setRating]=useState(3)
    const [isLoading, setIsLoading]=useState(false)

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(()=>{
      Notify(setExpoPushToken, setNotification, notificationListener, responseListener)
    },[])

    const handleSubmit=()=>{
      addNewReview()
    }
    const handleDiscard=()=>{
      setModalVisible(false)
      setReview(null)
  }
    const addNewReview=async()=>{
      const data={
        local_id:id,
        review,
        stars: parseInt(rating)
      }
      console.log(data)
      setIsLoading(true)
      const result = await addReview(data)
      if (result.success){
        setIsLoading(false)
        setReviewAdded(true)
        const token = await AsyncStorage.getItem('@expoToken')
        sendNotification(token,'Meet A Local','Review successfully Added')
        setModalVisible(false)
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
        <View style={ReviewModalStyle.centeredView}>
        <View style={ReviewModalStyle.modalView}>
          <Text style={ReviewModalStyle.title}>Add a review</Text>  
          <Rating size={35} startingValue={3} imageSize={35} 
          style={ReviewModalStyle.stars} 
          onFinishRating={(rating)=>setRating(rating)}/>
          <View style={ReviewModalStyle.textContainer}>
            <Text>Text review:</Text>
            <TextInput placeholder='Enter a review' style={ReviewModalStyle.input} value={review} onChangeText={setReview}></TextInput>
          </View> 
          {isLoading && <ActivityIndicator color={colors.violet} />}
            <View style={ReviewModalStyle.btnContainer}>
                <AppButton text='Submit' handlePress={handleSubmit} />
                <AppButton text='Cancel' handlePress={handleDiscard} />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default ReviewModal