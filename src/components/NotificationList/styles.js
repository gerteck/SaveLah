import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    flatList:{
        paddingTop: 0,
        paddingBottom: 8,
    },

    followNotificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
    },

    row: {
        flexDirection: 'row',
    },

    iconBubble: {
        height: 45,
        width: 45,
        backgroundColor: colors.backgroundGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        marginHorizontal: 16,
    },
    
    displayPicture: {
        height: 39,
        width: 39,
        borderRadius: 21,
    },

    notificationText: {
        alignSelf: 'center',
        fontSize: 13,
        color: colors.darkGrey,
        fontWeight: '500',
        width: '65%',
    },

    timestamp: {
        marginRight: 16,
        fontSize: 11,
        alignSelf: 'flex-end',
    },

    divider: {
        height: 2,
    },



})