import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ImageModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent:'center'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        width:0.9*windowWidth,
        height:0.7*windowHeight,
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
      imgContainer:{
        elevation:2,
        height:350,
        width:350,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        margin:30
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
      imageBtn:{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        width:90,
        margin:5,
        borderRadius:20,
        backgroundColor:"rgba(75, 176, 249, 0.5)"
      },
      btnContainer:{
        width:"75%",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center"
      }
});
export default ImageModalStyles;