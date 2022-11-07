import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";

const CommentsModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 0.15*widths.width,
    backgroundColor: "white",
    width:widths.width,
    flex:0.9,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  headerContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:widths.width9,
    padding:10,
    paddingBottom:0
  },
  image:{
    width:50,
    height:50,
    borderRadius:25
  },
  details:{
  fontSize:11, 
  margin:10, 
  fontWeight:"300", 
  alignSelf:"flex-start",
  },
  separator:{
  borderBottomColor: 'grey',
  borderBottomWidth: 0.3,
  width: widths.width,
  },
  addComment:{
  height:50,
  justifyContent:"center",
  padding:5,
  width:"95%",
  borderRadius:10,
  borderColor:"grey",
  borderWidth:0.5,
  marginBottom:10
  },
  userName:{fontSize:10, marginLeft:10, fontWeight:"600"},
  userCountry:{fontSize:10, marginLeft:10},
  center:{alignItems:"center"},
  totalComments:{fontSize:10, fontWeight:"300", marginBottom:3,marginLeft:10, alignSelf:"flex-start"},
  scrollView:{marginBottom:10},
  pressable:{position:"absolute", right:20}

});
export default CommentsModalStyles;