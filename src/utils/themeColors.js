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

        blue: colors.blue,
        red: colors.red,
        appBackground: colors.backgroundGrey,
        iconColor: colors.darkGrey,
        containerBackground: colors.white,
        secondaryContainerBackground: colors.backgroundGrey,

        editableBoxBackground: colors.white,
        divider: colors.grey,
        secondaryText: colors.darkGrey,
        voteContainer: colors.middleGrey,

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
        
        blue: colors.darkTextBlue,
        red: colors.red,
        appBackground: colors.backgroundDarkGrey,
        iconColor: colors.white,
        containerBackground: colors.darkGrey,
        secondaryContainerBackground: colors.darkBackgroundGrey,

        editableBoxBackground: colors.darkBackgroundGrey,
        divider: colors.backgroundDarkGrey, 
        secondaryText: colors.offWhite,
        voteContainer: colors.white,
        

        
    }
}

export default themeColors;