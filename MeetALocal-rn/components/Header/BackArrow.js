import { Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
const BackArrow=({navigation, type})=>{

    return(
        <>
        {type==1 && <Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color={colors.violet}/></Pressable>}
        {type==2 && <Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={30} color='white'/></Pressable>}
        </>
    )
}

export default BackArrow