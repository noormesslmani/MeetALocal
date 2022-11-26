import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CommentStyle from './Styles/CommentStyle';
import { address } from '../../constants/address';
import { userProfile } from '../../network/App';
import { useContext } from "react";
import { UserContext } from '../../App';
const Comment=({navigation, comment})=> {
  const { user, setUser} = useContext(UserContext);
  const handleUser=async()=>{
    if (user.id != comment.user_id){
    const result= await userProfile(comment.user_id)
      comment.type_id==1? navigation.navigate('local-page', {item: result.data.data}):navigation.navigate('foreigner-page', {item: result.data.data})
    }
  }
  return (
    <View style={CommentStyle.commentContainer}>
        <View style={CommentStyle.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={handleUser} ><Image source={comment.profile_picture?{ uri:`${address}/${comment.profile_picture}`}: require('../../assets/blank-profile.webp')} style={CommentStyle.image} /></TouchableOpacity>
                <View style={CommentStyle.details}>
                    <Text style={CommentStyle.name}>{comment.name}</Text>
                    <View style={CommentStyle.countryContainer} >
                      <Text style={CommentStyle.country}>{comment.country}</Text>
                      {comment.type_id==1 && <Text style={ CommentStyle.type}>Local</Text>}
                    </View>
                    <Text style={CommentStyle.comment}>{comment.content}</Text>
                </View>
            </View>
        </View>
        <View>
         
        </View>
    </View>
  )
}
export default Comment