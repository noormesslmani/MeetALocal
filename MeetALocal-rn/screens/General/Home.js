import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useContext, useRef, useState } from "react";
import HomeStyles from './Styles/HomeStyles';
import { UserContext } from '../../App'
import { address } from '../../constants/address';
import HomeCard from '../../components/Cards/HomeCard';
import WavyBack from '../../components/General/WavyBackground';
import { sendNotification, Notify } from '../../notifications/Notifications';
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

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(()=>{
        Notify(setExpoPushToken, setNotification, notificationListener, responseListener)
    },[])
   
  return (
    <View style={HomeStyles.container}>
        <WavyBack/>
        <Image source={user.profile_picture?{ uri:`${address}/${user.profile_picture}`}: require('../../assets/blank-profile.webp')} style={HomeStyles.photo }/>
        <HomeCard label={'Locals'} handlePress={handleLocals}/>
        <HomeCard label={'Events'} handlePress={handleEvents}/>
        <HomeCard label={'Posts'} handlePress={handlePosts} />
    </View>
  )
}
export default Home