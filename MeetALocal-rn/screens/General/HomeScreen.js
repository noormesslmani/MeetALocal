import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext, useState } from "react";
import HomeStyles from './Styles/HomeStyles';
import { UserContext } from '../../App'
import { address } from '../../constants/address';
import HomeCard from '../../components/Cards/HomeCard';
import WavyBack from '../../components/General/WavyBackground';
import ImageViewer from '../../components/General/ImageView';
const Home=({navigation})=> {
    const { user, setUser} = useContext(UserContext);
    const handleLocals=()=>{
        navigation.navigate('locals')
    }
    const handlePosts=()=>{
        navigation.navigate('posts')
    }
    const handleEvents=()=>{
        navigation.navigate('events')
    }
    const [imageView, setImageView]=useState(false)
  
    

  return (
    <>
    <View style={HomeStyles.container}>
        <WavyBack/>
        <TouchableOpacity onPress={()=>setImageView(true)} >
        <Image source={user.profile_picture?{ uri:`${address}/${user.profile_picture}`}: require('../../assets/blank-profile.webp')} style={HomeStyles.photo }/>
        </TouchableOpacity>
        <HomeCard label={'Locals'} handlePress={handleLocals}/>
        <HomeCard label={'Events'} handlePress={handleEvents}/>
        <HomeCard label={'Posts'} handlePress={handlePosts} />
    </View>
    {user.profile_picture && 
    <ImageViewer images={[{uri:`${address}/${user.profile_picture}`}]}
    imageView={imageView}
    setImageView={setImageView}/>
    }
   
    </>
  )
}
export default Home