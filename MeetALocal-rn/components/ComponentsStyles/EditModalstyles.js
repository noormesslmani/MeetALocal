import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EditModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        paddingTop:0.1*windowHeight
      },
      modalView: {
        marginTop:20,
        backgroundColor: "white",
        width:windowWidth,
        flex:1,
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
        justifyContent:'space-around'

      },
     
});
export default EditModalStyles;