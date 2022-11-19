import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import LocalProfileStyles from './Styles/LocalProfileStyles';
import { categoryIcons } from '../../constants/categories';
import ImageView from "react-native-image-viewing";
import Map from '../../components/Header/Map';
import { CheckFavoriteLocals, toggleFavoriteLocals } from '../../network/App';
import { address } from '../../constants/address';
import call from 'react-native-phone-call'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getReviews } from '../../network/App';
import ReviewCard from '../../components/Cards/ReviewerCrad';
import { checkReviewed, addReview } from '../../network/App';
import ReviewModal from '../../components/Modals/ReviewModal';
import { colors } from '../../constants/colors';
import BackArrow from '../../components/Header/BackArrow';
import Carousel from 'react-native-reanimated-carousel';
import { widths } from '../../constants/dimensions';
import AppointmentsModal from '../../components/Modals/AppointmentModal';
import ImageCarousel from '../../components/General/Carousel';
const LocalPage=({navigation})=> {
  const route = useRoute();
  const item =route.params.item
  const { user, setUser, locals, setLocals} = useContext(UserContext);
  const [isFavorite, SetIsFavorite]=useState(false)
  const [likes, setLikes]= useState(item.likes)
  

  const [average, setAverage]= useState(0)
  const [reviews, setReviews]=useState([])
  const [stars, setStars]=useState([])
  const [reviewed, setReviewed]=useState(true)
  
  const [reviewModalVisible, setReviewModalVisible]=useState(false)
  const [reviewAdded, setReviewAdded]=useState(false)

  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex]= useState(0)
  const images = item.highlights?.map((image)=>({ uri: `${address}/${image}`}))


  const [appointmentModal, setAppointmentModal]=useState(false)
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <><BackArrow navigation={navigation} type={2}/>
      <Text style={LocalProfileStyles.headerText}>{item.name}</Text>
      </>,
      headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
    });
  }, [navigation]);
    
  //get reviews and check if favorited or reviewed already
  useEffect(()=>{
    if(user.type_id==2){
      checkFavorite()
      isReviewed()
    }
    setLocals([item])
    getAllReviews()
  },[])

  //after adding a review
  useEffect(()=>{
    if(reviewAdded){
      getAllReviews()
      setReviewed(true)
    }
  },[reviewAdded])

  //getting stars to find the average
  useEffect(()=>{
    let starsArr=[0,0,0,0,0]
    for(let review of reviews){
      starsArr[review.stars -1] +=1
    }
    setStars(starsArr)
  },[reviews])

  //finding the average
  useEffect(()=>{
    if(stars)
    setAverage((stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/(stars[0]+stars[1]+stars[2]+stars[3]+stars[4]))
  },[stars])

  //getting all reviews
  const getAllReviews=async()=>{
    const result = await getReviews(item.id)
    if (result.success){
      setReviews(result.data.data)
    }
  } 
  //checking if reviewed
  const isReviewed=async()=>{
    const result = await checkReviewed(item.id)
    if (result.success){
      setReviewed(result.data.data)
    }
  } 
  //navigating to chat screen
  const handleMessage=()=>{
    console.log('hi')
    navigation.navigate('chat-screen', { chatId: null, userId: item.id, image:item.profile_picture, name:item.name})
  }

  //checking if favorited
  const checkFavorite=async()=>{
    const result = await CheckFavoriteLocals(item.id)
    if (result.success){
      SetIsFavorite(result.data.data)
    }
  }

  //toggling like
  const handleLike =async()=>{
    const data={
      id:item.id
    }
    const result = await toggleFavoriteLocals(data)
    if (result.success){
      await checkFavorite()
      setLikes(result.data.data)
    }
  }
  //navigating to map
  const handleMap=()=>{
    navigation.navigate('locals-map',{data:[item], type:3})
  }

  //calling phone number
  const args = {
    number: item.phone.toString(), 
    prompt: false, 
    skipCanOpen: true 
  }
  const handlePhone=()=>{
    call(args).catch(console.error)
  }
  //booking appointments
  const handleBooking=()=>{
    console.log('hi')
    setAppointmentModal(true)
  }
 

  return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <View style={LocalProfileStyles.mainContainer}>
          <View style={LocalProfileStyles.imageContainer}>
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={LocalProfileStyles.name}>{item.name}</Text>
              <View style={{flexDirection:"row"}}><Text style={LocalProfileStyles.country}>{item.country}</Text>{item.type_id==2 && <Map handleMap={handleMap} small={true}/>}</View>
              <View style={LocalProfileStyles.likesContainer}>
                <Text style={LocalProfileStyles.likes}>{likes}</Text>
                <Icon name="heart" color={colors.violet} size={15} /> 
              </View>
            </View>
          </View>
          <View style={LocalProfileStyles.infoContainer}>
            <View>
              <Pressable style={LocalProfileStyles.phoneContainer} onPress={handlePhone}>
                <Icon name="phone" size={20} color="grey" />
                <Text style={LocalProfileStyles.phone}>{item.phone}</Text>
              </Pressable>
              <View style={LocalProfileStyles.likesContainer}>
                <Ionicons name="language" size={20} color="grey" />
                {item.languages.map((language)=><Text style={LocalProfileStyles.language} key={language}>{language}</Text>)}
              </View>
            </View>
            <View style={LocalProfileStyles.likesContainer}>
              {user.type_id==2 && <Pressable style={{marginRight:10}} onPress={handleLike}>{isFavorite?<Icon name="heart" size={25} color={colors.lightViolet} />:<Icon name="heart-o" size={25} color={colors.lightViolet} />}</Pressable>}
              <Pressable style={LocalProfileStyles.message} onPress={handleMessage}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>
          </View>
          


          {user.type_id==2? <TouchableOpacity onPress={handleBooking} style={LocalProfileStyles.bookBtn} > 
            <Icon name='calendar' size={25} style={{marginHorizontal:5}} color={colors.violet} />
            <Text style={{color:colors.violet, fontSize:18, fontWeight:'500'}} >Book</Text>
          </TouchableOpacity>:null}
          {appointmentModal && <AppointmentsModal modalVisible={appointmentModal} setModalVisible={setAppointmentModal} id={item.id} /> }


          <View style={LocalProfileStyles.separator}></View>
          
          {item.about && <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>About</Text>
            <Text style={LocalProfileStyles.about}>{item.about}</Text>
          </View>}


          <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>Categories</Text>
            <View style={{flexDirection:"row"}}>
              {item.categories.map((category)=>
              <View style={LocalProfileStyles.iconContainer}>
              <Image source={categoryIcons[category]} style={LocalProfileStyles.categoryIcon}/>
              <Text style={{fontSize:12}}>{category}</Text>
              </View>
            )}
            </View>
          </View>

     

          {images && 
          <View style={LocalProfileStyles.sectionContainer}>
          <Text style={LocalProfileStyles.sectionTitle}>Highlights</Text>
          <ImageCarousel images={images} />
          </View>}
          <ImageView
          images={images}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}/>

        <View style={LocalProfileStyles.separator}></View>

          <View style={LocalProfileStyles.sectionContainer}>
          <Text style={LocalProfileStyles.sectionTitle}>Reviews</Text>

          {stars.length>0 && 
          <AirbnbRating size={25} showRating showReadOnlyText={false} defaultRating={average} readonly= {true}  imageSize={25} style={{marginVertical:3, marginHorizontal:10}}/>
          }
          <Text style={{alignSelf:"center", fontSize:10}}>Based on {reviews.length} reviews</Text>
          </View>
          {user.type_id==2 && !reviewed && <Pressable onPress={()=>{setReviewModalVisible(true)}} ><Text style={LocalProfileStyles.addReview}>Add a review</Text></Pressable>}
          {user.type_id==2 && reviewed && <Text style={LocalProfileStyles.addReview}>Reviewed</Text>}
          {reviews && reviews.map((review, index)=><ReviewCard review={review} key={index}/>)}
          {reviewModalVisible && <ReviewModal modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible} setReviewAdded={setReviewAdded} id={item.id} />}
        </View>
    </ScrollView>
    
  )
}
export default LocalPage