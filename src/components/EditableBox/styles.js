import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 4,
        borderRadius: 4,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        fontSize: 14,
        fontWeight: '500',
        padding: 1,
    }
})