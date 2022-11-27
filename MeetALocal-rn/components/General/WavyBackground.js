import WavyBackground from "react-native-wavy-background";
import { View } from 'react-native';
import React from 'react';
import { colors } from "../../constants/colors";
const WavyBack=()=>{
    return(
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
            offset={70}
            color= {colors.lightViolet}
            top
          />
        </View>
    )
}
export default WavyBack