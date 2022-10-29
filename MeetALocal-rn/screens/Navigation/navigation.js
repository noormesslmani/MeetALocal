import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';
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
export default function RootNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="signin" options={{headerTitle: () => <Logo/>,}} component={SigninScreen} />
        <Stack.Screen name="signup-first" component={SignupScreen} />
        <Stack.Screen name="signup-second" component={SignupScreen2} />
        <Stack.Screen name="signup-third" component={SignupScreen3} />
        <Stack.Screen name="user-type" component={UserTypeScreen} />
        <Stack.Screen name="setup" component={SetUpScreen} />
        <Stack.Screen name="categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}