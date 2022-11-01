import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const CommentsModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        marginTop: 0.15*windowHeight,
        backgroundColor: "white",
        width:windowWidth,
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
        width:0.9*windowWidth,
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
      marginLeft:"20%", 
      fontWeight:"300", 
      alignSelf:"flex-start",
      marginBottom:10
  },
  separator:{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    width: 1*windowWidth,
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
}

});
export default CommentsModalStyles;