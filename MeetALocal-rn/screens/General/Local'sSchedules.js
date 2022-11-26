import { View, Text, TouchableOpacity, Image, FlatList,  ActivityIndicator} from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { getSchedule } from '../../network/App';
import { colors } from '../../constants/colors';
import ScheduleCard from '../../components/Cards/ScheduleCard';
import ScheduleStyles from './Styles/ScheduleScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import WavyBack from '../../components/General/WavyBackground';
import { useFocusEffect} from '@react-navigation/native';
import ScheduleModal from '../../components/Modals/NewScheduleModal';
const Schedules=({navigation})=> {

  //This screen is for locals

  const [schedule, setSchedule]=useState(null)
  const [isLoading, setIsLoading]=useState(false)
  const [scheduleModal, setScheduleModal]=useState(false)
  const [scheduleAdded, setScheduleAdded]=useState(false)
  const [deleted, setDeleted]=useState(false)
  

  //get schedule
  useFocusEffect(
    useCallback(() => {
    getMySchedule()
    }, []), )
    
    //handle the modifications of the schedule
   useEffect(()=>{
    if(scheduleAdded || deleted){
      getMySchedule()
      setScheduleAdded(false)
      setDeleted(false)
    }
   },[scheduleAdded, deleted])
   
   //get the schedule
   const getMySchedule=async()=>{
    setIsLoading(true)
    const result=await getSchedule()
    if (result.success){
      setSchedule(result.data.data)
    }
    setIsLoading(false)
  }
  const renderItem = ({ item, index }) => (
    <ScheduleCard item={item} key={index} type={1} navigation={navigation} setDeleted={setDeleted} />
  );
  
  return (
        <View style={ScheduleStyles.container}>
          <WavyBack />
          <View style={ScheduleStyles.labelsContainer}>
            <View style={ScheduleStyles.label}>
              <View style={ScheduleStyles.circle}></View>
              <Text>Available</Text>
            </View>
            <View style={ScheduleStyles.label}>
              <View style={[ScheduleStyles.circle,{backgroundColor:colors.lightViolet}]}></View>
              <Text>Booked</Text>
            </View>
          </View>
          <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={schedule}
          numColumns={2}
          Key={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={ScheduleStyles.list}
          contentContainerStyle={{ paddingBottom: 300, paddingTop:20, paddingHorizontal:10}}
          ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
          />
          <TouchableOpacity onPress={()=>setScheduleModal(true)} style={ScheduleStyles.add} ><Icon name= 'plus' size={50} color={colors.lightViolet} /></TouchableOpacity>
          <ScheduleModal setModalVisible={setScheduleModal} modalVisible={scheduleModal} setScheduleAdded={setScheduleAdded} />
        </View>
     
  )
}
export default Schedules