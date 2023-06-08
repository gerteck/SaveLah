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
    }
})