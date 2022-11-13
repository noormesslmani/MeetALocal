import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import { Surface, Text } from 'react-native-paper';
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
      
        <Surface style={[styles.formContainer, styles.userType]} elevation={5}>
          <Text style={styles.signIn}>You are?</Text>
          <AuthButton title={'Local'} handleSubmit={handleLocal} type={2}/>
          <AuthButton title={'Foreigner'} handleSubmit={handleForeigner} type={2}/>
        </Surface>
    </View>
  )
}
export default UserTypeScreen