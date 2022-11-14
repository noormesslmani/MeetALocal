import { View, Text, TouchableOpacity, Image, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import ReviewModalStyles from '../ComponentsStyles/ReviewModalStyles';
import { useState, useEffect, useContext } from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import AppButton from '../Buttons/AppButtons';
import { addReview } from '../../network/App';
import { colors } from '../../constants/colors';
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
      console.log(data)
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
        <View style={ReviewModalStyles.centeredView}>
        <View style={ReviewModalStyles.modalView}>
          <Text style={ReviewModalStyles.title}>Add a review</Text>  
          <Rating size={35} startingValue={3} imageSize={35} 
          style={ReviewModalStyles.stars} 
          onFinishRating={(rating)=>setRating(rating)}/>
          <View style={ReviewModalStyles.textContainer}>
            <Text>Text review:</Text>
            <TextInput placeholder='Enter a review' style={ReviewModalStyles.input} value={review} onChangeText={setReview}></TextInput>
          </View> 
          {isLoading && <ActivityIndicator color={colors.violet} />}
            <View style={ReviewModalStyles.btnContainer}>
                <AppButton text='submit' handlePress={handleSubmit} />
                <AppButton text='discard' handlePress={handleDiscard} />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default ReviewModal