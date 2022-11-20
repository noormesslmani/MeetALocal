import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const NewEventModalStyles = StyleSheet.create({
  centeredView: {
      flex:1,
      width:widths.width,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgb(0,0,0)',
      backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalView: {
    marginVertical: 0.1*windowHeight,
    backgroundColor: "white",
    width:widths.width,
    flex:1,
    alignSelf:"center",
    alignItems:"center",
    padding:20,
    borderRadius:20
  },
  container:{
    elevation:2,
    height:0.25*windowHeight,
    width:widths.width8,
    backgroundColor:'#efefef',
    position:'relative',
    overflow:'hidden',
    marginBottom:20
  },
  selectedImage:
  {height:0.25*windowHeight,
    width:widths.width7,
  },
  uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center'
  },
  title:{
      fontSize:25,
      marginBottom:40
  },
  contentContainer:{
      marginTop:"5%",
      width:"90%"
  },
  input:{
    marginTop:10,
    height:30,
    width:"100%",
    backgroundColor:"white",
    marginBottom:20
  },
  dateContainer:{
    marginTop:20,
    width:"55%",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center"
  },
  optionsContainer:{
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    borderBottomColor:colors.lightViolet,
    borderBottomWidth:0.5,
    marginBottom:20
  },
  btnContainer:{
    alignItems:"center",
    marginTop:30,
    width:widths.width6, 
    flexDirection:"row", 
    justifyContent:"space-between"
  }
});
export default NewEventModalStyles;