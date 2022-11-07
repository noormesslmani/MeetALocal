import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";
import { colors } from "../../constants/colors";
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
        width:widths.width9,
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
        backgroundColor: colors.lightViolet
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
        width:widths.width9,
        height:0.25*windowHeight,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginBottom:10
      },
      titleContainer:{
        flexDirection:"row",
        width:widths.width8,
        justifyContent:"space-between",
        marginBottom:10
      },
      infoContainer:{
        alignSelf:"flex-start",
        width:widths.width8,
        marginLeft:0.05*windowWidth
      },
      detailsContianer:{
        marginTop:30,
        width:widths.width8,
        height:0.15*windowHeight
      },

});
export default EventModalStyles;