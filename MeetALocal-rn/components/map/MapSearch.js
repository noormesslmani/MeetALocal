import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React from 'react'
import { colors } from '../../constants/colors';
const MapSearch=({handlePress})=> {
       
  return (
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    query={{
                    key: 'AIzaSyCoxD1F6k0dnxHoKGbCpjYo-O23mkBBvts',
                    language: 'en', 
                    }}
                    fetchDetails={true}
                    onPress={(data,details ) => handlePress(data,details)}
                    onFail={(error) => console.error(error)}
                    listUnderlayColor={colors.lightViolet}
                    styles={{textInput: {
                      height: 38,
                      fontSize: 16,
                    },
                  }}
                    requestUrl={{
                    url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                    }} 
                />
        
  )
}
export default MapSearch
