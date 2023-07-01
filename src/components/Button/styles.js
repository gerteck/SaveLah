import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
    },

    text: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})
