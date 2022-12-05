import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const NotificationStyle = StyleSheet.create({
  container:{
    width:widths.width9,
    padding:10,
  },
  dateContainer:{
    marginVertical:10,
    width:"100%",
    alignItems:"flex-end"
  },
  content:{
    color:"grey",
    fontWeight:"500",
    fontSize:15
  },
  date:{
    fontSize:10,
    color:"grey"
  },
  separator:{
    width:widths.width,
    borderColor:colors.lightGrey,
    borderWidth:0.4
  }

});
export default NotificationStyle;