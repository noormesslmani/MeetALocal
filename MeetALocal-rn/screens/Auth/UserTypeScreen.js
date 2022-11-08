import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        <Text style={styles.welcome}>Welcome</Text>
        <View style={[styles.formContainer, styles.shadowProp, styles.userType]}>
          <Text style={styles.signIn}>I am?</Text>
          <TouchableOpacity style={styles.typeBtn} onPress={handleLocal}>
            <Text>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeBtn} onPress={handleForeigner}>
            <Text>Foreigner</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
export default UserTypeScreen