import { View, Pressable } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackArrow from '../components/Header/BackArrow';
import Posts from '../screens/General/Posts';
import Events from '../screens/General/Events';
import Locals from '../screens/General/Locals';
import ChatScreen from '../screens/General/ChatScreen';
import LocalsMap from '../screens/General/LocalsMap';
import EditForeignerProfile from '../screens/Profile/EditProfileForeigners';
import LocalPage from '../screens/General/LocalPage';
import PostComments from '../screens/General/Comments';
import TabNavigation from './TabStack';
const HomeStack=()=>{
  
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="tabs" options={{headerShown: false}} component={TabNavigation} />
        <Stack.Screen name="comments"  component={PostComments} />
        <Stack.Screen  name="posts" component={Posts} 
          options={{ 
            headerLeft: () => <BackArrow type={1} />,
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}}/>
        <Stack.Screen  name="events" component={Events} options={{ 
            headerLeft: () => <BackArrow type={1} />,
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
        <Stack.Screen  name="locals-map" component={LocalsMap} 
            options={{ 
                headerLeft: () => <BackArrow type={1} />,
                headerBackVisible:false, headerTitleAlign: 'center', headerTitle:'Map'}}
        />
        <Stack.Screen  name="chat-screen" component={ChatScreen} 
        options={{
            headerLeft: () => (<BackArrow type={1} />),
              headerBackVisible:false, headerTitle:""
          }}
        />
        <Stack.Screen  name="edit-foreigner-profile" component={EditForeignerProfile} />
        <Stack.Screen  name="local-page" component={LocalPage}
        options={{
          headerLeft: () => (<BackArrow type={1} />),
            headerBackVisible:false, headerTitle:""
        }}
        />
        <Stack.Screen  name="locals" component={Locals}   options={{ 
            headerLeft: () => <BackArrow type={1}/>,
            headerRight:()=>(
              <View style={{flexDirection:"row"}}>
              <Pressable style={{marginLeft:10}}><Ionicons name="location-sharp" size={25} color="#8C57BA"/></Pressable>
              <Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>
            </View> ),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
      </Stack.Navigator>
  );
}
export default HomeStack