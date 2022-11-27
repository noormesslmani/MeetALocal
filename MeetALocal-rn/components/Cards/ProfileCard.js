import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';
import ProfileCardStyle from './Styles/ProfileCardStyle';
const ProfileCard=({icon, data})=> {
  //carrying info displayed on user's profile pages
  return (<>
            <View style={ProfileCardStyle.card}>
                <Icon name={icon} size={20} color={colors.mediumViolet} />
                {icon=='language'? data.map((language, index)=><Text key={index} style={ProfileCardStyle.arr}>{language}</Text>):
                <Text style={[ProfileCardStyle.data, icon==null? ProfileCardStyle.about:null]}>{data}</Text>}
            </View>
    </>
  )
}
export default ProfileCard