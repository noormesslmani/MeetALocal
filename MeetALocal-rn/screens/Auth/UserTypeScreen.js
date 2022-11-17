import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import AuthButton from '../../components/Buttons/AuthButton';

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