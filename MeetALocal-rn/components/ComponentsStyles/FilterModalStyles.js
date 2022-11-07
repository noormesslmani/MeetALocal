import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const ModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        width:widths.width8,
        height:0.45*windowHeight,
        borderRadius: 20,
        padding: 20,
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
        marginTop:20,
        backgroundColor:colors.lightBlue
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:"500",
        fontSize:16
      },
      dropDown:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:colors.blue,
        borderBottomWidth:0.5,
      },
      dropDownContainer:{
        marginBottom:30
    },


});
export default ModalStyles;