import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import image from '../../assets/profile.jpg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CommentsModalStyles from '../ComponentsStyles/CommentsModalStyles';
import EventsModalStyles from '../ComponentsStyles/EventsModalStyles';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../App'
import { categoriesOptions } from '../../constants/categories';
import DatePicker from '../General/datePicker';
import AppButton from '../Buttons/AppButtons';
const NewEventModal=({navigation, modalVisible, setModalVisible})=> {
    let hours
    let min
    const { user, setUser} = useContext(UserContext);
    const[title, setTtitle]=useState(null)
    const[details, setDetails]=useState(null)
    const[fees, setFees]=useState(null)
    const [place, setPlace]=useState(null)
    const [date, setDate]=useState(new Date());
    const [datePicker, setDatePicker]=useState(false)
    const [openCategory, setOpenCategory] = useState(false);
    const [selectedCategory, setSelectedCategory]=useState([])
    const [categories, setCategories] = useState(categoriesOptions);
    const [image, setImage] = useState(null);
    const [base64, setBase64]= useState(null)
    const [ext, setext]= useState(null)
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
    const handleDate= (event, value)=>{
        setDatePicker(false)
        setDate(value)
    }

    const hanldePress=()=>{
        if(image){
            setext(image.split('.').pop())
        }
        console.log(selectedCategory)
        createEvent()
    }
    async function createEvent(){
        const token = await AsyncStorage.getItem('@token')
        const data = {
            title:title,
            details: details,
            fees: parseInt(fees),
            categories:selectedCategory,
            place: place,
            date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            photo: base64,
            ext: ext,
            country: user.residence
        }
        console.log(data)
        axios({
          method: "post",
          data,
          headers: { Authorization: `Bearer ${token}`},
          url:'http://192.168.1.7:8000/api/v1.0.0/locals/event',
        })
        .then((response)=> {
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
          return response;
        })
        .catch(function (error) {
          console.warn(error)
        })
    }
  return (
    <Modal
        propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView style={EventsModalStyles.centeredView}>
            <KeyboardAvoidingView style={EventsModalStyles.modalView}>
                <Text style={EventsModalStyles.title}>Create New Event</Text>
                <View style={EventsModalStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
                }
                    <View style={EventsModalStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={EventsModalStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{width:"90%", margin:10, alignSelf:"center"}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                >
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Title *</Text>
                    <TextInput placeholder='Event title' style={EventsModalStyles.input} value={title} onChangeText={setTtitle}></TextInput>
                </View>
                
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Details *</Text>
                    <TextInput placeholder='Event details' style={EventsModalStyles.input} value={details} onChangeText={setDetails}></TextInput>
                </View>
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Fees *</Text>
                    <TextInput placeholder='Enter fees' style={EventsModalStyles.input} value={fees} onChangeText={setFees}></TextInput>
                </View>
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Categories*</Text>
                    <DropDownPicker
                    style={EventsModalStyles.optionsContainer}
                    zIndex={2000}
                    zIndexInverse={2000}
                    open={openCategory}
                    value={selectedCategory}
                    dropDownDirection="TOP"
                    items={categories}
                    setOpen={setOpenCategory}
                    setValue={setSelectedCategory}
                    setItems={setCategories}
                    listMode="SCROLLVIEW"
                    multiple={true}
                    mode="BADGE"
                    placeholder="Select a category"
                    placeholderStyle={{
                    color: "grey"
                    }}
                
                    closeAfterSelecting={true}
                    dropDownContainerStyle={{
                        width:"90%"
                    }}
                    />
                </View>
                <View style={EventsModalStyles.contentContainer}>
                    <Text>Where *</Text>
                    <TextInput placeholder='Event location' style={EventsModalStyles.input} value={place} onChangeText={setPlace}></TextInput>
                </View>
                <View style={EventsModalStyles.dateContainer}>
                    <Text style={{marginRight:"20%"}}>When *</Text>
                    <View style={{flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
                        <Text style={{fontSize:12}}>Date</Text>
                    <TouchableOpacity onPress={()=>setDatePicker(true)} style={{alignSelf:'center', marginLeft:5}}><Icon name="calendar" size={20}/></TouchableOpacity>
                        { datePicker && <DatePicker date={date} handleDate={handleDate} type={2} />}
                    </View>
                </View>
                <View style={EventsModalStyles.btnContainer}><AppButton text={'Create'} handlePress={hanldePress}/></View>
                </ScrollView> 
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    </Modal>
  )
}
export default NewEventModal