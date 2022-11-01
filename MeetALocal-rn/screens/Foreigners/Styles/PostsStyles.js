import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PostsStyles = StyleSheet.create({
    view:{
        flexDirection:"row",
        width:0.6*windowWidth,
        justifyContent:"space-between",
    },
    title:{
       fontSize:22,
       margin:10,
    },
    options:{
        fontSize:18,
        marginTop:10,
        marginBottom:25,
    },
    selected:{
        color:"#8C57BA"
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: 0.9*windowWidth,
    },
    list:{
        width:windowWidth,
        flex: 1
    },
    eventContainer:{
        padding:20
    }
});
export default PostsStyles;