import { View, Text, TouchableOpacity, Image, ScrollView, Pressable, Linking } from 'react-native'
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
import ReviewModal from '../../components/Modals/ReviewModal';
import { colors } from '../../constants/colors';
import BackArrow from '../../components/Header/BackArrow';
import AppointmentsModal from '../../components/Modals/AppointmentModal';
import ImageCarousel from '../../components/General/Carousel';
import { Avatar } from 'react-native-paper';
import { Button} from 'react-native-paper';
import ProfileCard from '../../components/Cards/ProfileCard';
import WideButton from '../../components/Buttons/wideButtons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const LocalPage=({navigation})=> {
  const route = useRoute();
  const item =route.params.item
  const { user, setUser, locals, setLocals} = useContext(UserContext);
  const [isFavorite, SetIsFavorite]=useState(false)
  const [likes, setLikes]= useState(item.likes)
  

  const [average, setAverage]= useState(null)
  const [reviews, setReviews]=useState([])
  const [stars, setStars]=useState([])
  
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
    }
    setLocals([item])
    
  },[])

  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused)  
      getAllReviews()
  },[isFocused])

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
    if(stars.length>0){
    reviews.length>0?setAverage((stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/(stars[0]+stars[1]+stars[2]+stars[3]+stars[4])):setAverage(0)
    }
  },[stars])
  console.log(average)
  //getting all reviews
  const getAllReviews=async()=>{
    const result = await getReviews(item.id)
    if (result.success){
      setReviews(result.data.data)
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

  const handleWhatsapp=()=>{
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${item.phone}` 
    );
  }
  //booking appointments
  const handleBooking=()=>{
    console.log('hi')
    setAppointmentModal(true)
  }
 
  const handleReviews=()=>{
    user.type_id==2 && navigation.navigate('reviews',{average, reviews, id:item.id})
  }
  return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <View style={LocalProfileStyles.mainContainer}>

          <View style={LocalProfileStyles.imageContainer}>
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={LocalProfileStyles.name}>{item.name}</Text>
              <View style={{flexDirection:"row"}}><Text style={LocalProfileStyles.country}>{item.country} </Text>{user.type_id==2 && <Map handleMap={handleMap} small={true} />}</View>
              <View style={LocalProfileStyles.likesContainer}>
                <Text style={LocalProfileStyles.likes}>{likes}</Text>
                <Icon name="heart" color={colors.violet} size={15} /> 
              </View>
            </View>
          </View>

          <View style={LocalProfileStyles.infoContainer}>
            
            <View>
              <View style={LocalProfileStyles.linksContainer}>
                <Text style={{fontWeight:'500'}}>Contact: </Text>
                <Pressable style={LocalProfileStyles.phoneContainer} onPress={handlePhone}>
                  <Avatar.Icon size={28} icon="phone" style={{backgroundColor:'white', borderWidth:0.5, borderColor:colors.violet}} color={colors.violet} />
                </Pressable> 
                <Pressable style={LocalProfileStyles.phoneContainer} onPress={handleWhatsapp}>
                  <Avatar.Icon size={28} icon="whatsapp" style={{backgroundColor:'white', borderWidth:0.5, borderColor:colors.violet}} color={colors.violet} />
                </Pressable> 
              </View>
            </View>

            <View style={LocalProfileStyles.likesContainer}>
              {user.type_id==2 && <Pressable style={{marginRight:10}} onPress={handleLike}>{isFavorite?<Icon name="heart" size={25} color={colors.mediumViolet} />:<Icon name="heart-o" size={25} color={colors.mediumViolet} />}</Pressable>}
              <Pressable style={LocalProfileStyles.message} onPress={handleMessage}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>

          </View>
          
          {user.type_id==2? <WideButton handlePress={handleBooking} icon='calendar' color={colors.violet} text='Book' />:null}
          {appointmentModal && <AppointmentsModal modalVisible={appointmentModal} setModalVisible={setAppointmentModal} id={item.id} /> }

          <View style={LocalProfileStyles.separator} />

          <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>Basic Info</Text>
            <ProfileCard icon={'language'} data={item.languages} />
            <ProfileCard icon={'birthday-cake'} data={item.date_of_birth} />
            <ProfileCard icon={'user'} data={item.gender} />
          </View>



          {item.about && <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>About</Text>
            <ProfileCard icon='info' data={item.about} />
          </View>}


          <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>Categories</Text>
            <View style={{flexDirection:"row"}} >
            {item.categories.map((category)=>
              <Button compact uppercase={false} labelStyle={{ color: 'black' }} style={LocalProfileStyles.categoryBtn} icon={()=><Image source={categoryIcons[category]} style={{width:25, height:25}} />} mode="contained" >
                {category}
              </Button>
            )}
            </View>
          </View>

     

          {item.highlights.length>0 && 
          <View style={LocalProfileStyles.sectionContainer}>
          <Text style={LocalProfileStyles.sectionTitle}>Highlights</Text>
          <ImageCarousel images={images} />
          </View>}
          <ImageView
          images={images}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}/>

          <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>Reviews</Text>

            <View style={LocalProfileStyles.ratingsContainer}>
              <View style={{alignItems:"center"}} >
              {average!=null ?<Text style={LocalProfileStyles.averageText} >{average}/5</Text>:null}
              {average!=null ?<Rating size={25} startingValue={average} imageSize={25} readonly/>:null}
              <Text style={LocalProfileStyles.reviewNb}>Based on {reviews.length} reviews</Text>
              </View>
              <View>
                {stars.length>0 && stars.map((star, index)=><View style={{flexDirection:"row",alignItems:"center"}} key={index} ><Text style={{marginRight:5}}>{star}</Text><Rating size={15} startingValue={index} imageSize={15} readonly/></View>)}
                {user.type_id==2 && <TouchableOpacity style={LocalProfileStyles.reviewsLink} onPress={handleReviews} >
                <Text style={{marginHorizontal:7}} >reviews</Text>
                <Icon name='chevron-right' color={colors.gold} size={18}/>
                </TouchableOpacity>}
              </View>
            </View>

          </View>
        </View>

        {reviewModalVisible && <ReviewModal modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible} setReviewAdded={setReviewAdded} id={item.id} />}
     
    </ScrollView>
    
  )
}
export default LocalPage