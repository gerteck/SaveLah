import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 16,
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
        paddingVertical: 16,
        zIndex: -1,
    },
    
    inputContainer: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,
        borderWidth: 1,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: -1,
    },

    input: {
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
        zIndex: -1,
    },

    bodyInputContainer: {
        minHeight: 200,
        textAlignVertical: 'top',
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
        zIndex: 9,
        flex: 1,
        position: 'relative',
    },

    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: -1,
    },

    deleteImageText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    addImageText: {
        textAlign: 'center',
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
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
        flexDirection: 'row',
    },

    deleteImage: {
        backgroundColor: colors.red,
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,

        flexDirection: 'row',
    },

    deleteIcon: {
        marginLeft: 12,
    },

    post: {
        backgroundColor: colors.blue,
        width: '45%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
    },


})