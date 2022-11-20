import { View, Text, TouchableOpacity, Image, Modal, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import AppButton from '../Buttons/AppButtons';
import { addReview } from '../../network/App';
import { colors } from '../../constants/colors';
import ReviewModalStyle from './Styles/ReviewModalStyle';
import { TextInput } from 'react-native-paper';
const ReviewModal=({setModalVisible, modalVisible, id,setReviewAdded })=> {
    const [review, setReview]=useState(null)
    const [rating,setRating]=useState(3)
    const [isLoading, setIsLoading]=useState(false)

   

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
      setIsLoading(true)
      const result = await addReview(data)
      if (result.success){
        setIsLoading(false)
        setReviewAdded(true)
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
          <Rating size={40} startingValue={3} imageSize={40} 
          style={ReviewModalStyle.stars} 
          onFinishRating={(rating)=>setRating(rating)}/>
          <View style={ReviewModalStyle.textContainer}>
            <Text style={{fontSize:16}}>Text review:</Text>
            <TextInput placeholder='Write a review'  onChangeText={setReview} value={review} outlineColor={colors.lightGrey} activeOutlineColor={colors.lighterViolet}
             mode='outlined' multiline={true} numberOfLines={5} style={{backgroundColor:'white', marginVertical:10}} maxLength={20}  ></TextInput>

           
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