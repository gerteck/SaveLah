import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,

    },

    line: {
        height: 1,
        flex: 1,
        backgroundColor: colors.lightGrey,

    },
    text: {
        color: colors.blue,
        fontWeight: 'bold',
    },


})
