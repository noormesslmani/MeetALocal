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
        height:250,
        width:250,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        marginTop:20
    },
});

export default ProfileStyles;