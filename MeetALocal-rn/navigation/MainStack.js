import * as React from 'react';
import { NavigationContainer, useNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
export default function RootNavigation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.violet,
      background:'white'
    },
  };
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="" screenOptions={{headerShown: false}}>
        <Stack.Screen name='auth' component={AuthStack}  />
        <Stack.Screen name='app' component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}