import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ProfileStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20
    },
    imgContainer:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        marginTop:20
    },
    name:{
        margin:20,
        fontSize:20
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: 0.9*windowWidth,
        margin:5,
    },
});

export default ProfileStyles;