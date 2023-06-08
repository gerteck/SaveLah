import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const showBorder = 0;

export const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,

        borderWidth: showBorder,
    },

    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '800',
    },

    leftIcons: {
        paddingLeft: 8,
        width: '30%',
        
        borderWidth: showBorder,
    },

    rightIcons: {
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        justifyContent: 'flex-end',

        borderWidth: showBorder,
    },

    icon: {
        height: 40,
        width: 40,
    },

    space: {
        width: 24,
    },

})