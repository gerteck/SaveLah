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

        appBackground: colors.backgroundGrey,
        iconColor: colors.dark,
        containerBackground: colors.white,
        divider: colors.backgroundGrey,

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

        appBackground: colors.backgroundDarkGrey,
        iconColor: colors.white,
        containerBackground: colors.darkGrey,
        divider: colors.backgroundDarkGrey
        

        
    }
}

export default themeColors;