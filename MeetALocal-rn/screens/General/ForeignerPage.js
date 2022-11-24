import { View, Text, TouchableOpacity, Image, ScrollView, Pressable, Linking } from 'react-native'
import React from 'react'
import { useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import LocalProfileStyles from './Styles/LocalProfileStyles';
import { address } from '../../constants/address';
import { colors } from '../../constants/colors';
import BackArrow from '../../components/Header/BackArrow';
import ProfileCard from '../../components/Cards/ProfileCard';
import Toast from 'react-native-toast-message';
const ForeignerPage=({navigation})=> {
  const route = useRoute();
  const item =route.params.item

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <><BackArrow navigation={navigation} type={2}/>
      <Text style={LocalProfileStyles.headerText}>{item.name}</Text>
      </>,
      headerStyle:{backgroundColor: colors.lighterViolet}, headerShadowVisible:false,
    });
  }, [navigation]);
 
  const handleMessage=()=>{
    navigation.navigate('chat-screen', { chatId: null, userId: item.id, image:item.profile_picture, name:item.name})
  }
return (
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
        <Toast/>
        <View style={LocalProfileStyles.mainContainer}>

          <View style={LocalProfileStyles.imageContainer}>
            <Image source={item.profile_picture?{ uri:`${address}/${item.profile_picture}`}: require('../../assets/blank-profile.webp')} style={LocalProfileStyles.image}/>
            <View style={{margin:15}}>
              <Text style={LocalProfileStyles.name}>{item.name}</Text>
            </View>
          </View>

          <View style={LocalProfileStyles.infoContainer}>
            <View style={LocalProfileStyles.likesContainer}>
              <Pressable style={LocalProfileStyles.message} onPress={handleMessage}><Text style={{color:"white"}}>Message</Text></Pressable>
            </View>
          </View>
 

          <View style={LocalProfileStyles.separator} />

          <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>Basic Info</Text>
            <ProfileCard icon={'language'} data={item.languages} />
            <ProfileCard icon={'birthday-cake'} data={item.date_of_birth} />
            <ProfileCard icon={'flag'} data={item.nationality}/>
            <ProfileCard icon={'map-pin'} data={item.residence} />
            <ProfileCard icon={'user'} data={item.gender} />
          </View>

          {item.about && <View style={LocalProfileStyles.sectionContainer}>
            <Text style={LocalProfileStyles.sectionTitle}>About</Text>
            <ProfileCard icon='info' data={item.about} />
          </View>} 

        </View>
    </ScrollView>
    
  )
}
export default ForeignerPage