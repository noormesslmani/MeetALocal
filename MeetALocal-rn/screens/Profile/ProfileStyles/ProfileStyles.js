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
        width: widths.width,
        margin:5,
    },
    view:{
        flexDirection:"row",
        width:widths.width6,
        justifyContent:"space-between",
        marginTop:30,
        alignSelf:"center"
    },
    profilePicture:{ width: 180, 
        height: 180, 
        borderRadius:90, 
        marginTop:20,
        borderWidth:2,
        borderColor:colors.lightGrey
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
        alignSelf:"center",
        marginVertical:20
    },
    // logOutContainer:{
    //     position:"absolute",
    //     bottom:0.15*windowHeight,
    //     right: widths.width4
    // }
    pickerContainer:{
        width:widths.width8,
        marginTop:10
    },
    categoryBtn:{
        width:"auto",
        height:55,
        margin:5,
        backgroundColor:'white',
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    averageContainer:{
        alignItems:"center",
        padding:10
    },
    averageText:{
        fontSize:30,
        marginVertical:10,
        color:colors.gold
    },
    reviewsNb:{
        marginVertical:10,
        fontSize:12
    },
    scrollView:{
        marginBottom:100,
        marginTop:20,
        width:widths.width9
    },
    reviewsTitle:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:20
    },
    noReviews:{
        alignSelf:"center",
        color: colors.lightGrey,
        fontSize:12
    }
});

export default ProfileStyles;