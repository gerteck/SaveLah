import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    mainContainer: {
        paddingHorizontal: 18,
        flex: 1,
    },

    whiteView: {
        backgroundColor: colors.white,
        minHeight: 0.8* windowHeight,
        borderRadius: 10,
        padding: 11,
        marginVertical: 8,
    },

    appHeader: {
        backgroundColor: colors.white,
        borderRadius: 16,
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