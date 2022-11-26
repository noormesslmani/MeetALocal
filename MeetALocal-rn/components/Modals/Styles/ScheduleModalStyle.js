import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";
const ScheduleModalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        backgroundColor: "white",
        width:widths.width7,
        height:"auto",
        borderRadius: 20,
        textAlign:"center",
        shadowColor: "#000",
        padding:30,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalTitle: {
        textAlign: "center",
        fontWeight:"400",
        fontSize:20,
      },
      detailsContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:25
      },
      profileImage:{
        width:24,
        height:24,
        borderRadius:12,
        marginRight:10
      },
      bookerContainer:{
        flexDirection:"row"
      },
      icon:{
        marginRight:20
      },
      text:{
        fontWeight:"500",
        color:"#525252"
      }

      
});
export default ScheduleModalStyle;