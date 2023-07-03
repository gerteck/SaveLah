import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    overviewContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 8,

        flexDirection: 'column',
        justifyContent: 'center',

    },

    flows:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    flowText: {
        fontSize: 14,
        fontWeight: '500',
    },

    inflowText: {
        color: colors.textBlue,
        fontSize: 14,
        fontWeight: '400',
        marginVertical: 1,
    },

    outflowText: {
        color: colors.textRed,
        fontSize: 14,
        fontWeight: '400',
        marginVertical: 1,
    },

    divider: {
        height: 1,
        backgroundColor: colors.grey,
        marginVertical: 8,
        width: '100%',
        alignSelf: 'center',
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    addComment: {
        backgroundColor: colors.blue,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 8,
    },

    addCommentText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 11,
        fontWeight: '500',
    },


    // Transactions:
    transactionWhiteBox:{
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    dateContainer: {
        flexDirection: 'row',
    },

    date: {
        fontSize: 24,
        fontWeight: '500',
        marginLeft: 10,
        marginRight: 16,
    },

    day: {
        fontSize: 12,
        fontWeight: '500',
    },

    month: {
        fontSize: 11,
        fontWeight: '400',
    },

    dateDetailsContainer:{
        flexDirection: 'column',
    },

    transAmount: {
        alignSelf: 'center',
    },


    // Transaction details categories
    transactionDetailsContainer: {
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    categoryIcon: {
        height: 24,
        width: 24,
        marginLeft: 10,
        marginRight: 16,
        alignSelf: 'center',
    },

    transactionTextContainer: {
        flexDirection: "column", 
        flex: 1, 
        justifyContent: "center",
    },

    row1: {
        flexDirection: "row", 
        flex: 1, 
        justifyContent: "space-between",
    },

    icon: {
        height: 24,
        width: 24,
    }


})