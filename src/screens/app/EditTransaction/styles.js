import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 16,
    },

    container: {
        paddingHorizontal: 36,
        flex: 1,
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
        marginVertical: 35,
        backgroundColor: colors.green,
        zIndex: -1,
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
    },

    DatePickerButton: {
        zIndex: -1,
    },

    modalContainer: {
        backgroundColor: '#fff',
        padding:  4,
        
    },

    appHeader: {
        borderRadius: 0,
        height: 50,
    }, 

    SaveTransactionButton: {
        marginVertical: 35,
        backgroundColor: colors.green,
        zIndex: -1,
    },
    

})