import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React from 'react';
import HomeStyles from '../Styles/HomeStyles';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import LocalsStyles from '../Styles/LocalsPageStyles';
import FilterModal from '../../../components/Modals/FilterModal';
import LocalCard from '../../../components/Cards/LocalCard';
import Filters from '../../../components/Header/Filters';
import { getLocals, getFavorites } from '../../../network/App';
import Map from '../../../components/Header/Map';
import { colors } from '../../../constants/colors';
import ListFooter from '../../../components/General/ListFooter';
import {  useIsFocused } from '@react-navigation/native';
import AppButton from '../../../components/Buttons/AppButtons';
import EmptyPage from '../../../components/General/EmptyPage';
import ListHeader from '../../../components/General/ListHeaders';
const Locals=({navigation})=> {
  //data fitltering
  const [country, setCountry]=useState('all');
  const [category, setCategory]=useState('all');

  //view all or only favorites
  const [viewFav, setViewFav]=useState(false);
  const [viewFavChange, setViewFavChange]=useState(false);

  //queried data
  const [data, setdata]=useState([]);

  //for filter modal
  const [modalVisible, setModalVisible] = useState(false);
  const [filterChange, setFilterChange]=useState(false);

  const [isListEnd, setIsListEnd]=useState(false);
  const [isLoadingMore, setIsLoadingMore]=useState(false);
  const [isLoading, setIsLoading]= useState(false);
  const [page, setPage]=useState(0);

  const { user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    navigation.setOptions({
      headerRight:()=>(<View style={{flexDirection:"row"}}>
      {!viewFav && <Filters handleFilter={handleFilter}/>}
      {user.type_id==2 && <Map handleMap={handleMap} />}
      </View>)
    });
  }, [navigation, data, viewFav]);


  //get posts when options change
  useEffect(() => {
    if(filterChange || viewFavChange){
      page==0? getLocalsList(): setPage(0);
      setdata([]);
      setIsListEnd(false);
      setFilterChange(false);
      setViewFavChange(false);
    }
  }, [filterChange, viewFavChange]); 

  //get locals when page changes (15 per page)
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused)  {
      getLocalsList();
    }
    else{
      setdata([]);
      setPage(0);
      setIsLoading(true);
    }
  },[isFocused, page]);

  
  //getting locals
  const getLocalsList= async()=>{
    if(!viewFav){
      page==0? setIsLoading(true): setIsLoadingMore(true);
      const result = await getLocals({country, category, offset:15*page});
      if (result.success){
        setIsLoading(false);
        setIsLoadingMore(false);
        setdata( data =>[...data, ...result.data.data]);
        if(result.data.data.length<15){
          setIsListEnd(true);
        }  
      }
    }
    else{
      setIsLoading(true);
      const result = await getFavorites();
      if (result.success){
        setIsLoading(false);
        setdata(result.data.data);
        setIsListEnd(true);
      }
    }
  } 

  //filter modal
  const handleFilter=()=>{
    setModalVisible(true);
  }

  //navigate to map after loading data
  const handleMap=()=>{
    if(!isLoading){
      navigation.navigate('locals-map',{data: data, type:1});
    }
  }

  //update page after each query
  const fetchMore=()=>{
    if(!isListEnd && !isLoadingMore){
      setPage(page+1);
    }
  }
 
  //get all locals
  const handleViewAll=()=>{
    setViewFav(false);
    setViewFavChange(true);
  }

  //get favorite locals
  const handleViewFav=()=>{
    setViewFav(true);
    setViewFavChange(true);
  }
  
  return (
      <View style={HomeStyles.container}>
         
        {user.type_id==2 && <View style={LocalsStyles.view}>
            <AppButton text='View All' handlePress={handleViewAll} type={viewFav?2:1} />
            <AppButton text='Favorites' handlePress={handleViewFav} type={viewFav?1:2} />
        </View>}
        <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} setCategory={setCategory} setFilterChange={setFilterChange}/>
       
        <SafeAreaView style={LocalsStyles.listContainer}>
        {!isLoading && data.length==0? <EmptyPage />:null}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item}) => (<LocalCard item={item}  navigation={navigation}/>)}
            style={LocalsStyles.list}
            contentContainerStyle={{ paddingBottom: 300}}
            ListHeaderComponent={isLoading?<ActivityIndicator color={colors.violet} />: !viewFav? <ListHeader country={country} category={category}/>:null}
            onEndReachedThreshold={0.1}
            onEndReached={!viewFav && fetchMore}
            ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} isListEnd={isListEnd} />}
          />
        </SafeAreaView>
      </View>
    )
}
 
export default Locals