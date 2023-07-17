import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';

const showBorder = 0;

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 16,

        borderWidth: showBorder,
    },
    inputContainer: {
        marginTop: 8,
        width: '98%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderColor: colors.orange,
        borderWidth: showBorder,
    },

    searchIcon: {
        marginHorizontal: 16,
        alignSelf: 'center',
        borderWidth: showBorder,
    }, 

    input: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        flex: 1,
        marginLeft: 8,
        
        borderColor: colors.orange,
        borderWidth: showBorder,
    }, 

    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: showBorder,
        zIndex: 9,
    },

    sortIcon: {
        width: 24,
        height: 24,
        marginRight: 8,

        borderWidth: showBorder,
    }, 

    dropDownPickerContainer: {
        width: '40%',
    },

    pickerContainer: {
        borderColor: colors.backgroundGrey,
        borderWidth: 0,
    },

    newPost: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        right: 16,
        bottom: 30,
        //For Shadow Effect:
        elevation: 3,
    },

    postIcon: {
        height: 36,
        width: 36,
        borderWidth: 1,
    },

})