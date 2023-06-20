import { StyleSheet } from "react-native";
import { colors } from '../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 18,
        flex: 1,
    },
    
    scrollView: {
        flex: 1,
    },

    welcome: {
        fontSize: 15,
        fontWeight: "bold",
    },

    name: {
        paddingLeft: 10,
        fontSize: 15,
    },

    budgetOverview: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    money: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    caption: {
        paddingLeft: 4,
        fontSize: 11,
        fontWeight: 'bold',
    },

    report: {
        color: '#65663D',
        alignSelf: 'flex-end',
        fontSize: 14,
        fontWeight: 'bold',
    },

    weekMonthBar: {
        height: 30,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: colors.backgroundGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    weekMonth: {
        width:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundGrey,
        margin: 3,
        width: '40%',
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
    }
})