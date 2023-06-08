import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.white,
        flex: 1,
    },
    container: {
        padding: 24,
        marginTop: 20,
        backgroundColor: colors.white,
    },
    button: {
        marginVertical: 20,
    },
    footerText: {
        color: colors.blue,
        marginBottom: 56,
        textAlign: 'center'
    },
    footerLink: {
        fontWeight: 'bold',
    }
})