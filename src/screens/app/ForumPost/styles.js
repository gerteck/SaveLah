import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    safeContainer: {
        
    },
    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    mainView: {
        minHeight: 0.9* windowHeight,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 8,
    },

    postContainer: {
        marginBottom: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
        borderWidth: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    categoryContainer: {
        borderRadius: 12,
        backgroundColor: '#92A3FF',
        marginHorizontal: 4,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },

    categoryText: {
        fontSize: 12,
        fontWeight: 500,
    },

    time: {
        marginLeft: 8,
        fontSize: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: 500,
        marginVertical: 6,
        color: colors.black,
    },

    body: {
        fontSize: 12,
        marginBottom: 8,
    },

    modalImage: {
        alignSelf: 'center',
        height: windowHeight*0.3,
        width: windowWidth - 10*2 -20*2 - 14*2 - 1,
        margin: 10,
    },

    footer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    voteContainer: {
        flexDirection: 'row',
    },

    votes: {
        marginHorizontal: 12,
        fontSize: 12,
        
        verticalAlign: 'middle',
        justifyContent:'center',
        textAlign: 'center',
        minWidth: 30,

        borderWidth: 0,
    },

    addCommentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        zIndex: 9,
    },

    addComment: {
        backgroundColor: colors.blue,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },

    addCommentText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: '900',
    },

    dropDownPickerContainer: {
        width: '45%',
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
        borderWidth: 0.5,
    },

    input: {
        marginTop: 16,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 70,
        textAlignVertical: 'top',
    },

    postComment: {
        backgroundColor: colors.grey,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 0.8,
        borderColor: colors.black,
    },

    postCommentText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
    },

    commentsList:{
        paddingTop: 4,
        paddingBottom: 16,
    },


})