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
        color: colors.blue,
        fontSize: 16,
        fontWeight: 'bold',
    },

    imageContainer: {
        alignItems: 'center',
        padding: 16,
        borderWidth: 0,
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
        marginLeft: 8,
        height: 24,
        width: 24,
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