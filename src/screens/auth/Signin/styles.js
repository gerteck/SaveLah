import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 24,
        paddingTop: 24,
    },

    gap: {
        paddingVertical: 8,
    },

    button: {
        marginVertical: 20,
    },

    separator:{
        paddingVertical: 16,
    },

    footerText: {
        color: colors.blue,
        marginBottom: 24,
        textAlign: 'center'
    },

    footerLink: {
        fontWeight: 'bold',
    },

    gButton: {
        width: 32,
        height: 32,
        alignSelf: "center",
    },
    
    gButtonContainer: {
        width: 100,
        height: 50,
        marginTop: 0,
        marginBottom: 20,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
})