import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';

import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 18,
    },
    appHeader: {
        marginTop: 8,
        borderRadius: 16,
    },

    mainView: {
        minHeight: 0.8* windowHeight,
        borderRadius: 10,
        padding: 11,
        marginVertical: 8,
    },

    inputContainer: {
        marginTop: 4,
        marginBottom: 4,

        width: '98%',
        height: 45,
        alignSelf: 'center',

        backgroundColor: colors.white,
        borderRadius: 8,

        borderColor: colors.lightGrey,
        borderWidth: 3,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '400',
    }, 

    searchIcon: {
        marginHorizontal: 16,
    }, 

    userContainer: {
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
        marginHorizontal: 16,
    },
    
    icon: {
        height: 39,
        width: 39,
        borderRadius: 21,
    },

    name: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 500,
    },

    divider: {
        height: 2,
    },




})