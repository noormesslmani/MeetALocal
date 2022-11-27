import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { address } from '../../constants/address';
import { useContext } from "react";
import { Rating} from 'react-native-ratings';
import ReviewerCardStyle from './Styles/ReviewerCardStyle';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
const ReviewCard=({review, hanldeDelete})=> {
  //card displaying review
  const { user, setUser} = useContext(UserContext);

  return (<View style={ReviewerCardStyle.cotainer}>
            {user.id==review.reviewer_id && <Pressable onPress={hanldeDelete} style={ReviewerCardStyle.trash} ><Icon name='trash' size={20} color='grey' /></Pressable>}
            <View style={ReviewerCardStyle.imageContianer}>
                <Image style={ReviewerCardStyle.image} source={review.profile_picture?{ uri:`${address}/${review.profile_picture}`}: require('../../assets/blank-profile.webp')}/>
                <Text style={ReviewerCardStyle.name}>{user.id==review.reviewer_id? 'You': review.name}</Text>
                <Rating size={10} startingValue={review.stars} readonly= {true}  imageSize={10}/>
            </View>
            <Text style={ReviewerCardStyle.review}>{review.review}</Text>
            {/* <View style={ReviewStyles.separator}></View> */}
            
        </View>
  )
}
export default ReviewCard