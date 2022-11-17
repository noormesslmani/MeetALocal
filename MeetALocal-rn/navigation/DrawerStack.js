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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalProfile from '../screens/Profile/LocalProfile'
import Bookings from '../screens/General/Bookings';
import Schedules from '../screens/General/Schedules';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
const DrawerNavigation=()=>{
    const Drawer = createDrawerNavigator();
    const { user, setUser} = useContext(UserContext);
    const navigation= useNavigation()
    const handleExit=async (props) =>{
      await AsyncStorage.clear();
      props.navigation.navigate("auth")
  }
  return (
    < Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={ () => handleExit(props)} />
        </DrawerContentScrollView>
      )
    }}> 
      <Drawer.Screen name='home' component={Home}
      options={{headerTitle:'Welcome',
        headerTitleAlign: 'center', headerTitleStyle:{fontSize:40, color:"white"}, headerStyle:{backgroundColor: colors.lightViolet},
        headerShadowVisible:false
      }}
      />
      {user.type_id==1 && <Drawer.Screen
        name="profile"
        component={LocalProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center', headerTitle:'Profile'
        }}
      />}
      {user.type_id==2 && <Drawer.Screen
        name="profile"
        component={ForeignerProfile}
        options={{
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
          headerTitleAlign: 'center', headerTitle:'profile'
        }}
      />}
      {user.type_id==1 && <Drawer.Screen
        name="appointments"
        component={Schedules}
        options={{
          headerTitle:"Schedule", headerTitleAlign:"center", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
        }}
        
      />}
      {user.type_id==2 && <Drawer.Screen
        name="bookings"
        component={Bookings}
        options={{
          headerTitle:"Bookings", headerTitleAlign:"center", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
        }}
        
      />}
    </Drawer.Navigator>
  );
}
export default DrawerNavigation


