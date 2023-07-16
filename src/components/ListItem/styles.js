import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        elevation: 4,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: colors.grey,
        marginTop: 6,
        fontSize: 12,
    },
    arrow: {
        width: 32,
        height: 32,
    },
})