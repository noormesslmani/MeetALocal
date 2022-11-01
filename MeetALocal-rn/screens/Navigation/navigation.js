import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';
import { createContext, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../Auth/SignupScreen';
import SignupScreen2 from '../Auth/SignupScreen2';
import SignupScreen3 from '../Auth/SignupScreen3';
import SigninScreen from '../Auth/SigninScreen';
import Logo from './Logo';
import UserTypeScreen from '../Auth/UserTypeScreen';
import SetUpScreen from '../Auth/SetUpScreen';
import Categories from '../Auth/Categories';
import Home from '../Foreigners/Home';
import Profile from '../Foreigners/Profile';
import Chats from '../Foreigners/Chats';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Posts from '../Foreigners/Posts';
import Events from '../Foreigners/Events';
import Locals from '../Foreigners/Locals';
import Post from '../Foreigners/Post';
export default function RootNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="signin" options={{headerTitle: () => <Logo/>,}} component={SigninScreen} />
        <Stack.Screen name="signup-first" options={{headerTitle: () => <Logo/>,}} component={SignupScreen} />
        <Stack.Screen name="signup-second" options={{headerTitle: () => <Logo/>,}} component={SignupScreen2} />
        <Stack.Screen name="signup-third" options={{headerTitle: () => <Logo/>,}} component={SignupScreen3} />
        <Stack.Screen name="user-type" options={{headerTitle: () => <Logo/>,}} component={UserTypeScreen} />
        <Stack.Screen name="setup" options={{headerTitle: () => <Logo/>,}}  component={SetUpScreen} />
        <Stack.Screen name="categories" options={{headerTitle: () => <Logo/>,}} component={Categories} />
        <Stack.Screen name="tabs" options={{headerTitle: () => <Logo/>,  headerBackVisible:false}} component={MyTabs} />
        <Stack.Screen  name="posts" component={Posts} options={{headerTitle: () => <Logo/>,}}/>
        <Stack.Screen  name="post-details" component={Post} options={{headerTitle: () => <Logo/>,}}/>
        <Stack.Screen  name="events" component={Events} options={{headerTitle: () => <Logo/>,}}/>
        <Stack.Screen  name="locals" component={Locals} options={{headerTitle: () => <Logo/>,}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
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