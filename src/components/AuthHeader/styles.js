import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,

    },

    image: {
        height: 18,
        width: 18,
    },

    title: {
        color: colors.blue,
        fontSize: 26,
        fontWeight: '500',
    },


})