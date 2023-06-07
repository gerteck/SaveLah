import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({

    mainContainer: {
        paddingHorizontal: 18,
        flex: 1,
    },

    appHeader: {
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    chatBox: {
        //borderWidth: 2,
        flex: 1,
    },

    chatContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },

    iconBubble: {
        height: 45,
        width: 45,
        backgroundColor: colors.backgroundGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        marginRight: 10,
    },

    icon: {
        height: 39,
        width: 39,
        borderRadius: 21,
    },

    textContainer: {
        width: '60%',
    },

    name: {
        fontSize: 16,
        color: colors.blue,
        fontWeight: 500,
    },

    message: {
        fontSize: 13,
        color: colors.black,
    },

    time: {
        fontSize: 13,
        color: colors.darkGrey,
    },

    divider: {
        height: 2,
        backgroundColor: colors.backgroundGrey,
    },

})