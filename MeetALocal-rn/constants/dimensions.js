import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const widths={
    width:windowWidth,
    width9:0.9*windowWidth,
    width8: 0.8*windowWidth,
    width7: 0.7*windowWidth,
    width6: 0.6*windowWidth,
    width5: 0.5*windowWidth,
    width4: 0.4*windowWidth,
}