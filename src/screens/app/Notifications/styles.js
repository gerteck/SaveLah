import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from "react-native";

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 18,
        marginBottom: 8,
    },

    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    emptyPostBox: {
        minHeight: height*0.85,
        borderRadius: 10,
        padding: 11,
        marginVertical: 8,

        justifyContent: 'center',
        alignItems: 'center',
    },

    emoticon: {
        fontSize: 40,
        margin: 32,
        fontWeight: '300',
        color: colors.grey,
    },

    noPostText: {
        marginTop: 32,
        fontSize: 13,
        color: colors.grey,
    },

    notificationListContainer: {
        minHeight: height*0.85,
        borderRadius: 10,
        padding: 11,
        marginTop: 8,
        marginBottom: 50,
    },

})