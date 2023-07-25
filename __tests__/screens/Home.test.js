import React, {useState} from 'react';
import { UserProfileContext } from '../../src/context/UserProfileContext';
import { NotificationNumberContext } from '../../src/context/NotificationNumberContext';
import { ThemeContext } from '../../src/context/ThemeContext';

import { fireEvent, render } from '@testing-library/react-native';
import themeColors from '../../src/utils/themeColors';

// Note for Signin its causing the thing to fail cause of Firebase not sure how to test.
import Home from '../../src/screens/app/Home';

function renderPageWithContext() {
    const [userProfile, setUserProfile] = useState({"bio": "bio", 
                                                    "followers": [], "following": [], 
                                                    "registered": true, 
                                                    "uid": "6bvSyAAPw7TCGOAzsmUaGzMfvyd2", 
                                                    "url": "https://firebasestorage.googleapis.com/v0/b/savelah-storage.appspot.com/o/profilePictures%2F6bvSyAAPw7TCGOAzsmUaGzMfvyd2?alt=media&token=a0f12b21-ebbc-471f-9efe-89d75593e0bc", "username": "gerteck"});
    const [notificationNumber, setNotificationNumber] = useState(0);
    const theme = {mode: "light"};
    return render(
        <UserProfileContext.Provider value={[userProfile, setUserProfile]}>
        <NotificationNumberContext.Provider value={[notificationNumber, setNotificationNumber]}>
        <ThemeContext.Provider value={{ theme }}>

          <Home navigation={navigation}/> 

        </ThemeContext.Provider>
        </NotificationNumberContext.Provider>
        </UserProfileContext.Provider>
    );
}

describe("Signin Screen", () => {
    it('should render ', () => {
        const page = renderPageWithContext();
        expect(page).toBeTruthy();
    });
});