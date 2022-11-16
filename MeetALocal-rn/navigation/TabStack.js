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
import DrawerNavigation from './DrawerStack';
import { Searchbar } from 'react-native-paper';
import SearchScreen from '../screens/General/Search';
import Schedules from '../screens/General/Schedules';
import Bookings from '../screens/General/Bookings';
const TabNavigation=()=>{
    const Tab = createBottomTabNavigator();
    const { user, setUser} = useContext(UserContext);
    const navigation= useNavigation()
    const handleExit=async () =>{
      await AsyncStorage.clear();
      navigation.navigate("auth")
  }
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
      {/* {user.type_id==1 && <Tab.Screen
        name="profile-local"
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
      {user.type_id==2 && <Tab.Screen
        name="profile-foreigner"
        component={ForeignerProfile}
        options={{
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center', headerTitle:'profile'
        }}
      />} */}
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

      {user.type_id==1 && <Tab.Screen
        name="appointments"
        component={Schedules}
        options={{
          tabBarLabel: 'schedule',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
          headerTitle:"Schedule", headerTitleAlign:"center", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
        }}
        
      />}
      {user.type_id==2 && <Tab.Screen
        name="bookings"
        component={Bookings}
        options={{
          tabBarLabel: 'bookings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
          headerTitle:"Bookings", headerTitleAlign:"center", 
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