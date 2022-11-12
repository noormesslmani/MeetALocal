import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
const UserTypeScreen=({navigation})=> {
  const handleLocal=()=>{
    {
      navigation.navigate('setup',{
        type:'Local'})
    }
  }
  const handleForeigner=()=>{

    {
      navigation.navigate('setup',{
        type:'Foreigner'})
    }
  }
  return (
    <View style={styles.backgroundUserType}>
      
        <View style={[styles.formContainer, styles.shadowProp, styles.userType]}>
          <Text style={styles.signIn}>I am?</Text>
          <AuthButton title={'Local'} handleSubmit={handleLocal} type={2}/>
          <AuthButton title={'Foreigner'} handleSubmit={handleForeigner} type={2}/>
        </View>
    </View>
  )
}
export default UserTypeScreen