import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white, 
        height: 100, 
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    header: {
        padding: 10,
        backgroundColor: colors.grey,
        alignContent: 'flex-start',
    },
    selected: {
        backgroundColor: colors.white,
        borderRadius: 5,
    },

    transactionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    transactionContainer:{
        flexDirection: 'row',
        padding: 4,
    },

    icon: {
        height: 24,
        width: 24,
        marginRight: 8,
        alignSelf: 'center',
    },

    transactionCaption: {
        fontSize: 15,
        fontWeight: '400',
        paddingLeft: 8,
    },

    transactionDate: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 8,
        paddingBottom: 4,
    },

    categoryContainer: {
        justifyContent: "space-between", 
        flexDirection: "row", 
        flex: 1, 
        alignItems: "center"
    },

    categoryBox: {
        flex: 1,
        backgroundColor: colors.lightGrey,
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
    },

    caption: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    money: {
        paddingLeft: 4,
        fontSize: 24,
        fontWeight: 'bold',
    },

    pointBox: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 8,
        gap: 16,

    },

    pointValue: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    pointCaption: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },

    pointMoney: {
        paddingLeft: 4,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    left: {
        alignSelf: 'center',

    },

    right: {
        alignSelf: 'center',      
    },

    scrollCaption: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    totalSpent: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 8,
    },

    transactionMoney: {
        fontWeight: '500',
        fontSize: 18,
    },
})