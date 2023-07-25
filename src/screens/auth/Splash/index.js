import React, { useContext } from 'react';
import { Text, Image, View, Pressable } from 'react-native';

import { colors } from "../../../utils/colors";
import { styles } from './styles';

import Button from '../../../components/Button';
import { StatusBar } from 'react-native';

import themeColors from "../../../utils/themeColors";
import { ThemeContext } from '../../../context/ThemeContext';

const Splash = ({ navigation }) => {

    const onSignup = () => {
        navigation.navigate('Signup');
    };

    const onSignin = () => {
        navigation.navigate('Signin');
    };

    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];
    let splash = theme.mode == "dark" 
        ? require('../../../assets/authPages/splash_image_dark.png')
        : require('../../../assets/authPages/splash_image.png');

    return (
        <View testID='View' style={[styles.container, { backgroundColor: activeColors.background }] }>
            <StatusBar hidden={true} backgroundColor={colors.white} barStyle={"dark-content"}/> 
            <Image resizeMode='contain' style={styles.image} source={splash} />

            <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: activeColors.text }]}>All your</Text>
                <Text style={[styles.title, styles.innerTitle, {color: activeColors.specialTitle }]}>Budgeting Needs,</Text>
                <Text style={[styles.title, { color: activeColors.text }]}>Here.</Text>
            </View>

            <Button testID={"SignupButton"} onPress={onSignup} title="Sign Up" />

            <Pressable testID='SigninButton' style={styles.footerContainer} hitSlop={2} onPress={onSignin}> 
                <Text style={[styles.footerText, { color: activeColors.footer }]}>Sign In</Text>
            </Pressable>
        </View>
    )
    
}


export default React.memo(Splash);