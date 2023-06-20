import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 18,
    },

    appHeader: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderRadius: 16,
    },  

    whiteView: {
        backgroundColor: colors.white,
        minHeight: 0.8* windowHeight,
        borderRadius: 10,
        padding: 11,
        marginVertical: 8,
    },

    toggleBar: {
        height: 30,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: colors.backgroundGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    selectContainer: {
        width:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundGrey,
        margin: 3,
        width: '40%',
    },

    selected: {
        backgroundColor: colors.white,
        borderRadius: 5,
    },

    userContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },

    iconBubble: {
        height: 45,
        width: 45,
        backgroundColor: colors.backgroundGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        marginHorizontal: 16,
    },
    
    icon: {
        height: 39,
        width: 39,
        borderRadius: 21,
    },

    name: {
        alignSelf: 'center',
        fontSize: 20,
        color: colors.blue,
        fontWeight: 500,
    },

    divider: {
        height: 2,
        backgroundColor: colors.backgroundGrey,
    },

})