import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = ''; // never save your real api key in a snack!

const MapSearch = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyCoxD1F6k0dnxHoKGbCpjYo-O23mkBBvts',
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
});

export default MapSearch;
