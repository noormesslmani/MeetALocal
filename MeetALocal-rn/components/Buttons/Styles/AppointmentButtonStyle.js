import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
// import { colors } from "../../../constants/colors";

const AppointmentButtonStyle = StyleSheet.create({
    bookBtn:{
        marginVertical:10,
        flexDirection:"row",
        width:widths.width7,
        height:55,
        paddingHorizontal:0.1*widths.width,
        justifyContent:"space-between",
        backgroundColor:'white',
        borderColor:"#8C57BA",
        borderRadius:10,
        alignItems:"center",
        shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 3
    },
    pressedBtn:{
        backgroundColor:"#e2d2ef", 
    },
    date:{
        fontSize:16,
        fontWeight:"600"
    }
   
});
export default AppointmentButtonStyle;