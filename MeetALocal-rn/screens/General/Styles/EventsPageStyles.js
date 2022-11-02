import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EventsStyles = StyleSheet.create({
    view:{
        flexDirection:"row",
        width:"auto",
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:16,
        margin:10,
    },
    selected:{
        color:"#8C57BA"
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: 0.9*windowWidth,
        margin:10,
    },
    list:{
        alignSelf:"center",
    },
    listContainer:{
        width:windowWidth,
        alignItems:"center",
    }
});
export default EventsStyles;