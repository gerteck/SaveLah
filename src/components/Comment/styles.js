import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    commentContainer: {
        marginHorizontal: 8,
        marginVertical: 13,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    commentDetails: {
        width: '80%',
        marginVertical: 12,
    },

    posterRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },

    username: {
        fontWeight: '800',
        fontSize: 11,
    },

    time: {
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

    voteDeleteRow: {
        flexDirection: 'row',

    },

    commentDeleteContainer: {
        alignSelf: 'flex-end',
        marginRight: 6,
    },

    commentText: {
        fontSize: 12,
        marginLeft: 4,
    },

    deleteImage: {
        height: 16,
        width: 14,
    },

    voteContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    votes: {
        paddingVertical: 12,
        fontSize: 12,
        
        verticalAlign: 'middle',
        justifyContent:'center',
        textAlign: 'center',
        minWidth: 30,
        borderWidth: 0,
    },

    arrowIcon: {
        height: 10,
        width: 13,
    },


    divider: {
        height: 1,
    },
})
