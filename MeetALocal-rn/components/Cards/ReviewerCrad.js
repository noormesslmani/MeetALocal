import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { address } from '../../constants/address';
import { Rating} from 'react-native-ratings';
import ReviewerCardStyle from './Styles/ReviewerCardStyle';
const ReviewCard=({review})=> {

  return (<View style={ReviewerCardStyle.cotainer}>
            <View style={ReviewerCardStyle.imageContianer}>
                <Image style={ReviewerCardStyle.image} source={review.profile_picture?{ uri:`${address}/${review.profile_picture}`}: require('../../assets/blank-profile.webp')}/>
                <Text style={ReviewerCardStyle.name}>{review.name}</Text>
                <Rating size={10} startingValue={review.stars} readonly= {true}  imageSize={10}/>
            </View>
            <Text style={ReviewerCardStyle.review}>{review.review}</Text>
            {/* <View style={ReviewStyles.separator}></View> */}
            
        </View>
  )
}
export default ReviewCard