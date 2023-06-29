import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    safeContainer: {
        
    },
    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    whiteView: {
        backgroundColor: colors.white,
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
        color: colors.darkGrey,
    },

    imageContainer: {
        height: 200,
        alignItems: 'center',
        margin: 16,
        borderWidth: 0,
        zIndex: -1,
    },

    postImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    footer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    voteContainer: {
        flexDirection: 'row',
    },

    deleteImage: {
        height: 18,
        width: 18,
    },

    arrowIcon: {
        height: 20,
        width: 20,
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

    
    inputContainer: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,
        borderWidth: 1,
        borderRadius: 14,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
    },

    postComment: {
        backgroundColor: colors.grey,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 8,
    },

    postCommentText: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16,
        fontWeight: '900',
    },

    commentsList:{
        paddingTop: 4,
        paddingBottom: 16,
    },


})