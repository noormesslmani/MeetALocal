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
        width:widths.width9,
        flex:0.4,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        padding:20,
        justifyContent:"space-between",
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
        fontWeight:"500",
        fontSize:24

      },
      title:{
        fontSize:14,
        margin:20,
        marginVertical:10,
      },
      text:{
        fontSize:14,
        margin:20,
        textDecorationLine:"underline",
        color:'grey'
      },
      dateContainer:{
        alignItems:"center", 
        margin:10,

      },
      ButtonContianer:{
        flexDirection:"row",
        width:"75%",
        justifyContent:"space-between",
        alignItems:"center",
      },
      input:{
        width:"30%",
        borderBottomWidth:0.5,
        borderColor:colors.lightViolet
      }
      
});
export default ScheduleModalStyle;