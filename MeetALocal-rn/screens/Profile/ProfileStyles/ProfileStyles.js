import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";

const windowHeight = Dimensions.get("window").height;
const ProfileStyles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20,
        width:widths.width,
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
        
    },
    name:{
        margin:20,
        fontSize:20
    },
    separator:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: widths.width9,
        margin:5,
    },
    inputContainer:{
        marginTop:30,
        width:widths.width8,
        alignItems:"center"
    },
    input:{
        color:"grey",
        width: widths.width8,
        height: 40,
        marginTop: 5,
        borderColor: colors.lightViolet,
        borderBottomWidth: 0.7,
    },
    dropDown:{
        marginTop:10,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomColor:colors.lightViolet,
        borderBottomWidth:0.5,
        width:widths.width8,
    },
    dropDownContainer:{
        width:widths.width8,
        borderRadius:0,
        borderWidth:0.5,
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:widths.width6,
        marginTop:20
    },
    iconContainer:{
        alignItems:"center",
        marginTop:20,
        marginRight:25,
        flexWrap:"wrap"
    },
    categoryIcon:{
        width:25, 
        height:25},
    highlightsContainer:{
        width:widths.width9,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    logOut:{
        color:colors.violet,
        textDecorationLine:"underline",
        fontSize:16,
    },
    logOutContainer:{
        position:"absolute",
        bottom:0.15*windowHeight,
        right: widths.width4
    }
    
});

export default ProfileStyles;