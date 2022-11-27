import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UploadImageStlye from './Styles/UploadImageStyle';
export default function UploadImage({setBase64, setext, uri=null}) {
  const [image, setImage] = useState(null);
  useEffect(()=>{
    setImage(uri);
  },[uri]);
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
  //set image extension
  useEffect(()=>
  { 
    image? setext(image.split('.').pop()):null
  },[image]);
  
  return (
            <View style={UploadImageStlye.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={UploadImageStlye.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={UploadImageStlye.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}
