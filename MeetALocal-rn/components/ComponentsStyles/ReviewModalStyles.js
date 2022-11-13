import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";
import { widths } from "../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const ReviewModalStyles = StyleSheet.create({
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
      title:{
        fontSize:26,
      },
      textContainer:{
        width:"90%",
        marginVertical:10
      },
      stars:{marginVertical:3, marginHorizontal:10, marginVertical:30},
      input:{
        marginTop:10,
        height:30,
        width:"100%",
        borderBottomWidth:0.5,
        borderColor:colors.blue,
        marginBottom:20
      },
      btnContainer:{
        flexDirection:"row",
        width:"75%",
        justifyContent:"space-between",
        marginVertical:10
      }

});
export default ReviewModalStyles;