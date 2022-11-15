import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { UserContext } from '../../App'
import { useState, useEffect, useContext } from "react";
import ProfileStyles from './ProfileStyles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { address } from '../../constants/address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import ImageView from "react-native-image-viewing";
import WavyBackground from "react-native-wavy-background";
import AppButton from '../../components/Buttons/AppButtons';
import { categoryIcons } from '../../constants/categories';
import Carousel from 'react-native-reanimated-carousel';
const ForeignerProfile=({navigation})=> {
  const { user, setUser} = useContext(UserContext);
  const [image, setImage]= useState(null)
  const [imageView, setImageView]=useState(false)
 
  useEffect(()=>{
    if(user.profile_picture){
      setImage(user.profile_picture)
    }
  },[user.profile_picture])

    const handleEdit=()=>{
      navigation.navigate('edit-local-profile')
    }
  return (
    <View style={ProfileStyles.container}>
      
        <View
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
          }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={30}
            frequency={1}
            offset={70}
            color= {colors.lighterViolet}
            top
          />
        </View>
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
        <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>About</Text>
          <View style={ProfileStyles.separator}/>
          <Text>{user.about}</Text>
        </View>
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
          <View style={{marginTop:40}}>
          <Text style={{fontWeight:"500"}}>Highlights</Text>
          <View style={ProfileStyles.separator}/>
          </View>
          
        </ScrollView>
    </View>
    
  )
}
export default ForeignerProfile