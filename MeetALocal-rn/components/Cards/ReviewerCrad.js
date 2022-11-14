import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { address } from '../../constants/address';
import ReviewStyles from '../ComponentsStyles/ReviewCardStyles';
import { Rating, AirbnbRating } from 'react-native-ratings';
const ReviewCard=({review})=> {

  return (<View style={ReviewStyles.cotainer}>
            <View style={ReviewStyles.imageContianer}>
                <Image style={ReviewStyles.image} source={review.profile_picture?{ uri:`${address}/${review.profile_picture}`}: require('../../assets/blank-profile.webp')}/>
                <Text style={ReviewStyles.name}>{review.name}</Text>
                <Rating size={10} startingValue={review.stars} readonly= {true}  imageSize={10}/>
            </View>
            <Text style={ReviewStyles.review}>{review.review}</Text>
            {/* <View style={ReviewStyles.separator}></View> */}
            
        </View>
  )
}
export default ReviewCard