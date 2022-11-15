import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";
import { colors } from "../../constants/colors";
const windowHeight = Dimensions.get("window").height;
const AppointmentsModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        backgroundColor: "white",
        width:widths.width9,
        flex:0.8,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        padding:20,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      title:{
        fontSize:30
      },
      bookBtn:{
        marginVertical:10,
        width:widths.width7,
        height:55,
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
      
});
export default AppointmentsModalStyles;