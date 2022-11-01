import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EventModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        marginTop: 0.15*windowHeight,
        backgroundColor: "white",
        width:0.9*windowWidth,
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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:50,
        backgroundColor:"rgba(140, 87, 186, 0.5)"
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      image:{
        width:0.9*windowWidth,
        flex:0.5,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginBottom:10
      },
      titleContainer:{
        flexDirection:"row",
        width:0.8*windowWidth,
        justifyContent:"space-between"
      }

});
export default EventModalStyles;