import { View, FlatList,  ActivityIndicator} from 'react-native';
import React from 'react';
import { colors } from '../../../constants/colors';
import { getBookedAppointments } from '../../../network/App';
import { useState, useCallback, useContext } from "react";
import ScheduleCard from '../../../components/Cards/ScheduleCard';
import ScheduleStyles from '../Styles/ScheduleScreenStyles';
import WavyBack from '../../../components/General/WavyBackground';
import { useFocusEffect} from '@react-navigation/native';
import { BookingsContext } from '../../../context/BookingsContext';
import EmptyPage from '../../../components/General/EmptyPage';
const Bookings=({navigation})=> {
  const { bookings, setBookings} = useContext(BookingsContext);

  const [isLoading, setIsLoading]=useState(false);

  //Booking screen for foreigner user
  

  //get all upcomming booked appointments
  useFocusEffect(
    useCallback(() => {
      getBookings();
    }, []), )


  //get all bookings
  const getBookings=async()=>{
    setIsLoading(true)
    const result= await getBookedAppointments();
    if (result.success){
      setBookings(result.data.data)
    }
    setIsLoading(false);
  }
  const renderItem = ({ item, index }) => (
    <ScheduleCard item={item} key={index} type={2} navigation={navigation} />
  );

  return (
        <View style={{alignItems:"center", padding:40}}>
          <WavyBack/>
        {!isLoading && bookings.length==0 && <EmptyPage/>}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={bookings}
          numColumns={2}
          Key={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={ScheduleStyles.list}
          contentContainerStyle={{ paddingBottom: 300, paddingTop:20, paddingHorizontal:10}}
          ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:null}
          />
        </View>
     
  )
}
export default Bookings