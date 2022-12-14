import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../../constants/dimensions";
import { colors } from "../../../constants/colors";
const windowHeight = Dimensions.get("window").height;
const EventModalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalView: {
        marginTop: 0.1*windowHeight,
        backgroundColor: "white",
        width:widths.width9,
        height:'auto' ,
        borderRadius: 20,
        alignItems: "center",
      },
      button: {
        borderRadius: 20,
        padding: 10,
        marginTop:50,
        backgroundColor: colors.lightBlue
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
        height:0.3*windowHeight,
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
      },
      detailsContianer:{
        marginTop:30,
        width:widths.width8,
        height:"auto"
      },
      title:{fontSize:20, fontWeight:"600"},
      info:{fontSize:14},
      fees:{fontSize:14, fontWeight:"700"},
      detailsTitle:{fontSize:20, fontWeight:"500"},
      details:{fontSize:12, marginTop:5},
      categoriesTitle:{fontWeight:"500"},
      icons: {width:35, height:35, margin:15},
      bookBtn:{
        marginVertical:10,
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
});
export default EventModalStyle;