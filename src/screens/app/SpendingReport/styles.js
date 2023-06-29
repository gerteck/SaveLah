import { StyleSheet } from "react-native";
import { colors } from '../../../utils/colors';

const seeBorder = 0;

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    appHeader: {
        marginTop: 16,
        backgroundColor: colors.white,
        borderRadius: 0,
        height: 50,
    },

    container: {
        marginHorizontal: 18,
    },
})