import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const HighlightsModalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        backgroundColor: "white",
        width:widths.width9,
        flex:0.55,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        padding:20,
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
        marginBottom:30
      },
      highlightImage:{
        width:0.3*widths.width,
        height:0.3*widths.width,
        margin:5
      },
      highlighContainer:{
        flexDirection:"row"
      },
      list:{
        alignSelf:"center",
    },
      addImage:{
        backgroundColor:"colors.lighterGrey",
        alignItems:"center",
        justifyContent:"center",
        width:0.3*widths.width,
        height:0.3*widths.width,
        margin:5
    },
    btnContainer:{
      flexDirection:"row",
      width:widths.width6,
      justifyContent:"space-between"
    }
});
export default HighlightsModalStyle;