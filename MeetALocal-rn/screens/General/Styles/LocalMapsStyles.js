import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const LocalsMapStyles = StyleSheet.create({
      modalView: {
        backgroundColor: "white",
        width:widths.width,
        flex:1,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:"space-between"
      },
      mapContainer:{
        width:widths.width,
        alignItems:"center",
        backgroundColor:"white",
        flex:1,
        justifyContent:"space-between"
      },
      map:{
        width:"100%",
        height:"100%",
      },
      title:{
        color:colors.violet,
        fontSize:22,
      },
      close:{
        position:"absolute",
        left:"100%",
        top:"4%"
      }
     
});
export default LocalsMapStyles;