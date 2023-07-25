import React from 'react';
import Splash from '../../src/screens/auth/Splash';
import { fireEvent, render } from '@testing-library/react-native';

import { ThemeContext } from '../../src/context/ThemeContext';
import themeColors from '../../src/utils/themeColors';

function renderPageWithContext(navigation) {

    const theme = {mode: "light"};
    return render(
        <ThemeContext.Provider value={{ theme }}>
            <Splash navigation={navigation}/>
        </ThemeContext.Provider>
    );
}

describe("Splash Screen", () => {
    it('should reflect device light theme correctly', () => {
        const lightTheme = {mode: "light"};
        activeColors = themeColors[lightTheme.mode];
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
        activeColors = themeColors[darkTheme.mode];
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
        
        const page = renderPageWithContext(navigation);
        const signupButton = page.getByTestId('SignupButton');

        fireEvent.press(signupButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Signup");
    });

    it('should go to sign in page on sign in', () => {

        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');
        
        const page = renderPageWithContext(navigation);
        const SigninButton = page.getByTestId('SigninButton');

        fireEvent.press(SigninButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Signin");
    });
});