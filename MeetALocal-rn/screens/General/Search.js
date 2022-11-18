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
import LocalsStyles from './Styles/LocalsPageStyles';
import { useFocusEffect } from '@react-navigation/native';
const SearchScreen=({navigation})=> {
  const [data, setdata]=useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [searchQuery, setSearchQuery] = useState(null);
  const [searched, setSearched]=useState(false)
  
  navigation.setOptions({
    headerTitle: () => <Searchbar placeholder="Search" onChangeText={setSearchQuery}
    value={searchQuery} style={{width:widths.width8}} onSubmitEditing={handleSearch}
    />,  headerTitleAlign: 'center'  })
    
    useFocusEffect(
      useCallback(() => {
        setSearchQuery(null)
        setSearched(false)
        setdata(null)
      }, []), )


  const handleSearch=()=>{
    getSearchedLocals()

  } 
  const getSearchedLocals=async ()=>{
    setSearched(false)
    setIsLoading(true)
    const result = await searchLocals(searchQuery)
    if (result.success){
      setIsLoading(false)
      setSearched(true)
      setdata(result.data.data)
    }
  }
const renderItem = ({ item, index }) => (
  <LocalCard item={item}  navigation={navigation}/>
);
console.log(data)
  return (
      <View style={HomeStyles.container}>
        <WavyBack />
        <SafeAreaView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            style={[LocalsStyles.list,{marginTop:100}]}
            contentContainerStyle={{ paddingBottom: 100}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:data && data.length>0?<Text>Search results</Text>:data && data.length==0?<Text>Nothing to display</Text>:null}
            ListHeaderComponentStyle={{alignItems:"center", justifyContent:"center"}}
          />
           
        </SafeAreaView>
      </View>
    )
}
 
export default SearchScreen