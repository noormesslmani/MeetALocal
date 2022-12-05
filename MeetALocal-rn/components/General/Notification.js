import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import NotificationStyle from './Styles/NotificationStyle';
const Notification=({notification})=> {
  
  return (
    <View style={NotificationStyle.container}>
      <Text style={NotificationStyle.content}>{notification.content}</Text>
      <View style={NotificationStyle.dateContainer}><Text style={NotificationStyle.date} >{notification.created_at}</Text></View>
      <View style={NotificationStyle.separator} />
    </View>
  )
}
export default Notification