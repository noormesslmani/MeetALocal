import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
import { widths } from "../../../constants/dimensions";
const LocalProfileStyles = StyleSheet.create({
    mainContainer:{
        width: widths.width,
        padding:30,
        alignItems:"center"
    },
    imageContainer:{
        width:widths.width9,
        flexDirection:"row",
        marginBottom:30
    },
    infoContainer:{
        width:widths.width9,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        marginBottom:20
    },
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    message:{
        backgroundColor: colors.mediumViolet,
        width:80,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    separator:{
        width:widths.width,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 0.3,
        marginVertical:15,
    },
    sectionContainer:{
        width:widths.width9,
        marginBottom:40
    },
    categoryContainer:{
        alignItems:"center",
        marginTop:20,
        marginRight:25,
        flexWrap:"wrap",
        width:widths.width9,
        height:'auto',
        flexDirection:"row",
        backgroundColor:"white",
        borderRadius:10,
        padding:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer:{
        alignItems:"center",
        marginRight:30
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
    highlightImages:{
        flexDirection:"row",
        justifyContent:"center",
        width: widths.width9,
    },
    highlightimg:{
        width:widths.width4,
        height:0.35*widths.width,
        margin:5
    },
    addReview:{
        fontSize:12,
        marginVertical:5,
        color:'grey',
        textDecorationLine:"underline"
    },
    headerText:{
        fontSize:16,
        marginLeft:10
    },
    name:{
        fontSize:18, 
        fontWeight:"600", 
        marginBottom:3
    },
    country:
    {
        fontSize:14, 
        fontWeight:"400", 
        marginBottom:3
    },
    likesContainer:
    {
        flexDirection:"row", 
        alignItems:"center"
    },
    likes:{
        fontSize:13, 
        fontWeight:"400", 
        marginRight:3
    },
    phoneContainer:{
       marginHorizontal:3
    },
    phone:{
        fontSize:13, 
        fontWeight:"400", 
        marginLeft:10, 
        color:'blue', 
        textDecorationLine:"underline"},
    linksContainer:{
        flexDirection:"row", 
        alignItems:"center",
    },
    language:{
        fontSize:10, 
        fontWeight:"400", 
        marginLeft:10},
    sectionTitle:{
        fontSize:16, 
        fontWeight:"500",
        marginVertical:15
    },
    about:{
        fontSize:13, 
        fontWeight:"300"},
    categoryIcon:{
        width:25, 
        height:25
    },
    bookBtn:{
        marginVertical:10,
        width:widths.width9,
        height:45,
        backgroundColor:'white',
        borderColor:colors.violet,
        flexDirection:"row",
        justifyContent:"center",
        borderRadius:10,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    ratingsContainer:{
        marginTop:20,
        marginRight:25,
        width:widths.width9,
        height:'auto',
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:"white",
        borderRadius:10,
        paddingTop:30,
        paddingBottom:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    averageText:{
        fontSize:30, 
        color: colors.gold, 
        marginBottom:10
    },
    reviewNb:{
        fontSize:10, 
        marginVertical:5
    },
    reviewsLink:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"center",
        marginTop:10,
    },
    

});
export default LocalProfileStyles;