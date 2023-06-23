import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    commentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 13,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    commentDetails: {

    },

    posterRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },

    username: {
        color: colors.black,
        fontWeight: '800',
        fontSize: 11,
    },

    time: {
        color: colors.black,
        fontWeight: '400',
        fontSize: 10,
    },

    iconBubble: {
        height: 34,
        width: 34,
        backgroundColor: colors.backgroundGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        marginRight: 10,
    },

    displayPicture: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },

    textRow: {

    },

    commentText: {
        fontSize: 12,
        color: colors.black,
    },

    voteContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    vote:{
        paddingVertical: 16,
    },

    arrowIcon: {
        height: 10,
        width: 10,
    },


    divider: {
        height: 1,
        backgroundColor: colors.darkGrey,
    },
})
