import { View, Text, ScrollView,  ActivityIndicator } from 'react-native';
import React from 'react';
import { UserContext } from '../../context/UserContext';
import { useState, useEffect, useContext } from "react";
import { useRoute } from '@react-navigation/native';
import { Rating, } from 'react-native-ratings';
import { getReviews } from '../../network/App';
import { checkReviewed,  deleteReview } from '../../network/App';
import ReviewModal from '../../components/Modals/ReviewModal';
import { colors } from '../../constants/colors';
import ReviewCard from '../../components/Cards/ReviewerCrad';
import ReviewStyles from './Styles/ReviewsStyles';
import WideButton from '../../components/Buttons/wideButtons';

const Reviews=({navigation})=>{
    //Screen accessible to foreingers only

    //route parameters
    const route = useRoute();
    const id=route.params.id;
    const[reviews, setReviews]=useState(route.params.reviews);
    const[average, setAverage]=useState(route.params.average);

    const [reviewModalVisible, setReviewModalVisible]=useState(false);

    const [reviewAdded, setReviewAdded]=useState(false);
    const [isReviewed, setIsReviewed]=useState(false);
    const [reviewDeleted, setReviewDeleted]=useState(false);

    const [isLoading, setIsLoading]=useState(false);

    const { user, setUser} = useContext(UserContext);

    //check if local is reviewed or not
    useEffect(()=>{
        reviewed();
    },[])
    const reviewed=async()=>{
        const result = await checkReviewed(id);
        if (result.success){ 
          setIsReviewed(result.data.data);
        }
    } 

    useEffect(()=>{
        if(reviewAdded){
            getAllReviews();
            setIsReviewed(true);
        }
    },[reviewAdded]);
        
    //getting new average after addition or deletion of review
    useEffect(()=>{
        let newAvg=0;
        if(reviewAdded || reviewDeleted ){
            for(let review of reviews){
                newAvg+=review.stars;
            }
            reviews.length>0?setAverage(newAvg/(reviews.length)): setAverage(0);
            setReviewAdded(false);
            setReviewDeleted(false);
        }
    },[reviews]);
   
  
    const getAllReviews=async()=>{
        setIsLoading(true);
        const result = await getReviews(id);
        if (result.success){
          setReviews(result.data.data);
        }
        setIsLoading(false);
    }

    //handle the deletion of a review
    const hanldeDelete=async ()=>{
        setIsLoading(true);
        const result = await deleteReview({local_id: id});
        if (result.success){
            getAllReviews();
            setReviewDeleted(true);
        }
        setIsLoading(false);
    }
  
    return (
        <View style={ReviewStyles.container}>
            <View style={ReviewStyles.averageContainer}>
                <Text style={ReviewStyles.averageText}>{average}/5</Text>
                <Rating size={40} startingValue={average} imageSize={40} readonly />
                <Text style={ReviewStyles.reviewsNb}>Based on {reviews.length} reviews</Text>
            </View>
            
            {isReviewed && user.type_id==2 && !isLoading?<WideButton text='Reviewed' icon='star-o' color={colors.gold} handlePress={null} />:user.type_id==2 && !isLoading?<WideButton text='Add Review' icon='star' color={colors.gold} handlePress={()=>setReviewModalVisible(true)} />: null}
            <Text>Reviews</Text>
            <View style={ReviewStyles.separator} />
            {isLoading && <ActivityIndicator  color={colors.violet} /> }
            {reviewModalVisible && user.type_id==2 && <ReviewModal modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible} id={id} setReviewAdded={setReviewAdded}  />}
            <ScrollView>
                {reviews.length>0 && reviews.map((review, index)=><ReviewCard review={review} key={index} hanldeDelete={hanldeDelete} />)}
            </ScrollView>
        </View>
    )
}
export default Reviews