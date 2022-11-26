import {Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddIconStyle from './Styles/AddIconStyle';
const AddIcon=({handlePress})=>{

    //icon for adding new posts, events,...
    return(
        <Pressable onPress={handlePress} style={AddIconStyle.addIcon} >
            <Icon name= 'plus' size={50} color={colors.lightViolet} />
        </Pressable>
    )
}
export default AddIcon