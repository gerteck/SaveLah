import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({

    container: {
        marginBottom: 20,
        borderWidth: 0,
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.blue,
        paddingVertical: 8,
        fontFamily: "customFont",
    },

    inputContainer: {
        height: 60,
        width: '100%',
        borderColor: colors.grey,
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

    eye: {
        width: 24,
        height: 24,
        margin: 16,
    },  
})