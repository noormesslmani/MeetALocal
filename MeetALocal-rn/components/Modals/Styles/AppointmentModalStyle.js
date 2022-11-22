import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const AppointmentsModalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        backgroundColor: "white",
        width:widths.width9,
        flex:0.8,
        borderRadius: 15,
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
        fontSize:26,
        marginBottom:30
      },
      bookBtn:{
        marginVertical:10,
        width:widths.width6,
        height:55,
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    btnContainer:{
      width:widths.width6,
      flexDirection:"row",
      justifyContent:"space-between"
    }
      
});
export default AppointmentsModalStyle;