import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, Pressable } from 'react-native';
import * as React from 'react';
import { createContext, useState, useContext } from "react";
import { NavigationContainer, useNavigation, DefaultTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserContext } from '../App';
import Chats from '../screens/General/Chats';
import ForeignerProfile from '../screens/Profile/ForeignersProfile';
import { colors } from '../constants/colors';
import { widths } from '../constants/dimensions';
import { address } from '../constants/address';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigation from './DrawerStack';
import SearchScreen from '../screens/General/Search';
import Schedules from '../screens/General/Schedules';
import Bookings from '../screens/General/Bookings';
const TabNavigation=()=>{
    const Tab = createBottomTabNavigator();
    const { user, setUser} = useContext(UserContext);
    const navigation= useNavigation()
  
  return (
    < Tab.Navigator
      initialRouteName=""
      screenOptions={{
        tabBarActiveTintColor: colors.violet,
      }}
      >
      <Tab.Screen
        name="feed"
        component={DrawerNavigation}
        options={{
          tabBarLabel: 'home', headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown:false
        }}
      />
  
      {user.type_id==2 && <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
          headerTitle:"", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
        }}
        
      />}
      <Tab.Screen
        name="chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          headerLeft: () => (
            <View style={{marginLeft:20, flexDirection:"row"}}>
              <Image source={user.profile_picture?{ uri:`${address}/${user.profile_picture}`}: require('../assets/blank-profile.webp')} style={{width:40, height:40, borderRadius:20}}/>
            </View>)
        }}
        
      />
    </Tab.Navigator>
  );
}
export default TabNavigation