import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, StyleSheet} from 'react-native'
import React from 'react'
const MapSearch=({handlePress})=> {
       
  return (
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    query={{
                    key: 'AIzaSyCoxD1F6k0dnxHoKGbCpjYo-O23mkBBvts',
                    language: 'en', // language of the results
                    }}
                    fetchDetails={true}
                    onPress={(data,details ) => handlePress(data,details)}
                    onFail={(error) => console.error(error)}
                    requestUrl={{
                    url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                    }} 
                />
        
  )
}
export default MapSearch
