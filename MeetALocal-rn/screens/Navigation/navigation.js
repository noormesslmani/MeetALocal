import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, Pressable } from 'react-native';
import * as React from 'react';
import { createContext, useState, useContext } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../Auth/SignupScreen';
import SignupScreen2 from '../Auth/SignupScreen2';
import SignupScreen3 from '../Auth/SignupScreen3';
import SigninScreen from '../Auth/SigninScreen';
import Logo from './Logo';
import UserTypeScreen from '../Auth/UserTypeScreen';
import SetUpScreen from '../Auth/SetUpScreen';
import Home from '../General/Home';
import Chats from '../General/Chats';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Posts from '../General/Posts';
import Events from '../General/Events';
import Locals from '../General/Locals';
import ChatScreen from '../General/ChatScreen';
import Categories from '../Auth/Categories';
import SetUpMap from '../Auth/SetUpMapScreen';
import { UserContext } from '../../App'
import ForeignerProfile from '../Profile/ForeignersProfile';
import LocalProfile from '../Profile/LocalProfile'
import LocalsMap from '../General/LocalsMap';
import EditForeignerProfile from '../Profile/EditProfileForeigners';
import LocalPage from '../General/LocalPage';
import PostComments from '../General/Comments';
export default function RootNavigation() {
  
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="signin" options={{headerTitle: () => <Logo/>,headerBackVisible:false}} component={SigninScreen} />
        <Stack.Screen name="signup-first" 
        options={{ 
          headerTitle: () => <Logo/>,
          headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={SignupScreen} />
        <Stack.Screen name="signup-second"
        options={{ 
          headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
          headerTitle: () => <Logo/>,
          headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={SignupScreen2} />
        <Stack.Screen name="signup-third" options={{headerTitle: () => <Logo/>,}} component={SignupScreen3} />
        <Stack.Screen name="user-type"  
        options={{ headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={UserTypeScreen} />
        <Stack.Screen name="setup"
          options={{ 
          headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
          headerBackVisible:false, headerTitleAlign: 'center'}}  
         component={SetUpScreen} />
        <Stack.Screen  name="setup-map"
            options={{ 
            headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}} 
            component={SetUpMap}/>
        <Stack.Screen name="categories" 
            options={{ 
            headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}} 
            component={Categories} />
        <Stack.Screen name="comments"  component={PostComments} />
        <Stack.Screen name="tabs" options={{headerShown: false}} component={MyTabs} />
        <Stack.Screen  name="posts" component={Posts} 
          options={{ 
            headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}}/>
        <Stack.Screen  name="events" component={Events} options={{ 
            headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
        <Stack.Screen  name="locals-map" component={LocalsMap} />
        <Stack.Screen  name="chat-screen" component={ChatScreen} />
        <Stack.Screen  name="edit-foreigner-profile" component={EditForeignerProfile} />
        <Stack.Screen  name="local-page" component={LocalPage} />
        <Stack.Screen  name="locals" component={Locals}   options={{ 
            headerLeft: () => (<Pressable><Ionicons name="chevron-back" size={30} color="#8C57BA"/></Pressable>),
            headerRight:()=>(
              <View style={{flexDirection:"row"}}>
              <Pressable style={{marginLeft:10}}><Ionicons name="location-sharp" size={25} color="#8C57BA"/></Pressable>
              <Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>
            </View> ),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
// {}

function MyTabs() {

  const { user, setUser} = useContext(UserContext);
  const navigation= useNavigation()
  const handleExit=async () =>{
      await AsyncStorage.clear();
      navigation.navigate("signin")
  }
  return (
    < Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#4BB0F9",
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
            </TouchableOpacity>)
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
          headerStyle: {height: 100},
          headerLeft: () => (
            <View style={{marginLeft:20, flexDirection:"row"}}>
              <Image source={user.profile_picture?{ uri:`http://192.168.1.7:8000/${user.profile_picture}`}: require('../../assets/blank-profile.webp')} style={{width:40, height:40, borderRadius:20}}/>
            </View>)
        }}
        
      />
    </Tab.Navigator>
  );
}