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
const LocalPage=({navigation})=> {
    const route = useRoute();
    const item =route.params.item
    const { user, setUser, locals, setLocals} = useContext(UserContext);
    const [isFavorite, SetIsFavorite]=useState(false)
    const [likes, setLikes]= useState(item.likes)
    const [visible, setIsVisible] = useState(false);
    const [imageIndex, setImageIndex]= useState(0)
    const images = item.highlights.map((image)=>({ uri: `${address}/${image}`}))
    console.log(images)
    useEffect(()=>{
      checkFavorite()
      setLocals([item])
    },[])
    console.log(item)
    const handleLike=()=>{
      toggleFavorite()
    }
    const handleMessage=()=>{
      console.log('hi')
      navigation.navigate('chat-screen', { chatId: null, userId: item.id})
    }
    const checkFavorite=async()=>{
      const result = await CheckFavoriteLocals(item.id)
      if (result.success){
        SetIsFavorite(result.data.data)
      }
    } 
    const toggleFavorite =async()=>{
      const data={
        id:item.id
      }
      const result = await toggleFavoriteLocals(data)
      if (result.success){
        await checkFavorite()
        setLikes(result.data.data)
      }
  }
  const handleMap=()=>{
    navigation.navigate('locals-map',{data:[item], type:3})
  }
  const args = {
    number: item.phone.toString(), 
    prompt: false, 
    skipCanOpen: true 
  }
  const handlePhone=()=>{
    call(args).catch(console.error)
  }
  return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <View style={LocalProfileStyles.mainContainer}>
          <View style={LocalProfileStyles.imageContainer}>
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={{fontSize:18, fontWeight:"600", marginBottom:3}}>{item.name}</Text>
              <View style={{flexDirection:"row"}}><Text style={{fontSize:14, fontWeight:"400", marginBottom:3}}>{item.country}</Text><Map handleMap={handleMap} small={true}/></View>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text style={{fontSize:13, fontWeight:"400", marginRight:3}}>{likes}</Text>
                <Icon name="heart" color="#8C57BA" size={15} /> 
              </View>
            </View>
          </View>
          <View style={LocalProfileStyles.infoContainer}>
            <View>
              <Pressable style={{flexDirection:"row", alignItems:"center"}} onPress={handlePhone}>
                <Icon name="phone" size={20} color="grey" />
                <Text style={{fontSize:13, fontWeight:"400", marginLeft:10, color:'blue', textDecorationLine:"underline"}}>{item.phone}</Text>
              </Pressable>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Ionicons name="language" size={20} color="grey" />
                {item.languages.map((language)=><Text style={{fontSize:10, fontWeight:"400", marginLeft:10}} key={language}>{language}</Text>)}
              </View>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              {user.type_id==2 && <Pressable style={{marginRight:10}} onPress={handleLike}>{isFavorite?<Icon name="heart" size={20} color="#8C57BA" />:<Icon name="heart-o" size={20} color="#8C57BA" />}</Pressable>}
              <Pressable style={LocalProfileStyles.message} onPress={handleMessage}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>
          </View>
          <View style={LocalProfileStyles.separator}></View>
          {item.about && <View style={LocalProfileStyles.about}>
            <Text style={{fontSize:16, fontWeight:"500"}}>About</Text>
            <Text style={{fontSize:13, fontWeight:"300"}}>{item.about}</Text>
          </View>}
          <View style={LocalProfileStyles.about}>
            <Text style={{fontSize:16, fontWeight:"500"}}>Categories</Text>
            <View style={{flexDirection:"row"}}>
              {item.categories.map((category)=>
              <View style={LocalProfileStyles.iconContainer}>
              <Image source={categoryIcons[category]} style={{width:25, height:25}}/>
              <Text style={{fontSize:14}}>{category}</Text>
              </View>
            )}
              </View>
          </View>
          
          {item.highlights.length>0 && <View style={LocalProfileStyles.about}>
          <Text style={{fontSize:16, fontWeight:"500", marginBottom:20}}>Highlights</Text>
            <View style={LocalProfileStyles.highlightImages}>
              {item.highlights[0] && <Pressable onPress={()=>{setIsVisible(true), setImageIndex(0)}}><Image source={{uri:`${address}/${item.highlights[0]}`}} style={LocalProfileStyles.highlightimg}/></Pressable>}
              {item.highlights[1] && <Pressable onPress={()=>{setIsVisible(true), setImageIndex(1)}}><Image source={{uri:`${address}/${item.highlights[1]}`}} style={LocalProfileStyles.highlightimg}/></Pressable>}
            </View>
            <View style={LocalProfileStyles.highlightImages}>
              {item.highlights[2] && <Pressable onPress={()=>{setIsVisible(true), setImageIndex(2)}}><Image source={{uri:`${address}/${item.highlights[2]}`}} style={LocalProfileStyles.highlightimg}/></Pressable>}
              {item.highlights[3] && <Pressable onPress={()=>{setIsVisible(true), setImageIndex(3)}}><Image source={{uri:`${address}/${item.highlights[3]}`}} style={LocalProfileStyles.highlightimg}/></Pressable>}
            </View>
          </View>}
          <ImageView
          images={images}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}/>
        </View>
    </ScrollView>
    
  )
}
export default LocalPage