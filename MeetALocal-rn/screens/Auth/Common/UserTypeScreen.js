import { View } from 'react-native';
import React from 'react';
import styles from '../Styles/AuthScreensStyle';
import AuthButton from '../../../components/Buttons/AuthButton';
import { Surface, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
const UserTypeScreen=({navigation})=> {
  //route parameters
  const route = useRoute();

  //local type
  const handleLocal=()=>{
      navigation.navigate('setup',{...route.params,type:'Local'});
  }

  //foreigner type
  const handleForeigner=()=>{
      navigation.navigate('setup',{...route.params,type:'Foreigner'});
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