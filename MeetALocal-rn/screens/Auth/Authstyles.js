import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    background:{
        backgroundColor: "rgba(140, 87, 186, 0.34)",
        flex: 1,
        paddingTop:50,
        alignItems: "center",
    },
    formContainer:{
        backgroundColor: "white",
        height:windowHeight* 0.6,
        width: windowWidth * 0.7,
        alignItems: "center",
        padding:40,
        borderRadius:20,
    },
    signIn:{
        fontSize:30,
        paddingBottom: 50,
    },
    inputContainer:{
        paddingBottom: 30,
    },
    input:{
        width: windowWidth * 0.6,
        height: 40,
        backgroundColor: "white",
        paddingLeft: 10,
        marginTop: 5,
        borderColor: "#4BB0F9",
        borderBottomWidth: 0.5,
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
        
    },
    text:{
        marginTop:20,
        textAlign:'center'
    },
    link:{
        color:"#8C57BA"
    },
    signUp:{
        height:windowHeight* 0.7,
    },
    error:{
        marginTop:2,
        fontSize:11,
        color:"red",
        textAlign:"center"
    }
});

export default styles;