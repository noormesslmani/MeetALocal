import { View, FlatList, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext, useCallback } from "react";
import LocalCard from '../../components/Cards/LocalCard';
import { Searchbar } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import WavyBack from '../../components/General/WavyBackground';
import { searchLocals } from '../../network/App';
import { useFocusEffect } from '@react-navigation/native';
import SearchPageStyles from './Styles/SearchPageStyles';
import EmptyPage from '../../components/General/EmptyPage';
import Toast from 'react-native-toast-message'
const SearchScreen=({navigation})=> {
  const [data, setdata]=useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [searchQuery, setSearchQuery] = useState(null);
  const [searched, setSearched]=useState(false)
  
  navigation.setOptions({
    headerTitle: () => <Searchbar placeholder="Search" onChangeText={setSearchQuery}
    value={searchQuery} style={{width:widths.width8}} 
    />,  headerTitleAlign: 'center'  })
    
    //reset data
    useFocusEffect(
      useCallback(() => {
        setSearchQuery(null)
        setSearched(false)
        setdata(null)
      }
      , []), )
    
    //trigger search on searchquery change
    useEffect(()=>{
      searchQuery && getSearchedLocals()
    },[searchQuery])

  //get results
  const getSearchedLocals=async ()=>{
    setSearched(false)
    setIsLoading(true)
    const result = await searchLocals(searchQuery)
    if (result.success){
      setSearched(true)
      setdata(result.data.data)
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      });
    }
    setIsLoading(false)
  }
const renderItem = ({ item, index }) => (
  <LocalCard item={item}  navigation={navigation}/>
);

  return (
      <View style={HomeStyles.container}>
        <WavyBack />
        <SafeAreaView style={SearchPageStyles.listContainer}>
        {!isLoading && data && data.length==0? <EmptyPage />:null}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={SearchPageStyles.list}
            contentContainerStyle={{ paddingBottom: 100}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:data && data.length>0?<Text>Search results</Text>:null}
            ListHeaderComponentStyle={{alignItems:"center", justifyContent:"center"}}
          />
           
        </SafeAreaView>
        <Toast/>
      </View>
    )
}
 
export default SearchScreen