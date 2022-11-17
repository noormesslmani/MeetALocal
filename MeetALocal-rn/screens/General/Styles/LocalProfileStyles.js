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
        marginBottom:20
    },
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    message:{
        backgroundColor: colors.lightViolet,
        width:80,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    separator:{
        width:widths.width9,
        borderBottomColor: colors.lightViolet,
        borderBottomWidth: 0.3,
        marginBottom:20,
    },
    sectionContainer:{
        width:widths.width9,
        marginBottom:40
    },
    iconContainer:{
        alignItems:"center",
        marginTop:20,
        marginRight:25,
        flexWrap:"wrap"
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
    marginBottom:3},
    country:
    {fontSize:14, 
    fontWeight:"400", 
    marginBottom:3},
    likesContainer:{
        flexDirection:"row", 
        alignItems:"center"},
    likes:{
        fontSize:13, 
        fontWeight:"400", 
        marginRight:3},
    phoneContainer:{
        flexDirection:"row", 
        alignItems:"center"},
    phone:{
        fontSize:13, 
        fontWeight:"400", 
        marginLeft:10, 
        color:'blue', 
        textDecorationLine:"underline"},
    language:{
        fontSize:10, 
        fontWeight:"400", 
        marginLeft:10},
    sectionTitle:{
        fontSize:16, 
        fontWeight:"500"},
    about:{
        fontSize:13, 
        fontWeight:"300"},
    categoryIcon:{
        width:25, 
        height:25},
    bookBtn:{
        marginVertical:10,
        width:widths.width9,
        backgroundColor:'white',
        borderColor:colors.violet,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }

});
export default LocalProfileStyles;