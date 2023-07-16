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

        minHeight: 35,
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
        justifyContent: 'flex-start',
        borderWidth: showBorder,
    },

    crossContainer: {
        justifyContent: 'flex-start', 
        marginLeft: '10%',
        height: 24, 
        width: 24,
    },

    rightIcons: {
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        justifyContent: 'flex-end',

        borderWidth: showBorder,
    },

    iconBubble: {
        height: 45,
        width: 45,
        backgroundColor: colors.backgroundGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        marginRight: 16,
        marginVertical: 4,
    },

    userPictureIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },

    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    notificationIcon: {
        height: 24, 
        width: 24,
    },

    notificationContainer: {
        marginRight: 4,
        marginLeft: 16,
    },

    deleteContainer: {
        marginRight: 16,
    },

    space: {
        width: 10,
    },

})