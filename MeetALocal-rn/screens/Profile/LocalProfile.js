import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import ImageView from "react-native-image-viewing";
import AppButton from '../../components/Buttons/AppButtons';
import { categoryIcons } from '../../constants/categories';
import ImageCarousel from '../../components/General/Carousel';
import WavyBack from '../../components/General/WavyBackground';
import { getReviews } from '../../network/App';
import LocalProfileStyles from '../General/Styles/LocalProfileStyles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReviewCard from '../../components/Cards/ReviewerCrad';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  const [imageView, setImageView]=useState(false)
  const [reviews, setReviews]=useState([])
  const [stars, setStars]=useState([])
  const [average, setAverage]= useState(0)
  const images = user.highlights?.map((image)=>({ uri: `${address}/${image}`}))
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])

  useEffect(()=>{
    getAllReviews()
  },[])

  useEffect(()=>{
    let starsArr=[0,0,0,0,0]
    for(let review of reviews){
      starsArr[review.stars -1] +=1
    }
    setStars(starsArr)
  },[reviews])

  useEffect(()=>{
    if(stars)
    setAverage((stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/(stars[0]+stars[1]+stars[2]+stars[3]+stars[4]))
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
  return (
    <View style={ProfileStyles.container}>
      
        <WavyBack/>
        <TouchableOpacity onPress={()=>setImageView(true)}><Image source={image?{ uri:`${address}/${image}`}: require('../../assets/blank-profile.webp')} style={{ width: 200, height: 200, borderRadius:100, marginTop:20 }} /></TouchableOpacity>
        <Text style={ProfileStyles.name}>{user.name}</Text>
        <AppButton handlePress={handleEdit} text={'Edit profile'} />

        <ScrollView contentContainerStyle={{paddingBottom:300}} showsVerticalScrollIndicator={false}>
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:"500"}}>Perosnal Information</Text>
          <View style={ProfileStyles.separator}/>
          <View style={{flexDirection:"row",margin:5}}><Icon name="phone" size={20} color={colors.violet} />
          <Text style={{marginLeft:5}}>{user.phone}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Icon name="calendar" size={20} color={colors.violet} />
          <Text style={{marginLeft:5}}>{user.date_of_birth}</Text></View>
          <View style={{flexDirection:"row",margin:5}}><Ionicons name="location-sharp" size={20} color={colors.violet} />
          <Text style={{marginLeft:5}}>{user.residence}</Text></View>
        </View>
        {user.about && <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>About</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>}
        {ImageView && image &&  
          <ImageView
          images={[{uri:`${address}/${image}`}]}
          imageIndex={0}
          visible={imageView}
          onRequestClose={() => setImageView(false)}/>}

        <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>Categories</Text>
          <View style={ProfileStyles.separator}/>
          <View style={{flexDirection:"row"}}>
              {user.categories.map((category)=>
              <View style={ProfileStyles.iconContainer}>
              <Image source={categoryIcons[category]} style={ProfileStyles.categoryIcon}/>
              <Text style={{fontSize:12}}>{category}</Text>
              </View>
            )}
          </View>
          </View>

          
          {user.highlights && <View style={{marginTop:40}}>
            <Text style={{fontWeight:"500"}}>Highlights</Text>
            <View style={ProfileStyles.separator}/>
            <View style={{ flex: 1, alignSelf:"center" }}>
            <ImageCarousel images={images} />
          </View>
          </View>}

          <View style={ProfileStyles.separator}/>

          <View style={{marginTop:40}}>
            <Text style={{fontWeight:"500"}}>Reviews</Text>

            {stars.length>0 && 
            <AirbnbRating size={25} showRating showReadOnlyText={false} defaultRating={average} readonly= {true}  imageSize={25} style={{marginVertical:3, marginHorizontal:10}}/>
            }
            <Text style={{alignSelf:"center", fontSize:10}}>Based on {reviews.length} reviews</Text>
          </View>
         
          {reviews.map((review, index)=><ReviewCard review={review} key={index}/>)}
          
    
          
        </ScrollView>
    </View>
    
  )
}
export default ForeignerProfile