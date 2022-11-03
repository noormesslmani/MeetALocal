import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EventsModalStyles = StyleSheet.create({
    centeredView: {
        height:windowHeight,
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
        height:"30%",
        width:0.7*windowWidth,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
        alignItems:"center",
        justifyContent:'center',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
    },
    title:{
        fontSize:25,
        color:"#8C57BA",
        marginBottom:40
    },
    contentContainer:{
        marginTop:"10%",
        width:"90%"
      },
      input:{
        marginTop:10,
        height:50,
        width:"100%",
        borderBottomWidth:0.5,
        borderColor:"#4BB0F9",
        marginBottom:40
      },

});
export default EventsModalStyles;