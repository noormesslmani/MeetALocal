import { View, Image } from 'react-native'
import React from 'react'
import { useContext } from "react";
import HomeStyles from './Styles/HomeStyles';
import { UserContext } from '../../App'
import { address } from '../../constants/address';
import HomeCard from '../../components/Cards/HomeCard';
import WavyBack from '../../components/General/WavyBackground';
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
    console.log(user.type_id)
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