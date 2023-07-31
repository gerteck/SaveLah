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
        marginBottom: 20,
    },

    mainContainer: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 24,
        paddingVertical: 20,
    },

    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeText: {
        color: colors.blue,
        marginHorizontal: 13,
    },
    agreeTextBold: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: 15,
        marginBottom: 20,
    },
    footerText: {
        color: colors.blue,
        marginBottom: 56,
        textAlign: 'center'
    },
    footerLink: {
        fontWeight: 'bold',
    },
    
    gButtonContainer: {
        width: 100,
        height: 50,
        marginTop: 4,
        marginBottom: 12,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },

})