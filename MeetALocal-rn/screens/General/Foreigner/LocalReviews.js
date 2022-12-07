import { View, Text, ScrollView,  ActivityIndicator } from 'react-native';
import React from 'react';
import { UserContext } from '../../../context/UserContext';
import { useState, useEffect, useContext } from "react";
import { useRoute } from '@react-navigation/native';
import { Rating, } from 'react-native-ratings';
import { checkReviewed} from '../../../network/App';
import ReviewModal from '../../../components/Modals/ReviewModal';
import { colors } from '../../../constants/colors';
import ReviewCard from '../../../components/Cards/ReviewerCrad';
import ReviewStyles from '../Styles/ReviewsStyles';
import WideButton from '../../../components/Buttons/wideButtons';
import { EventsContext } from '../../../context/EventsContext';
import WavyBack from '../../../components/General/WavyBackground';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
const Reviews=({navigation})=>{
    //Screen accessible to foreingers only

    //route parameters
    const route = useRoute();
    const id=route.params.id;
    const[average, setAverage]=useState(route.params.average);

    const [reviewModalVisible, setReviewModalVisible]=useState(false);

    const [isReviewed, setIsReviewed]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [reviewAdded, setReviewAdded]=useState(false);
    const [reviewDeleted, setReviewDeleted]=useState(false)

    const { user, setUser} = useContext(UserContext);
    const { reviews, setReviews} = useContext(EventsContext);
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
        
    //getting new average after addition or deletion of review
    useEffect(()=>{
        let newAvg=0;
        if(reviews.length>0){
            for(let review of reviews){
                newAvg+=review.stars;
            }
            setAverage(newAvg/(reviews.length));
        }
        else setAverage(0)
    },[reviews]); 

    useEffect(()=>{
        if(reviewAdded){
            setIsReviewed(true);
            setReviewAdded(false);
            showMessage(
                {
                message: "Review successfully added",
                type: "success",
                }
            );
        }
        if(reviewDeleted){
            setIsReviewed(false);
            setReviewDeleted(false);
            showMessage(
                {
                message: "Review deleted",
                type: "success",
                }
            );

        }
    },[reviewAdded, reviewDeleted])
    
    return (
        <View style={ReviewStyles.container}>
            <FlashMessage position="top" />
            <WavyBack/>
            <View style={ReviewStyles.averageContainer}>
                <Text style={ReviewStyles.averageText}>{average}/5</Text>
                <Rating size={40} startingValue={average} imageSize={40} readonly />
                <Text style={ReviewStyles.reviewsNb}>Based on {reviews.length} reviews</Text>
            </View>
            
            {isReviewed && user.type_id==2 && !isLoading?<WideButton text='Reviewed' icon='star-o' color={colors.gold} handlePress={null} />:user.type_id==2 && !isLoading?<WideButton text='Add Review' icon='star' color={colors.gold} handlePress={()=>setReviewModalVisible(true)} />: null}
            <Text style={{color:'grey'}}>Reviews</Text>
            <View style={ReviewStyles.separator} />
            {isLoading && <ActivityIndicator  color={colors.violet} /> }
            {user.type_id==2 && <ReviewModal modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible} id={id} setReviewAdded={setReviewAdded} />}
            <ScrollView>
                {reviews.length>0 && reviews.map((review, index)=><ReviewCard review={review} key={index} id={id} setReviewDeleted={setReviewDeleted} />)}
            </ScrollView>
        </View>
    )
}
export default Reviews