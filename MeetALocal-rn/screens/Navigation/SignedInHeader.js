import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack';
const Header= ()=> {
    const navigation= useNavigation()
    const handleExit=async () =>{
        await AsyncStorage.clear();
        navigation.navigate("signin")
    }
    return (
        <View style={styles.container} >
            <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}/>
            <Pressable style={{marginLeft:20}} onPress={handleExit}><Icon name="exit-outline" size={30}/></Pressable>
        </View>
    )
  }
  export default Header