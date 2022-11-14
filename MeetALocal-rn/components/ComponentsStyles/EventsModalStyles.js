import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";
const windowHeight = Dimensions.get("window").height;
const EventsModalStyles = StyleSheet.create({
    centeredView: {
        flex:1,
        width:widths.width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        marginTop: 0.1*windowHeight,
        backgroundColor: "white",
        width:widths.width,
        flex:0.9,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        padding:20,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      container:{
        elevation:2,
        height:0.2*windowHeight,
        width:widths.width6,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
    },
    selectedImage:
    {height:0.2*windowHeight,
      width:widths.width6,
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
      borderBottomWidth:0.5,
      borderColor:colors.lightViolet,
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
    width:"100%",
    alignItems:"center",
    marginTop:30
  }
});
export default EventsModalStyles;