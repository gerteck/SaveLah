import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({

    container: {
        height: 85,
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.blue,
        paddingTop: 8,
        paddingBottom: 8,
        
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
        paddingVertical: 20,
    },

    eye: {
        width: 24,
        height: 24,
        margin: 16,
    },  

})