import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#8C57BA",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default styles;