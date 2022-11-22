import Toast from 'react-native-toast-message'
import React from 'react'
const ErrorToast=()=>{
    Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      });
    return(
        <Toast  />
    )
}
export default ErrorToast