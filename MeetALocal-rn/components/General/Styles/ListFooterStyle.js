import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";

const ListFooterStyle = StyleSheet.create({
  contianer:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:10
  },
  text:{
    color:colors.lightGrey,
    fontSize:12
  }

});
export default ListFooterStyle;