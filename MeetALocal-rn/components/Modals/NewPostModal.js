import { View, Text, Modal, ActivityIndicator} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import CountryPicker from '../General/CountryPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppButton from '../Buttons/AppButtons';
import { createNewPost } from '../../network/App';
import { TextInput } from 'react-native-paper';
import NewPostModalStyle from './Styles/NewPostModalStyle';
import CategoryPicker from '../General/CategoryPicker';
import { colors } from '../../constants/colors';
const NewPostModal=({navigation, modalVisible, setModalVisible, setPostAdded })=> {
    const [selectedCountry, setSelectedCountry]=useState(null)
    const [selectedCategory, setSelectedCategory]=useState([])
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [details, setDetails]= useState(null)
    const [invalidDetails, setInvalidDetails]= useState(false)
    const [invalidCountry, setInvalidCountry]= useState(false)
    const [invalidCategory, setInvalidCategory]= useState(false)

    const [isLoading, setIsLoading]=useState(false)
    const handleSubmit=()=>{
        setInvalidCategory(false)
        setInvalidCountry(false)
        setInvalidDetails(false)
        if(! details){
          setInvalidDetails(true)
          setTimeout(() => {
            setInvalidDetails(false);
          }, 1500);
        }
        else if(! selectedCountry){
          setInvalidCountry(true)
          setTimeout(() => {
            setInvalidCountry(false);
          }, 1500);
        }
        else if(selectedCategory.length==0){
          setInvalidCategory(true)
          setTimeout(() => {
            setInvalidCategory(false);
          }, 1500);
        }
        if(details && selectedCountry && selectedCategory.length>0){
            createPost() 
        } 
    }
    const createPost= async()=>{
      setIsLoading(true)
      const result = await createNewPost({ details,country: selectedCountry,category: selectedCategory})
      if (result.success){
        setModalVisible(false)
        setPostAdded(true)
      }
      setIsLoading(false)
    }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);}}>
        <View style={NewPostModalStyle.centeredView}>
            <View style={NewPostModalStyle.modalView}>
            <KeyboardAwareScrollView style={{width:"100%"}}>
              <View style={{alignItems:"center", width:"100%"}}>
                <Text style={NewPostModalStyle.title}>Create New Post</Text>
                <View style={NewPostModalStyle.contentContainer}>
                    <Text>Post *</Text>
                    <TextInput placeholder='new post' style={NewPostModalStyle.input} value={details} onChangeText={setDetails}
                      underlineColor={colors.lightViolet} activeUnderlineColor={colors.mediumViolet} multiline={true} numberOfLines={2} textAlign="center"  />
                      {invalidDetails && <Text style={NewPostModalStyle.error}>Please enter a valid text</Text>}
                </View>
                <View style={{width:"90%",marginBottom:40}}>
                    <Text >Select a country *</Text>
                    <CountryPicker 
                    open={openCountry}
                    value={selectedCountry}
                    setOpen={setOpenCountry}
                    setValue={setSelectedCountry}
                    />
                    
                    {invalidCountry && <Text style={NewPostModalStyle.error}>Please select a country</Text>}
                </View >
                <View style={{marginTop:10, width:"90%"}}>
                    <Text>Select Categories * (max 3)</Text>
                    <CategoryPicker 
                    open={openCategory}
                    value={selectedCategory}
                    setOpen={setOpenCategory}
                    setValue={setSelectedCategory}
                    multiple={true}
                    />
                    {invalidCategory && <Text style={NewPostModalStyle.error}>Please select a least 1 categroy</Text>}
                </View>
                {isLoading && <ActivityIndicator color={colors.violet} />}
                <View style={NewPostModalStyle.buttonContainer}>
                  <AppButton text={'Submit'} handlePress={handleSubmit} />
                  <AppButton text={'Cancel'} handlePress={()=>setModalVisible(false)} />
                </View>
                </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    </Modal>
  )
}
export default NewPostModal