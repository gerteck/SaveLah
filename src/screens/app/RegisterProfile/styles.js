import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    container: {
        paddingHorizontal: 36,
        flex: 1,
    },

    appHeader: {
        marginTop: 16,
        backgroundColor: colors.white,
        borderRadius: 0,
        height: 50,
    }, 

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.blue,
        paddingVertical: 16,
    },
    
    inputContainer: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,
        borderWidth: 1,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
    },

    bodyInputContainer: {
        minHeight: 200,
        alignItems: 'flex-start',
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
    },

    separator: {
        paddingVertical: 8,
    },

    starterPicturesRow: {
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        aspectRatio: 3.3,
    },

    displayPictures: {
        height: '100%',
        width: '30%',
        resizeMode: 'stretch',
    },

    deleteImageText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    addImageText: {
        textAlign: 'center',
        color: colors.blue,
        fontSize: 16,
        fontWeight: 'bold',
    },

    imageContainer: {
        height: 250,
        alignItems: 'center',
        margin: 16,
        borderWidth: 0,
        zIndex: -1,
    },

    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    addImage: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: 'row',
    },

    deleteImage: {
        backgroundColor: colors.red,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,

        flexDirection: 'row',
    },

    deleteIcon: {
        marginLeft: 8,
        height: 24,
        width: 24,
    },

    register: {
        backgroundColor: colors.blue,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
    },


})