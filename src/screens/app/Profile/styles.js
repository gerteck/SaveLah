import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';

const seeBorder = 0;

export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        flex: 1,
    },

    whiteBox: {
        backgroundColor: colors.white,
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

    displayWrapper: {
        backgroundColor: colors.backgroundGrey,
        height: 105,
        width: 105,
        borderRadius: 105/2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7,
    },

    displayPicture: {
        height: 95,
        width: 95, 
        borderRadius: 95/2,
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
        color: colors.black,
        fontWeight: 500,
        marginBottom: 10,
    },
    
    bioContainer: {
        backgroundColor: colors.grey,
        borderRadius: 9,
        width: '95%',
        height: 50,
    },

    bio: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: 400,
        marginLeft: 8,
    },

    followContainer: {
        marginTop: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',

        //borderWidth: seeBorder,
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

        borderWidth: seeBorder,
    },

    settingsBox: {
        flexDirection: 'row',
        width: '40%',
        height: 35,
        paddingVertical: 8,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,

        borderWidth: seeBorder,
    },

    opacityBox: {
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

    postTitle: {
        marginTop: 24,
        fontSize: 16, 
        fontWeight: 500,
    }


})