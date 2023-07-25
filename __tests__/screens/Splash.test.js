import React from 'react';
import Splash from '../../src/screens/auth/Splash';
import { fireEvent, render } from '@testing-library/react-native';

import { ThemeContext } from '../../src/context/ThemeContext';
import themeColors from '../../src/utils/themeColors';

describe("Splash Screen", () => {
    it('should reflect device light theme correctly', () => {
        const lightTheme = {mode: "light"};
        let activeColors = themeColors[lightTheme.mode];
        const page = render(
            <ThemeContext.Provider value={{ theme: lightTheme }}>
                <Splash/>
            </ThemeContext.Provider>
        );
        const ViewContainer = page.getByTestId('View');
        const backgroundColor = ViewContainer.props.style.backgroundColor;
        expect(backgroundColor).toEqual(activeColors.backgroundColor);
    });

    it('should reflect device dark theme correctly', () => {
        const darkTheme = {mode: "dark"};
        let activeColors = themeColors[darkTheme.mode];
        const page = render(
            <ThemeContext.Provider value={{ theme: darkTheme }}>
                <Splash/>
            </ThemeContext.Provider>
        );
        const ViewContainer = page.getByTestId('View');
        const backgroundColor = ViewContainer.props.style.backgroundColor;
        expect(backgroundColor).toEqual(activeColors.backgroundColor);
    });


    it('should go to sign up page on signup', () => {

        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');
        
        const theme = {mode: "light"};
        const page = render(
            <ThemeContext.Provider value={{ theme }}>
                <Splash navigation={navigation}/>
            </ThemeContext.Provider>
        );
        const signupButton = page.getByTestId('SignupButton');

        fireEvent.press(signupButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Signup");
    });

    it('should go to sign in page on sign in', () => {

        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');
        
        const theme = {mode: "light"};
        const page = render(
            <ThemeContext.Provider value={{ theme }}>
                <Splash navigation={navigation}/>
            </ThemeContext.Provider>
        );
        const SigninButton = page.getByTestId('SigninButton');

        fireEvent.press(SigninButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Signin");
    });
});