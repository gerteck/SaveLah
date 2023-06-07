import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 8,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },

    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '800',
    },

    rightIcons: {
        paddingRight: 8,
    },

    leftIcons: {
        paddingLeft: 8,
    },

    icon: {
        height: 32,
        width: 32,
    },

    space: {
        width: 24,
    },

})