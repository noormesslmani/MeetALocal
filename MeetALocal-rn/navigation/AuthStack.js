import * as React from 'react';
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack'
import SetUpScreen from '../screens/Auth/SetUpScreen';
import SigninScreen from '../screens/Auth/SigninScreen';
import SetUpMap from '../screens/Auth/SetUpMapScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SignupScreen2 from '../screens/Auth/SignupScreen2';
import SignupScreen3 from '../screens/Auth/SignupScreen3';
import Categories from '../screens/Auth/Categories';
import UserTypeScreen from '../screens/Auth/UserTypeScreen';
import Logo from '../screens/Navigation/Logo';
import BackArrow from '../components/Header/BackArrow';
import { colors } from '../constants/colors';
const AuthStack=()=>{
    const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator  initialRouteName="">
        <Stack.Screen name="signin" options={{headerTitle: () => <Logo/>,headerBackVisible:false, headerTitleAlign: 'center'}} component={SigninScreen} />
        <Stack.Screen name="signup-first" 
        options={{ 
          headerTitle: () => <Logo/>,
          headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={SignupScreen} />
        <Stack.Screen name="signup-second"
        // options={{ 
        //   headerLeft: () => (<BackArrow type={1}/>),
        //   headerTitle: () => <Logo/>,
        //   headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={SignupScreen2} />
        <Stack.Screen name="signup-third" 
        options={{ 
          headerLeft: () => (<BackArrow type={1} />),
          headerTitle: () => <Logo/>,
          headerBackVisible:false, headerTitleAlign: 'center'}} 
         component={SignupScreen3} />
        <Stack.Screen name="user-type"  
        options={{ headerBackVisible:false, headerTitleAlign: 'center'}} 
        component={UserTypeScreen} />
        <Stack.Screen name="setup"
          options={{ 
          headerLeft: () => (<BackArrow type={2}/>),
          headerBackVisible:false, headerTitleAlign: 'center', headerTitle:'Account Setup', headerTintColor:'white', headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false}}  
         component={SetUpScreen} />
        <Stack.Screen  name="setup-map"
            options={{ 
            headerLeft: () =>(<BackArrow type={2}/>),
            headerBackVisible:false, headerTitleAlign: 'center', headerTitle:'Location Setup', headerTintColor:'white', headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false}} 
            component={SetUpMap}/>
        <Stack.Screen name="categories" 
            options={{ 
            headerLeft: () =>(<BackArrow type={2}/>),
            headerBackVisible:false, headerTitleAlign: 'center', headerTitle:'Categories', headerTintColor:'white', headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false}} 
            component={Categories} />
       
      </Stack.Navigator>
      )
}
export default AuthStack