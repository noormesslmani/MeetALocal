import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { address } from '../../constants/address';
import { useContext } from "react";
import { Rating} from 'react-native-ratings';
import ReviewerCardStyle from './Styles/ReviewerCardStyle';
import { UserContext } from '../../context/UserContext';
import { ReviewsContext } from '../../context/ReviewsContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteReview } from '../../network/App';
const ReviewCard=({review, id})=> {
  //card displaying review
  const { user, setUser} = useContext(UserContext);
  const {reviews, setReviews}= useContext(ReviewsContext)
 
  const handleDelete=async ()=>{
    const result = await deleteReview({local_id:id});
    if (result.success){
        setReviews(reviews.filter(item=>item!=review))
    }
}
  return (<View style={ReviewerCardStyle.cotainer}>
            {user.id==review.reviewer_id && <Pressable onPress={handleDelete} style={ReviewerCardStyle.trash} ><Icon name='trash' size={20} color='grey' /></Pressable>}
            <View style={ReviewerCardStyle.imageContianer}>
                <Image style={ReviewerCardStyle.image} source={review.profile_picture?{ uri:`${address}/${review.profile_picture}`}: require('../../assets/blank-profile.webp')}/>
                <Text style={ReviewerCardStyle.name}>{user.id==review.reviewer_id? 'You': review.name}</Text>
                <Rating size={10} startingValue={review.stars} readonly= {true}  imageSize={10}/>
            </View>
            <Text style={ReviewerCardStyle.review}>{review.review}</Text>   
        </View>
  )
}
export default ReviewCard