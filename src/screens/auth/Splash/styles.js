import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({

    container: {
        padding: 20,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,

    },  

    image: {
        width: '100%',
        height: 200,
        
    },

    title: {
        fontSize: 40, 
        fontWeight: 'bold',
        textAlign: "center",
        color: colors.black,
        fontFamily: 'Roboto',
    },

    innerTitle: {
        color: colors.orange,
        textDecorationLine: 'underline',
    },

    footerText: {
        color: colors.blue,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
    },


})

