import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    chatContainer: {
        flex: 1,
        marginTop: 8,
        borderRadius: 10,
    },

    sendIcon: {
        height: 20, 
        width: 20,
        marginBottom: 12,
        marginRight: 10,
    },

    downIcon: {
        height: 18,
        width: 18,
    },

})