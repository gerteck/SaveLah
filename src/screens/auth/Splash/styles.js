import { StyleSheet } from "react-native";
import useThemeColors from "../../../utils/themeColors";

export const styles = StyleSheet.create({

    container: {
        padding: 20,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.background,

    },  

    image: {
        width: '100%',
        height: 200,
        
    },

    title: {
        fontSize: 32, 
        fontWeight: 'bold',
        textAlign: "center",
        fontFamily: "customFont",
    },

    titleContainer: {
        paddingBottom: 30,
    },

    innerTitle: {
        // color: colors.specialTitle,
    },

    footerContainer: {
        paddingVertical: 8,
    },

    footerText: {
        // color: colors.footer,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
    },


})

