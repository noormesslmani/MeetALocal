import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EventsModalStyles = StyleSheet.create({
    centeredView: {
        flex:1,
        width:windowWidth,
        justifyContent: "center",
        alignItems: "center",
       
      },
      modalView: {
        marginTop: 0.15*windowHeight,
        backgroundColor: "white",
        width:windowWidth,
        flex:1,
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
        width:0.6*windowWidth,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
    },
    selectedImage:
    {height:0.2*windowHeight,
      width:0.6*windowWidth,
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
        color:"#8C57BA",
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
      borderColor:"#4BB0F9",
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
    borderBottomColor:"#4BB0F9",
    borderBottomWidth:0.5,
    marginBottom:20
  },
  button:{
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 1,
    marginTop:30,
    backgroundColor:"rgba(75, 176, 249, 0.5)"
  }
});
export default EventsModalStyles;