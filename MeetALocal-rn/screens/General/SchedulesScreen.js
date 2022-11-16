import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput,  ActivityIndicator} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { getSchedule } from '../../network/App';
import { colors } from '../../constants/colors';
import ScheduleCard from '../../components/Cards/ScheduleCard';
import ScheduleStyles from './Styles/ScheduleScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import { color } from 'react-native-reanimated';
import WavyBackground from "react-native-wavy-background";
import { IconButton, MD3Colors } from 'react-native-paper'
import ScheduleModal from '../../components/Modals/ScheduleModal';
const Schedules=()=> {
  const [schedule, setSchedule]=useState(null)
  const [isLoading, setIsLoading]=useState(false)
  const [scheduleModal, setScheduleModal]=useState(false)
  const [scheduleAdded, setScheduleAdded]=useState(false)
    useEffect(()=>{
      getMySchedule()
  
   },[])
   useEffect(()=>{
    if(scheduleAdded){
      getMySchedule()
      setScheduleAdded(false)
    }
   },[scheduleAdded])
   const getMySchedule=async()=>{
    setIsLoading(true)
    const result=await getSchedule()
    if (result.success){
      setSchedule(result.data.data)
    }
    setIsLoading(false)
  }
  const renderItem = ({ item, index }) => (
    <ScheduleCard item={item} key={index}/>
  );
 
  return (
        <View style={ScheduleStyles.container}>
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
          <TouchableOpacity onPress={()=>setScheduleModal(true)} ><Icon name= 'plus' size={50} color={colors.lightViolet} /></TouchableOpacity>
          {scheduleModal && <ScheduleModal setModalVisible={setScheduleModal} modalVisible={scheduleModal} setScheduleAdded={setScheduleAdded} />}
        </View>
     
  )
}
export default Schedules