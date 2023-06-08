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
        marginTop: 16,

        width: '98%',
        alignSelf: 'center',

        backgroundColor: colors.white,
        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderWidth: showBorder,
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginHorizontal: 16,

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
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: showBorder,
    },
    sortIcon: {
        width: 24,
        height: 24,
        marginRight: 8,

        borderWidth: showBorder,
    }, 

    newPost: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        right: 16,
        bottom: 30,
        //For Shadow Effect:
        elevation: 3,
    },

    postIcon: {
        height: 28,
        width: 28,
    },

})