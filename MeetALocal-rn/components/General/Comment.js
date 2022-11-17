import { View, Text, Image } from 'react-native'
import React from 'react'
import image from '../../assets/profile.jpg'
import CommentStyle from './Styles/CommentStyle';
const Comment=({navigation, item, comment})=> {

  return (
    <View style={CommentStyle.commentContainer}>
        <View style={CommentStyle.headerContainer}>
            <View style={{flexDirection:"row"}}>
                <Image source={image} style={CommentStyle.image} />
                <View style={CommentStyle.details}>
                    <Text style={{fontSize:10, fontWeight:"600"}}>{comment.user.name}</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <Text style={{fontSize:10}}>country</Text>
                      {comment.user.type_id==1 && <Text style={{fontSize:8, marginLeft:5, color:"#8C57BA"}}>Local</Text>}
                    </View>
                    <Text style={{fontSize:10, marginTop:5, fontWeight:"300"}}>{comment.content}</Text>
                </View>
            </View>
        </View>
        <View>
         
        </View>
    </View>
  )
}
export default Comment