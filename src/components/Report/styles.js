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
        padding: 7,
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
    },

    categoryContaineer: {
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
        fontSize: 20,
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
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },

    pointMoney: {
        paddingLeft: 4,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
})