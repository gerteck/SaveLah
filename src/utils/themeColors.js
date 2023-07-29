import { useContext } from "react";
import useColorScheme from "../hooks/useColorScheme";
import { colors } from "./colors";
import { ThemeContext } from "../context/ThemeContext";

const themeColors = {
    light: {

        background: colors.white,
        text: colors.black,
        specialTitle: colors.middleGrey,
        footer: colors.blue,
        inputBackground: colors.white,
        inputLabel: colors.blue,
        inputPlaceholder: colors.grey,
        inputBorder: colors.grey,
        title: colors.blue,

        white: colors.white,
        blue: colors.blue,
        red: colors.red,
        green: colors.green,


        appBackground: colors.backgroundGrey,
        iconColor: colors.darkGrey,
        containerBackground: colors.white,
        secondaryContainerBackground: colors.backgroundGrey,

        editableBoxBackground: colors.white,
        divider: colors.grey,
        secondaryText: colors.darkGrey,
        voteContainer: colors.middleGrey,
        pieChartBackground: colors.grey,
        pieChartStroke: colors.white,
        spendingTransactionContainer: colors.lightGrey,
        loadingText: colors.white,
        loadingOverlay: colors.overlay,
        googleBackground: colors.blue,

    }, 

    dark: {

        background: colors.backgroundDarkGrey,
        text: colors.white,
        specialTitle: colors.darkTextBlue,
        footer: colors.darkTextBlue,
        inputBackground: colors.inputDarkGrey,
        inputLabel: colors.darkTextBlue,
        inputPlaceholder: colors.grey,
        inputBorder: colors.inputMiddleGrey,
        title: colors.darkTextBlue,
        
        white: colors.white,
        blue: colors.darkTextBlue,
        red: colors.red,
        green: colors.green,

        appBackground: colors.backgroundDarkGrey,
        iconColor: colors.white,
        containerBackground: colors.darkGrey,
        secondaryContainerBackground: colors.darkBackgroundGrey,

        editableBoxBackground: colors.darkBackgroundGrey,
        divider: colors.backgroundDarkGrey, 
        secondaryText: colors.offWhite,
        voteContainer: colors.white,
        pieChartBackground: colors.darkBackgroundGrey,
        pieChartStroke: colors.black,
        spendingTransactionContainer: colors.darkGrey,
        loadingText: colors.white,
        loadingOverlay: colors.darkOverlay,
        googleBackground: colors.blue,
        
    }
}

export default themeColors;