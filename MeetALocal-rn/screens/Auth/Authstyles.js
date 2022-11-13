import { StyleSheet, Dimensions } from "react-native";
import { widths } from "../../constants/dimensions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { colors } from "../../constants/colors";
const styles = StyleSheet.create({
    background:{
        backgroundColor: colors.lightViolet,
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
    },
    scrollView:{
        height:windowHeight
    },
    mainContainer:{
        height:0.9*windowHeight,
        alignItems:"center",
        justifyContent:"center"
    },
    setUpContainer:{
        height:0.9*windowHeight,
        width:widths.width8,
        alignItems:"center",
        justifyContent:"center"
    },
    formContainer:{
        backgroundColor: "white",
        height:windowHeight* 0.6,
        width: widths.width8,
        alignItems: "center",
        justifyContent:"center",
        padding:40,
        borderRadius:20,
    },
    backgroundUserType:{
        backgroundColor: colors.lightViolet,
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
    },
    welcome:{
        fontSize: 30,
        paddingBottom: 20
    },
    setUp:{
        fontSize: 20,
        paddingBottom: 20
    },
    signIn:{
        fontSize:30,
        paddingBottom: 50,
    },
    inputContainer:{
        paddingBottom: 30,
    },
    input:{
        width: widths.width6,
        height: 40,
        backgroundColor: "white",
        paddingLeft: 10,
        marginTop: 5,
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
        color:colors.violet
    },
    signUp:{
        height:windowHeight* 0.73,
    },
    userType:{
        height:windowHeight* 0.4,
    },
    error:{
        marginTop:2,
        fontSize:11,
        color:"red",
        textAlign:"center",
        fontWeight:"500"
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
        flexDirection:'row',
        width: widths.width6,
        justifyContent:"space-between",
        marginVertical:20
    },
    gender:{
        fontSize: 18,
        marginTop: 20,
    },
    genderIcon:{
        width:0.25*widths.width,
        height:0.25*widths.width,
        borderRadius:0.125*widths.width,
    },
    genderAvatar:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor:colors.lightViolet
    },
    selectedGender:{
        backgroundColor:colors.lighterViolet
    },
    selectCategory:{
        fontSize:18,
        alignSelf:"flex-start",
        marginLeft:20,
        marginTop:10
    },
    categoryContainer:{
        alignItems:'center',
        marginTop:50,
        width:windowWidth * 0.8,
        marginBottom:20
    },
    categoryRow:{
        flexDirection:'row',
        justifyContent:"space-between",
        width:widths.width7,
        marginBottom:20
    },
    iconContainer:{
        alignItems:"center"
    },
    categoryIcon:{
        width:40,
        height:40,
       
    },
    categoryBtn:{
        width:120,
        height:50
    },
    circle:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor: colors.lighterViolet,
        position:'relative',
        alignItems:"center",
        justifyContent:"center",
    },
    selectedIcon:{
        backgroundColor: colors.lighterViolet,
    },
    categoryLabel:{
        color:"blue",
    },
    fees:{
        fontSize:14,
        marginTop:20
    },
    dropDown:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:colors.lightViolet,
        borderBottomWidth:0.5
      },
    dropDownContainer:{
        width: windowWidth * 0.6,
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
        height:"85%",
      },
      title:{
        color:colors.violet,
        fontSize:30,
      },
      saveBtn:{
        position:"absolute",
        bottom:10,
        width:130,
        height: 45,
        borderRadius: 10,
        backgroundColor: colors.mediumViolet,
        alignItems: "center",
        justifyContent: "center",
      },
      aboutContainer:{
        width:"100%",
        margin:40,
      },
      aboutInput:{
    
        width:"100%",
        backgroundColor: "white",
        paddingLeft: 10,
      }
    
});

export default styles;