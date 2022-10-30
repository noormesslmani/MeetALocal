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
import ForeignerHome from '../Foreigners/Home';

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
        <Stack.Screen name="foreigner-home" options={{headerTitle: () => <Logo/>, headerBackVisible:false}} component={ForeignerHome} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}