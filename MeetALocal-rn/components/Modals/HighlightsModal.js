import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useRef } from "react";
import { colors } from '../../constants/colors';
import AppButton from '../Buttons/AppButtons';
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import HighlightsModalStyle from './Styles/HighlightsModalStyle';
import { UserContext } from '../../App';
import { addHighlight } from '../../network/App';
import * as ImagePicker from 'expo-image-picker';
const HighlightsModal=({navigation, setModalVisible, modalVisible, highlights})=> {
    const { user, setUser} = useContext(UserContext);
    const [base64, setBase64]= useState(null)
    const [ext, setext]= useState(null)
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading ]=useState(false)
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        });
        if (!_image.cancelled) {
            setImage(_image.uri);
        }
        setBase64(_image.base64)
    }
    useEffect(()=>{
        if(image){
            setext(image.split('.').pop())
        }
    },[image])
    const handleSave=async ()=>{
        if(image){
            setIsLoading(true)
            const data={
                photo: base64,
                ext,
            }
            const result= await addHighlight(data)
            if(result.success){
                setUser({...user,highlights:[...highlights, result.data.data]})
                setImage(null)
                setModalVisible(false)
                setIsLoading(false)
            }

        }
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={HighlightsModalStyle.centeredView}>
        <View style={HighlightsModalStyle.modalView}>
            <Text style={HighlightsModalStyle.title} >Highlights</Text>
        
            <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={highlights.length<4?[...highlights, image,'icon']: highlights}
            renderItem={({ item, index })=>
            <View>
                {item == 'icon' && !image? <Pressable onPress={addImage} style={HighlightsModalStyle.addImage}><Icon name='plus' color={colors.lightGrey} size={60} /></Pressable> : <Image source={image && item==image?{uri: `${image}`}: {uri: `${address}/${item}`}} style={HighlightsModalStyle.highlightImage} /> }
            </View>
            }
            numColumns={2}
            Key={2}
            style={HighlightsModalStyle.list}          
            />
            {isLoading && <ActivityIndicator color={colors.violet} /> }
            <View style={HighlightsModalStyle.btnContainer} >
                <AppButton text={'Save'} handlePress={handleSave}/>
                <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)} />
            </View>
        </View>
      </View>
    </Modal>
  )
}
export default HighlightsModal