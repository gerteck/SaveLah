import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        flex: 1,
    },

    profilePictureContainer:{
        marginTop: 16,
        marginBottom: 8,
        alignItems: 'center',
    },

    displayTouchable: {
        aspectRatio: 1,
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: colors.grey,

        justifyContent: 'center',
        alignItems: 'center',
    },

    displayPicture: {
        height: '90%',
        width: '90%',
        aspectRatio: 1,
        borderRadius: 60,
    },

    editCircle: {
        height: 30,
        width: 30,
        position: "absolute",
        bottom: 10,
        right: 0,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },

    sectionTitle: {
        textAlignVertical: 'center',
        marginTop: 16,
        fontSize: 16,
    },

    touchable: {
        alignItems: 'center',
    },

    icon: {
        width: 32,
        height: 32,
        justifyContent:'center',
    },

    item: {
        padding: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
    },

    button: {
        paddingVertical: 16,
        marginBottom: 16,
        marginTop: 4,
    },

    infoBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 16,
        marginTop: 4,
    },

    logoutButton: {
        paddingVertical: 16,
        marginBottom: 24,
        marginTop: 24,
        backgroundColor: colors.red,
    },

})