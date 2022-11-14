import { View, FlatList, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import HomeStyles from './Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import LocalCard from '../../components/Cards/LocalCard';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../constants/colors';
import { widths } from '../../constants/dimensions';
import WavyBackground from "react-native-wavy-background";
import { searchLocals } from '../../network/App';
import LocalsStyles from './Styles/LocalsPageStyles';
const SearchScreen=({navigation})=> {
  const [data, setdata]=useState([])
  const [isLoading, setIsLoading]= useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched]=useState(false)
   

  const handleSearch=()=>{
    console.log(searchQuery)
    getSearchedLocals()

  } 
  const getSearchedLocals=async ()=>{
    setSearched(false)
    setIsLoading(true)
    const result = await searchLocals(searchQuery)
    if (result.success){
      setIsLoading(false)
      setSearched(true)
      console.log(result.data.data)
      setdata(result.data.data)
    }
  }
const renderItem = ({ item, index }) => (
  <LocalCard item={item}  navigation={navigation}/>
);
console.log(data)
  return (
      <View style={HomeStyles.container}>
        <View
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
          }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={30}
            frequency={1}
            offset={110}
            color= {colors.lighterViolet}
            top
          />
        </View>
        <Searchbar placeholder="Search" onChangeText={setSearchQuery}
        value={searchQuery} style={{width:widths.width8, position:"absolute"}} onSubmitEditing={handleSearch}
        />

        <SafeAreaView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            style={[LocalsStyles.list,{marginTop:100}]}
            contentContainerStyle={{ paddingBottom: 100}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />:data.length>0?<Text>Search results</Text>:data.length==0?<Text>Nothing to display</Text>:null}
            ListHeaderComponentStyle={{alignItems:"center", justifyContent:"center"}}
          />
           
        </SafeAreaView>
      </View>
    )
}
 
export default SearchScreen