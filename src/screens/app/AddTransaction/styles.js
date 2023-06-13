import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.blue,
        paddingVertical: 16,
    },

    inputContainer: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,
        borderWidth: 1,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
    },

    AddTransactionButton: {
        marginVertical: 35,
        backgroundColor: colors.green,
    },
    

})