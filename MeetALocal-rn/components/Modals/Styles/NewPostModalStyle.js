import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const NewPostModalStyle = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgb(0,0,0)',
      backgroundColor: 'rgba(0,0,0,0.5)', 
      },
      modalView: {
        marginTop: 0.2*windowHeight,
        backgroundColor: "white",
        width:widths.width,
        flex:0.8,
        borderRadius: 20,
        alignItems: "center",
        justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding:20,
        textAlign:"center"
      },
      title:{
        fontSize:26,
      },
      contentContainer:{
        marginTop:"10%",
        width:"90%",
        marginBottom:40
      },
      input:{
        marginTop:20,
        width:"100%",
        backgroundColor:"white"
      },
      optionsContainer:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:colors.violet,
        borderBottomWidth:0.5,
        width:"100%",
      },
      buttonContainer:{
        width:widths.width6,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:50
      },
      error:{
        marginTop:2,
        fontSize:11,
        color:"red",
        fontWeight:"500"
    },
    closeModal:{
      position:"absolute",
      top:10,
      left:"90%"
    }

});
export default NewPostModalStyle;