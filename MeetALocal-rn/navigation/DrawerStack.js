import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, Pressable } from 'react-native';
import * as React from 'react';
import { createContext, useState, useContext } from "react";
import { NavigationContainer, useNavigation, DefaultTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserContext } from '../App';
import Logo from '../screens/Navigation/Logo';
import Home from '../screens/General/Home';
import Chats from '../screens/General/Chats';
import ForeignerProfile from '../screens/Profile/ForeignersProfile';
import { colors } from '../constants/colors';
import { widths } from '../constants/dimensions';
import { address } from '../constants/address';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalProfile from '../screens/Profile/LocalProfile'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import TabNavigation from './TabStack';
import SigninScreen from '../screens/Auth/SigninScreen';
const DrawerNavigation=()=>{
    const Drawer = createDrawerNavigator();
    const { user, setUser} = useContext(UserContext);
    const navigation= useNavigation()
    const handleExit=async () =>{
      await AsyncStorage.clear();
      navigation.navigate("auth")
  }
  return (
    < Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => props.navigation.navigate("auth")} />
        </DrawerContentScrollView>
      )
    }}> 
      <Drawer.Screen name='home' component={Home}
      options={{headerTitle:'Welcome',
        headerTitleAlign: 'center', headerTitleStyle:{fontSize:30}, headerStyle:{backgroundColor: colors.lighterViolet},
        headerShadowVisible:false
      }}
      />
      {user.type_id==1 && <Drawer.Screen
        name="profile"
        component={LocalProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center', headerTitle:'Profile'
        }}
      />}
      {user.type_id==2 && <Drawer.Screen
        name="profile"
        component={ForeignerProfile}
        options={{
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center', headerTitle:'profile'
        }}
      />}
    </Drawer.Navigator>
  );
}
export default DrawerNavigation


