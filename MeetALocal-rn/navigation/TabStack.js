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
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: colors.violet,
      }}
      >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle: () => <Logo/>,
          headerRight: () => (
            <TouchableOpacity style={{marginRight:10}} onPress={handleExit}>
              <Ionicons name="exit-outline" size={30}/>
            </TouchableOpacity>),
            headerTitleAlign: 'center'
        }}
      />
      {user.type_id==1 && <Tab.Screen
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
      />}
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerTitle: () => <Searchbar placeholder="Search" />,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center',
        }}
        
      />
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