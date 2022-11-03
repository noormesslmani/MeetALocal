import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';
import { createContext, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../Auth/SignupScreen';
import SignupScreen2 from '../Auth/SignupScreen2';
import SignupScreen3 from '../Auth/SignupScreen3';
import SigninScreen from '../Auth/SigninScreen';
import Logo from './Logo';
import UserTypeScreen from '../Auth/UserTypeScreen';
import SetUpScreen from '../Auth/SetUpScreen';
import Home from '../General/Home';
import Profile from '../General/Profile';
import Chats from '../General/Chats';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Posts from '../General/Posts';
import Events from '../General/Events';
import Locals from '../General/Locals';
import Header from './SignedInHeader';
import Categories from '../Auth/Categories';
import SetUpMap from '../Auth/SetUpMapScreen';
import ForeignerProfile from '../Profile/ForeignersProfile';
import LocalProfile from '../Profile/LocalProfile'
export default function RootNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="signin" options={{headerTitle: () => <Logo/>,}} component={SigninScreen} />
        <Stack.Screen name="signup-first" options={{headerTitle: () => <Logo/>,}} component={SignupScreen} />
        <Stack.Screen name="signup-second" options={{headerTitle: () => <Logo/>,}} component={SignupScreen2} />
        <Stack.Screen name="signup-third" options={{headerTitle: () => <Logo/>,}} component={SignupScreen3} />
        <Stack.Screen name="user-type" options={{headerTitle: () => <Logo/>,}} component={UserTypeScreen} />
        <Stack.Screen name="setup" options={{headerTitle: () => <Logo/>,}}  component={SetUpScreen} />
        <Stack.Screen  name="setup-map" component={SetUpMap} options={{headerTitle: () => <Logo/>,}}/>
        <Stack.Screen name="categories" options={{headerTitle: () => <Logo/>,}} component={Categories} />
        <Stack.Screen name="tabs" options={{headerTitle: () => <Header/>,  headerBackVisible:false}} component={MyTabs} />
        <Stack.Screen  name="posts" component={Posts} options={{headerTitle: () => <Header/>,headerBackVisible:false}}/>
        <Stack.Screen  name="events" component={Events} options={{headerTitle: () => <Header/>,headerBackVisible:false}}/>
        <Stack.Screen  name="locals" component={Locals} options={{headerTitle: () => <Header/>,headerBackVisible:false}}/>
        <Stack.Screen  name="local-profile" component={LocalProfile} options={{headerTitle: () => <Header/>,headerBackVisible:false}}/>
        <Stack.Screen  name="foreigner-profile" component={ForeignerProfile} options={{headerTitle: () => <Header/>,headerBackVisible:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
function MyTabs() {
  
  return (
    < Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#4BB0F9",
        headerShown: false
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
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
}