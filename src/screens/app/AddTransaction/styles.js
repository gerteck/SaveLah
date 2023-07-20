import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 16,
        zIndex: -1
    },

    input: {
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
        zIndex: -1
    },

    AddTransactionButton: {
        marginTop: 18,
        marginBottom: 35,
        backgroundColor: colors.green,
        zIndex: -1,
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
    },

    DatePickerButton: {
        zIndex: -1,
    },

    scanLabel: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: '500',
        zIndex: -1
    },

    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    receiptButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

        backgroundColor: colors.darkGrey,
        width: '45%',
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 12,
        borderRadius: 8,

        marginTop: 12,
        zIndex: -1,
    },

    receiptButtonText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    indicator: {
        paddingTop: 12,
    },

    modalContainer: {
        padding:  4, 
    },
})