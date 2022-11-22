import { View, Text, TouchableOpacity, Image, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import { useRoute } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getReviews } from '../../network/App';
import { checkReviewed, addReview, deleteReview } from '../../network/App';
import ReviewModal from '../../components/Modals/ReviewModal';
import { colors } from '../../constants/colors';
import BackArrow from '../../components/Header/BackArrow';
import ReviewCard from '../../components/Cards/ReviewerCrad';
import ReviewStyles from './Styles/ReviewsStyles';
import WideButton from '../../components/Buttons/wideButtons';

const Reviews=({navigation})=>{
    const route = useRoute();
    const id=route.params.id
    const[reviews, setReviews]=useState(route.params.reviews)
    const[average, setAverage]=useState(route.params.average)
    const [reviewModalVisible, setReviewModalVisible]=useState(false)
    const [reviewAdded, setReviewAdded]=useState(false)
    const [isReviewed, setIsReviewed]=useState(false)
    const [reviewDeleted, setReviewDeleted]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    //Screen accessible to foreingers only
    
    //check if local is reviewed
    useEffect(()=>{
        reviewed()
    },[])
    useEffect(()=>{
        if(reviewAdded){
            getAllReviews()
            setIsReviewed(true)
        }
    },[reviewAdded])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<BackArrow type={1} />),
            headerBackVisible:false, headerTitle:"Reviews", headerTitleAlign:"center",
            headerShadowVisible:false,
        });
      }, [navigation]);
        
    //getting new average after review submission
    useEffect(()=>{
        let newAvg=0
        if(reviewAdded || reviewDeleted ){
            for(let review of reviews){
                newAvg+=review.stars
            }
            setAverage(newAvg/(reviews.length))
            setReviewAdded(false)
           setReviewDeleted(false)
        }
    },[reviews])
   
    const reviewed=async()=>{
        const result = await checkReviewed(id)
        if (result.success){
            
          setIsReviewed(result.data.data)
        }
    } 
    const getAllReviews=async()=>{
        setIsLoading(true)
        const result = await getReviews(id)
        if (result.success){
          setReviews(result.data.data)
          console.log(result.data.data)
        }
        setIsLoading(false)
    }

    const hanldeDelete=async ()=>{
        const data={
            local_id: id
        }
        setIsLoading(true)
        const result = await deleteReview(data)
        if (result.success){
            getAllReviews()
            setReviewDeleted(true)
        }
        setIsLoading(false)
    }
    console.log(reviews)
    return (
        <View style={ReviewStyles.container}>
            <View style={ReviewStyles.averageContainer}>
                <Text style={ReviewStyles.averageText}>{average}/5</Text>
                <Rating size={40} startingValue={average} imageSize={40} readonly />
                <Text style={ReviewStyles.reviewsNb}>Based on {reviews.length} reviews</Text>
            </View>
            
            {isReviewed && user.type_id==2?<WideButton text='Reviewed' icon='star-o' color={colors.gold} handlePress={null} />:user.type_id==2?<WideButton text='Add Review' icon='star' color={colors.gold} handlePress={()=>setReviewModalVisible(true)} />: null}
            <Text>Reviews</Text>
            <View style={ReviewStyles.separator} />
            {isLoading && <ActivityIndicator  color={colors.violet} /> }
            {reviewModalVisible && user.type_id==2 && <ReviewModal modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible} id={id} setReviewAdded={setReviewAdded}  />}
            <ScrollView>
                {reviews.map((review, index)=><ReviewCard review={review} key={index} hanldeDelete={hanldeDelete} />)}
            </ScrollView>
        </View>
    )
}
export default Reviews