import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';

const seeBorder = 0;

export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        flex: 1,
    },

    containerBox: {
        // backgroundColor: colors.white,
        paddingBottom: 16,
        marginTop: 8,
        borderRadius: 8,
    },

    profile: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: seeBorder,
    },

    displayPictureWrapper: {
        backgroundColor: colors.backgroundGrey,
        height: 105,
        width: 105,
        borderRadius: 105/2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 7,
    },

    displayPicture: {
        height: 95,
        width: 95, 
        borderRadius: 95/2,
        resizeMode: 'contain',
    },

    nameBioContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,

        borderWidth: seeBorder,
    },

    name: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 8,
    },
    
    bioContainer: {
        backgroundColor: colors.lightGrey,
        borderRadius: 9,
        width: '95%',
        minHeight: 50,
        paddingHorizontal: 4,
        paddingVertical: 4,
        
    },

    bio: {
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 8,
    },

    followContainer: {
        marginTop: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    followerContainer: {
        alignItems: 'center',
    },

    line: {
        backgroundColor: colors.black,
        width: 2,
        marginHorizontal: 20,
    },

    followText: {
        fontSize: 14,
        fontWeight: 500,
    },

    settingsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },

    settingsBox: {
        flexDirection: 'row',
        width: '90%',
        height: 35,
        paddingVertical: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    opacityBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    },

    icon: {
        marginLeft: 8,
        height: 24,
        width: 24,
        alignSelf: 'center',
    },

    postsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 4,
    },

    viewPostsTouchable: {
        flex: 1,
        justifyContent: 'center',
    },

    viewAllPosts: {
        fontSize: 13, 
        fontWeight: 500,
    },

    postTitle: {
        marginVertical: 8,
        fontSize: 16, 
        fontWeight: 500,
    },

    emptyPostBox: {
        minHeight: 300,
        borderRadius: 10,
        padding: 11,
        marginVertical: 8,

        justifyContent: 'center',
        alignItems: 'center',
    },

    emoticon: {
        fontSize: 40,
        fontWeight: '300',
        color: colors.grey,
    },

    noPostText: {
        marginTop: 32,
        fontSize: 13,
        color: colors.grey,
    },



    crossContainer: {
        justifyContent: 'flex-start', 
        marginLeft: '2%',
        height: 40, 
        width: 40,
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: '600',
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingLeft: '20%',
    },

    iconList: {
        paddingBottom: 150, 
        paddingHorizontal: 24,
        paddingTop: 10,

    },

    flatlistContainer: {
        paddingHorizontal: 18,
        flex: 1,
    },


})