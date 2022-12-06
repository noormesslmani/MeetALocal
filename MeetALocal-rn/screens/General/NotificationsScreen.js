import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../constants/colors';
import { getNotifications, deleteNotifications } from '../../network/Notifications';
import EmptyPage from '../../components/General/EmptyPage';
import { widths } from '../../constants/dimensions';
import Notification from '../../components/General/Notification';
import { useFocusEffect } from '@react-navigation/native';
const Notifications=({navigation})=> {

    const [notifications, setNotifications]=useState([]);
    const [isLoading, setIsLoading]=useState(false);
    useFocusEffect(
        useCallback(() => {
            getAllNotifications();
    }, []), );
    
   const getAllNotifications= async()=>{
    setIsLoading(true);
    const result= await getNotifications();
    if (result.success){
        setNotifications(result.data.data)
    }
    setIsLoading(false);
   }
   const handleDelete=async()=>{
    const result= await deleteNotifications();
    if (result.success){
        setNotifications([])
    }
   }
  return (
        <>
        <View style={{width:widths.width9, alignItems:"flex-end", marginVertical:20}}>
            <Pressable onPress={handleDelete} ><Text style={{color:colors.violet}}>Delete All</Text></Pressable>
        </View>
        {!isLoading && notifications.length==0 && <EmptyPage/> }
        <View style={{width:widths.width, borderColor:colors.lightGrey, borderWidth:0.4}} />
        <KeyboardAwareScrollView style={{paddingBottom:100, marginTop:10}}>
            {isLoading && <ActivityIndicator color={colors.violet} /> }
            {!isLoading && notifications.map((notification)=><Notification notification={notification} key={notification.id} />) }   
        </KeyboardAwareScrollView>
        </>
  )
}
export default Notifications