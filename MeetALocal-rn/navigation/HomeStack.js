import { View, Pressable } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackArrow from '../components/Header/BackArrow';
import Posts from '../screens/General/PostsScreen';
import Events from '../screens/General/EventsScreen';
import Locals from "../screens/General/Locals'ListScreen";
import ChatScreen from '../screens/General/ChatRoom';
import LocalsMap from "../screens/General/Locals'LocationsMap";
import EditForeignerProfile from '../screens/Profile/EditProfileForeigners';
import LocalPage from "../screens/General/Local'sPage";
import PostComments from '../screens/General/PostComments';
import TabNavigation from './TabStack';
import EditLocalProfile from '../screens/Profile/EditProfileLocals';
import { colors } from '../constants/colors';
import EditLocation from '../screens/Profile/EditLocation';
import Reviews from "../screens/General/Local'sReviews";
import ForeignerPage from "../screens/General/Foreigner'sPage";
const HomeStack=()=>{
  const navigation= useNavigation()
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="tabs" options={{headerShown: false}} component={TabNavigation} />

        <Stack.Screen name="comments"  component={PostComments} />
        <Stack.Screen  name="posts" component={Posts} 
          options={{ 
            headerLeft: () => <BackArrow type={1}  navigation={navigation}/>,
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}}/>
        <Stack.Screen  name="events" component={Events} options={{ 
            headerLeft: () => <BackArrow type={1} navigation={navigation}/>,
            headerRight:()=>(<Pressable><Ionicons name="filter" size={25} color="#8C57BA"/></Pressable>),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
        <Stack.Screen  name="locals-map" component={LocalsMap} 
            options={{ 
                headerLeft: () => <BackArrow type={1} navigation={navigation}/>,
                headerBackVisible:false, headerTitleAlign: 'center', headerTitle:'Map'}}
        />
        <Stack.Screen  name="chat-screen" component={ChatScreen} 
        options={{
            headerLeft: () => (<BackArrow type={1} navigation={navigation}/>),
              headerBackVisible:false, headerTitle:""
          }}
        />
        <Stack.Screen  name="edit-foreigner-profile" component={EditForeignerProfile} 
        options={{
          headerLeft: () => (<BackArrow type={1} navigation={navigation} />),
            headerBackVisible:false, headerTitle:"Edit Profile", headerTitleAlign:"center"
        }}/>
        <Stack.Screen  name="edit-local-profile" component={EditLocalProfile}
        options={{
          headerLeft: () => (<BackArrow type={1} navigation={navigation}/>),
            headerBackVisible:false, headerTitle:"Edit Profile", headerTitleAlign:"center"
        }} />
        <Stack.Screen  name="edit-location" component={EditLocation} 
        options={{
          headerLeft: () => (<BackArrow type={1} navigation={navigation} />),
            headerBackVisible:false, headerTitle:"Edit Location", headerTitleAlign:"center"
        }}
        />
        <Stack.Screen  name="local-page" component={LocalPage}
        options={{
          headerLeft: () => (<BackArrow type={2} navigation={navigation} />),
            headerBackVisible:false, headerTitle:"",
            headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
        }}
        />
        <Stack.Screen  name="foreigner-page" component={ForeignerPage}
        options={{
          headerLeft: () => (<BackArrow type={2} navigation={navigation}/>),
            headerBackVisible:false, headerTitle:"",
            headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
        }}
        />
        <Stack.Screen  name="reviews" component={Reviews}
        options={{
          headerLeft: () => (<BackArrow type={2} navigation={navigation}/>),
            headerBackVisible:false, headerTitle:"Reviews", headerTitleAlign:"center",
            headerStyle:{backgroundColor: colors.lightViolet}, headerShadowVisible:false,
        }}
        />
        <Stack.Screen  name="locals" component={Locals}   options={{ 
            headerLeft: () => <BackArrow type={1} navigation={navigation}/>,
            headerRight:()=>(
              <View style={{flexDirection:"row"}}>
              <Pressable style={{marginLeft:10}}><Ionicons name="location-sharp" size={25} color={colors.violet} /></Pressable>
              <Pressable><Ionicons name="filter" size={25} color={colors.violet} /></Pressable>
            </View> ),
            headerBackVisible:false, headerTitleAlign: 'center'}} />
      </Stack.Navigator>
  );
}
export default HomeStack