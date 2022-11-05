import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ProfileStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20,
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'white'
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
    inputContainer:{
        marginTop:30,
        width:0.8*windowWidth,
        alignItems:"center"
    },
    input:{
        color:"grey",
        width: windowWidth * 0.8,
        height: 40,
        marginTop: 5,
        borderColor: "#4BB0F9",
        borderBottomWidth: 0.7,
    },
    dropDown:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:"#4BB0F9",
        borderBottomWidth:0.5,
        width:windowWidth * 0.8,
    },
    dropDownContainer:{
        width:windowWidth * 0.8,
        borderRadius:0,
        borderWidth:0.5,
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"60%"
    },
    btn:{
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop:40,
        backgroundColor:"rgba(75, 176, 249, 0.3)",
        marginBottom:10,
        width:"45%",
        alignItems:"center",
        justifyContent:"center"
    }
    
});

export default ProfileStyles;