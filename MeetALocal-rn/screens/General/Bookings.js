import { View, FlatList,  ActivityIndicator} from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors';
import { bookAppointment, getBookedAppointments } from '../../network/App';
import { useState, useEffect, useContext } from "react";
import ScheduleCard from '../../components/Cards/ScheduleCard';
import ScheduleStyles from './Styles/ScheduleScreenStyles';
import WavyBack from '../../components/General/WavyBackground';
import Toast from 'react-native-toast-message'
const Bookings=({navigation})=> {

  const [appointments, setAppointments]=useState(null)
  const [isLoading, setIsLoading]=useState(false)
  const [deleted, setDeleted]=useState(false)

  //Booking screen for foreigner user
  useEffect(()=>{
    getBookings()
  },[])
  useEffect(()=>{
    if(deleted){
      getBookings()
      setDeleted(false)
    }
  },[deleted])

  //get all bookings
  const getBookings=async()=>{
    setIsLoading(true)
    const result= await getBookedAppointments()
    if (result.success){
      setAppointments(result.data.data)
      console.log(result.data.data)
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      });
    }
    setIsLoading(false)

  }
  const renderItem = ({ item, index }) => (
    <ScheduleCard item={item} key={index} type={2} setDeleted={setDeleted} navigation={navigation} />
  );

  return (
        <View style={{alignItems:"center", padding:40}}>
          <WavyBack/>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={appointments}
          numColumns={2}
          Key={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={ScheduleStyles.list}
          contentContainerStyle={{ paddingBottom: 300, paddingTop:20, paddingHorizontal:10}}
          ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
          />
          <Toast/>
        </View>
     
  )
}
export default Bookings