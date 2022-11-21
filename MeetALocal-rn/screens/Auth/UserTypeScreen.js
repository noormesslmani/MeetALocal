import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles/AuthScreensStyle';
import AuthButton from '../../components/Buttons/AuthButton';
import { Surface, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
const UserTypeScreen=({navigation})=> {
  const route = useRoute();
  const fullName= route.params.fullName
  const phone= route.params.phone
  const dob =route.params.dob
  const country= route.params.country
  const nationality =route.params.nationality
  const language = route.params.language
  const email= route.params.email
  const password= route.params.password
  const handleLocal=()=>{
    {
      navigation.navigate('setup',{fullName,phone,dob,country,nationality,language,email,password,
        type:'Local'})
    }
  }
  const handleForeigner=()=>{

    {
      navigation.navigate('setup',{fullName,phone,dob,country,nationality,language,email,password,
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