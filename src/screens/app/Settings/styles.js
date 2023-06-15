import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';


export const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        flex: 1,
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
        borderWidth: 1,
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

    logoutButton: {
        paddingVertical: 16,
        marginBottom: 24,
        marginTop: 24,
        backgroundColor: colors.red,
    },

})