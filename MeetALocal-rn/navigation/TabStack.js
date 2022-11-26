import { View,  Image, } from 'react-native';
import * as React from 'react';
import { useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UserContext } from '../App';
import Chats from '../screens/General/ChatsScreen';
import { colors } from '../constants/colors';
import { address } from '../constants/address';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from '../screens/General/SearchScreen';
import Home from '../screens/General/HomeScreen';
import LocalProfile from '../screens/Profile/LocalProfile'
import Bookings from '../screens/General/ForeignerBookings';
import ForeignerProfile from '../screens/Profile/ForeignersProfile';
import Schedules from "../screens/General/Local'sSchedules";
const TabNavigation=()=>{
    const Tab = createBottomTabNavigator();
    const { user, setUser} = useContext(UserContext);
  
  return (
    < Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: colors.violet,
        
      }}
      >
      <Tab.Screen name='home' component={Home}
      options={{
        tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        headerTitle:'Welcome',
        headerTitleAlign: 'center', headerTitleStyle:{fontSize:40, color:"white"}, headerStyle:{backgroundColor: colors.lightViolet},
        headerShadowVisible:false
      }}
      />
  
      {user.type_id==2 && <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
          headerTitle:"", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
        }}
        
      />}
      {user.type_id==1 && <Tab.Screen
        name="appointments"
        component={Schedules}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
          headerTitle:"Schedule", headerTitleAlign:"center", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
        }}
        
      />}
      {user.type_id==2 && <Tab.Screen
        name="bookings"
        component={Bookings}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
          headerTitle:"Bookings", headerTitleAlign:"center", 
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
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
          headerBackVisible:false,  headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
          headerLeft: () => (
            <View style={{marginLeft:20, flexDirection:"row"}}>
              <Image source={user.profile_picture?{ uri:`${address}/${user.profile_picture}`}: require('../assets/blank-profile.webp')} style={{width:40, height:40, borderRadius:20}}/>
            </View>)
        }}
      />
       {user.type_id==1 && <Tab.Screen
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
      {user.type_id==2 && <Tab.Screen
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
    </Tab.Navigator>
  );
}
export default TabNavigation