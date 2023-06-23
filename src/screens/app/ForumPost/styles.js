import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    safeContainer: {
        
    },
    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    whiteView: {
        backgroundColor: colors.white,
        minHeight: 0.9* windowHeight,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 8,
    },

    postContainer: {
        marginBottom: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
        borderWidth: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    categoryContainer: {
        borderRadius: 12,
        backgroundColor: '#92A3FF',
        marginHorizontal: 4,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },

    categoryText: {
        fontSize: 12,
        fontWeight: 500,
    },

    time: {
        marginLeft: 8,
        fontSize: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: 500,
        marginVertical: 6,
        color: colors.black,
    },

    body: {
        fontSize: 12,
        marginBottom: 8,
        color: colors.darkGrey,
    },

    footer: {
        paddingTop: 8,
        flexDirection: 'row',
    },

    arrowIcon: {
        height: 20,
        width: 20,
    },

    votes: {
        marginHorizontal: 12,
        fontSize: 12,
        
        verticalAlign: 'middle',
        justifyContent:'center',
        textAlign: 'center',
        minWidth: 30,

        borderWidth: 0,
    },


})