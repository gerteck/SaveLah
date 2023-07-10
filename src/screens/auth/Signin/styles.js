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
        marginBottom: 56,
        textAlign: 'center'
    },

    footerLink: {
        fontWeight: 'bold',
    },
})