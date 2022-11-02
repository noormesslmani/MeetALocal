import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MapModalStyles = StyleSheet.create({
    centeredView: {
        height:windowHeight,
        width:windowWidth,
        justifyContent: "center",
        alignItems: "center",
       
      },
      modalView: {
        marginTop: 0.15*windowHeight,
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
        padding:20,
        justifyContent:"space-between"
      },
      mapContainer:{
        width:windowWidth,
        height:"100%",
        alignItems:"center",
        backgroundColor:"white",
        flex:1,
        paddingTop:20,
        justifyContent:"space-between"
      },
      map:{
        width:"100%",
        height:"90%",
      },
      title:{
        color:"#8C57BA",
        fontSize:22,
      },
      close:{
        position:"absolute",
        left:"100%",
        top:"4%"
      }
     
});
export default MapModalStyles;