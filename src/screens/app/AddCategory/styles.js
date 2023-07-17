import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 16,
        zIndex: -1
    },

    inputContainer: {
        backgroundColor: colors.white,
        borderColor: colors.backgroundBlue,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 14,
        zIndex: -1,
    },

    AddTransactionButton: {
        marginVertical: 35,
        backgroundColor: colors.green,
        zIndex: -1,
    },

    pickerContainer: {
        borderColor: colors.backgroundBlue,
    },

    DatePickerButton: {
        zIndex: -1,
    },

    modalContainer: {
        backgroundColor: '#fff',
        padding:  4,
        
    },

    flatlistContainer: {
        flex: 1,
    },

    iconContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },

    iconNameContainer: {
        flexDirection: "row",
        borderColor: 'black',
        justifyContent: "space-between",
        alignItems: "center"
    },

    dummyIcon: {
        marginTop: 48,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    nameContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 4,
        justifyContent: "center",
        marginLeft: 10,

    },

    crossContainer: {
        justifyContent: 'flex-start', 
        marginLeft: '2%',
        height: 40, 
        width: 40,
    },

    modalTitle: {
        color: colors.black,
        fontSize: 24,
        fontWeight: '600',
    },

    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 4,
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingLeft: '20%',
    },

    iconList: {
        paddingBottom: 150, 
        paddingHorizontal: 24,
        paddingTop: 10,

    }

})