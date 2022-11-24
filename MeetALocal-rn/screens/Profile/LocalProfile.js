import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import ImageView from "react-native-image-viewing";
import AppButton from '../../components/Buttons/AppButtons';
import { categoryIcons } from '../../constants/categories';
import ImagesSlider from '../../components/General/Carousel';
import WavyBack from '../../components/General/WavyBackground';
import { getReviews } from '../../network/App';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReviewCard from '../../components/Cards/ReviewerCrad';
import { Button} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HighlightsModal from '../../components/Modals/HighlightsModal';
import ProfileCard from '../../components/Cards/ProfileCard';
// import { SliderBox } from "react-native-image-slider-box";
const LocalProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  const [imageView, setImageView]=useState(false)
  const [average, setAverage]= useState(null)
  const [reviews, setReviews]=useState([])
  const [stars, setStars]=useState([])
  const [modalVisible, setModalVisible]= useState(false)
  const [viewInfo, setViewInfo]=useState(true)
  const images = user.highlights.map((image)=>({img: `${address}/${image}`}))
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])

  //get all reviews to be displayed when viewInfo is set to false
  useEffect(()=>{
    getAllReviews()
  },[])

  //finding the average
  useEffect(()=>{
    let starsArr=[0,0,0,0,0]
    for(let review of reviews){
      starsArr[review.stars -1] +=1
    }
    setStars(starsArr)
  },[reviews])

  useEffect(()=>{
    if(stars.length>0){
    reviews.length>0?setAverage((stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/(stars[0]+stars[1]+stars[2]+stars[3]+stars[4])):setAverage(0)
    }
  },[stars])

  const getAllReviews=async()=>{
    const result = await getReviews(user.id)
    if (result.success){
      setReviews(result.data.data)
    }
  }

  const handleEdit=()=>{
    navigation.navigate('edit-local-profile')
  }

  const handleLogout=async()=>{
    await AsyncStorage.clear();
    navigation.navigate("auth")
  }
  return (
    <View style={ProfileStyles.container}>

        <WavyBack/>
        <TouchableOpacity onPress={()=>setImageView(true)}><Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 200, height: 200, borderRadius:100, marginTop:20 }} /></TouchableOpacity>
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <AppButton handlePress={handleEdit} text={'Edit profile'} />
      
        <ScrollView showsVerticalScrollIndicator={false} style={ProfileStyles.scrollView} >
        
        <View style={ProfileStyles.view}>
            <AppButton text='Info' handlePress={()=>setViewInfo(true)} type={viewInfo?1:2} />
            <AppButton text='Reviews' handlePress={()=>setViewInfo(false)} type={viewInfo?2:1} />
        </View>
        <View style={ProfileStyles.separator}/>

        {viewInfo && <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500", fontSize:16}}>Perosnal Info</Text>
          <ProfileCard icon={'birthday-cake'} data={user.date_of_birth} />
          <ProfileCard icon={'user'} data={user.gender}/>
          <ProfileCard icon={'phone'} data={user.phone} />
          <ProfileCard icon={'envelope'} data={user.email}/>
          <ProfileCard icon={'flag'} data={user.nationality}/>
          <ProfileCard icon={'language'} data={user.languages} />
        </View>}
        
        {user.about && viewInfo && <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500", fontSize:16}}>About me</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>}

        {ImageView && image &&  
          <ImageView
          images={[{uri:`${address}/${image}`}]}
          imageIndex={0}
          visible={imageView}
          onRequestClose={() => setImageView(false)}/>}

        {viewInfo && <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500", fontSize:16}}>Categories</Text>
            <View style={{flexDirection:"row"}} >
            {user.categories.map((category, index)=>
              <Button key={index} compact uppercase={false} labelStyle={{ color: 'black' }} style={ProfileStyles.categoryBtn} icon={()=><Image source={categoryIcons[category]} style={{width:25, height:25}} />} mode="contained" >
                {category}
              </Button>
            )}
            </View>
        </View>}

          
         {viewInfo && <View style={{marginTop:40}}>
            <View style={ProfileStyles.highlightsContainer}>
              <Text style={{fontWeight:"500"}}>Highlights</Text>
              <Pressable onPress={()=>setModalVisible(true)} ><Icon name='pencil' size={20} color={colors.violet} /></Pressable>
            </View>
            <View style={ProfileStyles.separator}/>
            
            {user.highlights.length>0 && <View style={ProfileStyles.imageSlider}>
              <ImagesSlider images={images} />
            </View>}
          </View>}

        
          {!viewInfo && average!=null && <View style={ProfileStyles.averageContainer}>
            <Text style={ProfileStyles.averageText}>{average}/5</Text>
            <Rating size={40} startingValue={average} imageSize={40} readonly />
            <Text style={ProfileStyles.reviewsNb}>Based on {reviews.length} reviews</Text>
          </View>}

          {!viewInfo && <View style={ProfileStyles.reviewsTitle}>
            <Text>Reviews</Text>
            <View style={ProfileStyles.separator}/>
            </View>}  

          {!viewInfo &&  reviews.map((review, index)=><ReviewCard  key={index} review={review} />)} 
          {!viewInfo &&  reviews.length==0 && <Text style={ProfileStyles.noReviews}>No reviews yet</Text> }     

          {viewInfo && <Pressable onPress={handleLogout} style={ProfileStyles.logOutContainer}><Text style={ProfileStyles.logOut} >Log Out</Text></Pressable>}
          {modalVisible && <HighlightsModal setModalVisible={setModalVisible} modalVisible={modalVisible} highlights={user.highlights} /> }
        </ScrollView>
    </View>
    
  )
}
export default LocalProfile