import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ImageModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        width:0.9*windowWidth,
        height:0.5*windowHeight,
        borderRadius: 20,
        padding: 20,
        marginTop:"30%",
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
        height:250,
        width:250,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        marginTop:20
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
      }
});
export default ImageModalStyles;