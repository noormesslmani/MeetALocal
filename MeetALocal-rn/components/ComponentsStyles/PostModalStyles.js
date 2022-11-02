import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const PostModalStyles = StyleSheet.create({
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
        elevation: 5,
        padding:20
      },
      title:{
        fontSize:26,
        color:"#8C57BA"
      },
      contentContainer:{
        marginTop:"10%",
        width:"90%"
      },
      input:{
        marginTop:20,
        height:100,
        width:"100%",
        borderBottomWidth:0.5,
        borderColor:"#4BB0F9",
        marginBottom:40
      },
      optionsContainer:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:"#4BB0F9",
        borderBottomWidth:0.5
      },
      button: {
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 1,
        marginTop:60,
        backgroundColor:"rgba(75, 176, 249, 0.5)"
      },


});
export default PostModalStyles;