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
        marginBottom:10,
    },
    list:{
        width:windowWidth,
        flex: 1
    },
    scrollContainer:{
        height:600,
    },
    addComment:{
        backgroundColor:"white",
        height:50,
        justifyContent:"center",
        padding:5,
        position:"absolute",
        top:windowHeight-150,
        width:windowWidth
    },
    newPost:{
        margin:10,
        fontSize:12,
        color:"#8C57BA"
    }
});
export default PostsStyles;