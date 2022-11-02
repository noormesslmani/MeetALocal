import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MapStyles = StyleSheet.create({
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
        height:"85%",
      },
      title:{
        color:"#8C57BA",
        fontSize:30,
      },
      saveBtn:{
        position:"absolute",
        top:"97%",
        width:100,
        height: 35,
        borderRadius: 10,
        backgroundColor:'#8C57BA',
        alignItems: "center",
        justifyContent: "center",
      }
   
});

export default MapStyles;