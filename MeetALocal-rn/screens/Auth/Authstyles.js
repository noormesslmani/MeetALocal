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
    backgroundUserType:{
        backgroundColor: "rgba(140, 87, 186, 0.34)",
        flex: 1,
        alignItems: "center",
        paddingTop: 100
    },
    welcome:{
        fontSize: 40,
        paddingBottom: 50
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
    userType:{
        height:windowHeight* 0.4,
    },
    error:{
        marginTop:2,
        fontSize:11,
        color:"red",
        textAlign:"center"
    },
    typeBtn:{
        width:150,
        height: 50,
        borderRadius: 20,
        borderColor: "#8C57BA",
        borderWidth:1,
        backgroundColor:'white',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    profilePic:{
        width:160,
        height:160,
        borderRadius:80
    },
    picContainer:{
        position:"relative"
    },
    addIcon:{
        position:"absolute",
        top:120,
        left:120
    },
    genderContainer:{
        flexDirection:'row'
    },
    gender:{
        fontSize: 20,
        marginTop: 40,
        marginBottom:10
    },
    genderIcon:{
        width:80,
        height:80,
        borderRadius:40,
        margin:20,
        marginBottom:40,
        borderWidth:1,
        borderColor:'#D9D9D9'
    },

});

export default styles;