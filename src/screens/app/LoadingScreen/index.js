import React, { useContext, useEffect } from 'react';
import { Text, Image, View } from 'react-native';
import { colors } from "../../../utils/colors";
import { styles } from './styles';
import { StatusBar } from 'react-native';

import themeColors from "../../../utils/themeColors";
import { ThemeContext } from '../../../context/ThemeContext';
import { getApp } from '@firebase/app';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { UserProfileContext } from '../../../context/UserProfileContext';

const app = getApp;
const db = getFirestore(app);

const LoadingScreen = ({ navigation }) => {

    const { user, authIsReady } = useAuthContext();
    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);
    
    // Get User Profile aka Loading to check if registered or not.
    async function getSetUserProfile() {
        const userProfileRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userProfileRef);
        setUserProfile(docSnap.data());
    }
    
    useEffect(() => { user && getSetUserProfile() }, []);

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    let splash = theme.mode == "dark" 
        ? require('../../../assets/authPages/splash_image_dark.png')
        : require('../../../assets/authPages/splash_image.png');

    return (
        <View style={[styles.container, { backgroundColor: activeColors.background }] }>
            <StatusBar hidden={true} backgroundColor={colors.white} barStyle={"dark-content"}/> 
            <Image resizeMode='contain' style={styles.image} source={splash} />

            <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: activeColors.text }]}>All your</Text>
                <Text style={[styles.title, styles.innerTitle, {color: activeColors.specialTitle }]}>Budgeting Needs,</Text>
                <Text style={[styles.title, { color: activeColors.text }]}>Here.</Text>
            </View>
        </View>
    )
    
}


export default React.memo(LoadingScreen);