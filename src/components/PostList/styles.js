import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    flatList:{
        paddingTop: 0,
        paddingBottom: 16,
    },

    mainContainer: {
        marginBottom: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 7,

        flex: 1,
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
    },

    imageContainer: {
        height: 150,
        alignItems: 'center',
        margin: 16,
        zIndex: -1,
    },

    postImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',       
        // max-width: '100%',
        // max-height: '100%',
        // borderRadius: 20,
        // borderWidth: 1,
    },

    body: {
        fontSize: 12,
        marginBottom: 8,
        color: colors.darkGrey,
    },

    footer: {
        paddingTop: 8,
        flexDirection: 'row',
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

    commentNum: {
        marginHorizontal: 12,
        fontSize: 12,
        
    },



})